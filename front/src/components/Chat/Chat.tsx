import React, { useState, useEffect } from 'react';
import { biseoAxios } from '../../lib/biseoAxios';
import LogoutButton from '../Login/LogoutButton';
import './chat.css';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

interface ChatUsernameProps {
  username: string | undefined;
}

const Chat: React.FC<ChatUsernameProps> = props => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log(props);
        // console.log(props);
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
        });
    });

    return (
        <div className="chat">
          <h1>Welcome, {props.username}</h1>
          <LogoutButton/>
        </div>
    )
};

export default Chat;
