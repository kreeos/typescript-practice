import React, { useState, useEffect } from 'react';
import LoginForm from '../Login/LoginForm';
import Chat from '../Chat';
import './home.css';
import { biseoAxios } from '../../lib/biseoAxios';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

const Home: React.FC = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        biseoAxios.get(baseUrl+"/verifyToken").
        then((response)=> {
            console.log(response);
            if (response.status == 200) {
                setLoggedIn(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });

    return (
        <div className="home">
            {
            isLoggedIn ?
            <div>
                <Chat username={undefined}/>
            </div>
            :   
            <div className="form-container">
                <LoginForm/>
            </div>
            }
        </div>
    )
};

export default Home;
