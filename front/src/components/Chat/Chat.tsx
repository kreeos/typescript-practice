import React, { useState, useEffect, MouseEventHandler } from 'react';
import { biseoAxios } from '../../lib/biseoAxios';
import LogoutButton from '../Login/LogoutButton';
import io from "socket.io-client";
import './chat.css';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

interface ChatUsernameProps {
  username: string | undefined;
}

const Chat: React.FC<ChatUsernameProps> = props => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [chatMessage, setChatMessage] = useState<string>("");
    const socket = io("http://localhost:3000");

    useEffect(() => {
        // console.log(props);
        if (!isLoggedIn) {
            biseoAxios.get(baseUrl+"/verifyToken").
            then((response)=> {
                console.log(response);
                if (response.status == 200) {
                    setLoggedIn(true);
    
                }
            })
            .catch((error) => {
                alert("Please Log in first.");
                window.location.href = "/";
            })
            .finally(() => {
                socket.emit("user", props.username);
            });
        }
    });

    const sendMsg = () => {
        socket.emit("message", chatMessage);
    }

    const handleChange = (event:any) => {
        setChatMessage(event.target.value);
        console.log(chatMessage);
    }

    socket.on("message", function(message: any) {
        // alert(message);
        console.log(message);
    })

    socket.on("entrance", function(message: any) {
        // alert(message);
        console.log(message);
    })

    return (
        <div className="chat">
            <h1>Welcome, {props.username}</h1>
            <input onChange={handleChange}></input>
            <button onClick={sendMsg}>Send</button>

            <LogoutButton/>
        </div>
    )
};

export default Chat;
