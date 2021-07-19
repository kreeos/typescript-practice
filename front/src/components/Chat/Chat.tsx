import React, { useState, useEffect, MouseEventHandler } from 'react';
import { biseoAxios } from '../../lib/biseoAxios';
import { socket } from "../../lib/socket";
import LogoutButton from '../Login/LogoutButton';

import './chat.css';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

interface ChatUsernameProps {
  username: string | undefined;
}

interface userListInterface {
    [username: string] : string;
}

const Chat: React.FC<ChatUsernameProps> = props => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [chatMessage, setChatMessage] = useState<string>("");
    const [chats, setChats] = useState<{user: string, message: string}[]>([]);
    const [username, setUsername] = useState<string>("");

    const handleChange = (event:any) => {
        setChatMessage(event.target.value);
        console.log(chatMessage);
    }

    useEffect(() => {
        setUsername(props.username == undefined ? "" : props.username);
 
        if (!isLoggedIn) {
            biseoAxios.get(baseUrl+"/verifyToken").
            then((response)=> {
                console.log(response);
                if (response.status == 200) {
                    setLoggedIn(true);
                    socket.emit("user", props.username);
                }
            })
            .catch((error) => {
                alert("Please Log in first.");
                window.location.href = "/";
            })
            .finally(() => {
            });
        }
        else {
        }
    });

    socket.on('message',( {user, message})=>{
        setChats([...chats,{user, message}])
    })
    
    socket.on("entrance", ({userList, message})=>{
        console.log(message);
        console.log(userList);
        const user:string = "";
        setChats([...chats,{user, message}])
    })
    const sendMsg = () => {
        // socket.emit("message", {user: username, message: chatMessage});
        setChatMessage("");
    }


    const renderChat =()=>{
        return chats.map(({user, message},index)=>(
          <div key={index}>
            <h3>{user}:<span>{message}</span></h3>
          </div>
        ))
      }

    return (
        <div className="chat">
            <h1>Welcome, {props.username}</h1>
            <div>
                <h1>Messages</h1>
                {
                    renderChat()
                }
            </div>
            <div>
                <input onChange={handleChange} value={chatMessage}></input>
                <button onClick={sendMsg}>Send</button>
            </div>
            <LogoutButton/>
        </div>
    )
};

export default Chat;
