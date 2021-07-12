import { RequestHandler } from 'express';

// cors middleware for development
const corsMiddleware: RequestHandler = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Headers', 'x-access-token');

  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
};

export default corsMiddleware;