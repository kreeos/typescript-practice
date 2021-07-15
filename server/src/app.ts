import express from "express";
import session from 'express-session';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import redis from 'redis';
import cors from 'cors';
import * as mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
import https from 'https';
import "./utils/env";

const socket = require('socket.io');
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()

declare module 'express-session' {
  export interface SessionData {
    state: string;
  }
}

const app: express.Application = express();
const API_PORT: number = 9000;
const saltRounds: number = 10;
const jwt_secret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "devsecret";
let http = require("http").Server(app);
const io = socket(http);

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});

io.on('connection', (socket: any) => {
  console.log('a user is connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("message", function(message: any) {
    console.log(message);
    socket.emit("message", message);
  });

  socket.on("user", function(user: any) {
    console.log(user);
    const message = user + " has entered.";
    socket.broadcast.emit("entrance", message);
  });
});

// Middleware setting
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use (cors({
  origin: ["http://127.0.0.1:4000","http://localhost:4000"],
  credentials: true,
  methods:['GET','POST'],
}));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    cookie:{
      maxAge:60000,
    },
  })
);

const poolConfig:mysql.PoolOptions = {
  connectionLimit: 10,
  host: process.env.MYSQL_ADDRESS,
  user: process.env.MYSQL_USERNAME,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD
};

const pool:mysql.Pool = mysql.createPool(poolConfig);

app.listen(API_PORT, ()=> {
  console.log("API server runnning at ", API_PORT);
})

// server.listen(API_por)

const sampleCheck = (req: express.Request, res:express.Response, next: express.NextFunction) => {
  console.log("Here");
  res.status(200).json({message: "token verified"});
}

const verifyToken = (req: express.Request, res:express.Response, next: express.NextFunction) => {
  try {
    console.log(req.cookies);
    const clientToken: string = req.cookies.user;
    const decoded: string | object = jwt.verify(clientToken, jwt_secret);
  
    console.log(decoded);
    if (typeof decoded === 'object' &&  decoded !== null) {
      console.log("cookie came in");
      console.log(decoded);
      next();
    }
  }catch (error) {
    console.log('cookie error');
    console.log(error);
    res.status(401).json({error: "Some error"});
  }
};

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) =>{
  res.send("Hello TS express!!");
});



app.post("/api/login", (req: express.Request, res: express.Response, next:express.NextFunction) => {
  // console.log("Login!");
  const id: string = req.body.id;
  const password: string = req.body.password
  const retrievePasswordQuery = "SELECT password FROM user WHERE username='"+id+"'";
  const jwtObj = {
    username: id,
  }; 
  pool.query<mysql.RowDataPacket[]>(retrievePasswordQuery)
  .then(([rows, fields]) => {
    if (rows.length) {
      const savedHash:string = rows[0]['password'];
      bcrypt.compare(password, savedHash, function(err, result) {
        if (result) {
          //successfully logged in
          jwt.sign(jwtObj, jwt_secret, {
            expiresIn: '10m'
          }, (
            err: Error | null,
            token: string | undefined,
          ) => {
            if (err) {
              console.log("JWT Error");
              console.log(err);
              return;
            }
            res.cookie("user", token);
            res.status(200).json({message: "Successfully Logged In", token: token, user: id});
          });
        }
        else {
          res.status(400).json({error: "Incorrect Password"});
        }
      });
    }
    else {
      res.status(404).json({message: "Username cannot be found."});
    }
  }).catch(error => {
    res.status(500).json({error: "Unknown internal error."});
    console.log(error);
  });
})

app.get("/api/logout", (req: express.Request, res: express.Response, next:express.NextFunction) => {
  if (res.cookie) {
    res.cookie("user", "");
  }
  res.status(200).send();
})

app.get("/api/verifyToken", verifyToken, sampleCheck);

app.get("/api/checkDuplicate", (req:express.Request, res: express.Response, next:express.NextFunction) => {
  const inputId = req.query.id;

  const checkDupQuery = "SELECT username FROM user WHERE username='"+inputId+"'";
  
  pool.query<mysql.RowDataPacket[]>(checkDupQuery)
  .then(([rows, fields]) => {
    if (rows.length) {
      res.status(400).json({error: "Username already exists"});
    }
    else {
      res.status(200).json({message: "Username can be used."});
    }
  }).catch(error => {
    res.status(500).json({error: "Unknown internal error."});
    console.log(error);
  });
})

app.post("/api/register", (req: express.Request, res: express.Response, next:express.NextFunction) => {
  const id = req.body.id;
  const password = req.body.password
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // console.log(hash);
    const createUserQuery = "INSERT INTO user (username, password) VALUES ('"+ id + "', '"+hash+"')";
    
    pool.execute<mysql.RowDataPacket[]>(createUserQuery)
    .then(([rows, fields]) => {
      res.status(200).json({message: "successfully registered."});
    }).catch((error)=> {
      console.log(error.code);
    });
  });
})

app.get("/api/getUserInfo", (req:express.Request, res: express.Response, next:express.NextFunction) => {
  const inputId = req.query.id;

  const checkDupQuery = "SELECT * FROM user WHERE username='"+inputId+"'";
  
  pool.query<mysql.RowDataPacket[]>(checkDupQuery)
  .then(([rows, fields]) => {
    if (rows.length) {
      res.json(rows);
    }
    else {
      res.status(404).json({error: "User not found."});
    }
  }).catch(error => {
    res.status(500).json({error: "Unknown internal error."});
    console.log(error);
  });
})

export default app;
