import React, { useState, useEffect } from 'react';
import { biseoAxios } from '../../lib/biseoAxios';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

const LogoutButton: React.FC = () => {
    const LogoutClick = () => {
        biseoAxios.get(baseUrl+"/logout").
        then((response)=> {
            console.log(response);
            if (response.status == 200) {
                alert("Successfully logged out");
                window.location.href = "/";
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="home">
          <button onClick={LogoutClick}>
            Log Out
          </button>
        </div>
    )
};

export default LogoutButton;
