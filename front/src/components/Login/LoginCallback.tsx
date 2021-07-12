import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import querystring from 'querystring';
import { biseoAxios } from '../../lib/biseoAxios';

const LoginCallback: React.FC = () => {
  const location = useLocation();
  const query = location.search;
  const { code, state } = querystring.parse(
    query[0] === '?' ? query.slice(1) : query
  );
  const [valid, setValid] = useState<boolean>(false);
  const data = {
    code: code,
    state: state,
  }
    //Call function to backend api callback
    // if valid, print user info 
    // else print error
  
  useEffect(() => {
    biseoAxios.post("http://localhost:9000/api/login/callback", data)
    .then(response => {
      if (data) {
        setValid(true);
      } else {
        setValid(false);
      }
    });
  }, []);

  return (
    <div>
      Hello World
    </div>
  )
};

export default LoginCallback;
