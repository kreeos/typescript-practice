import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { biseoAxios } from '../../lib/biseoAxios';
import { Link, Redirect } from "react-router-dom";
import Chat from "../Chat";
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

interface LoginProps {
    socket: any;
  }

const LoginForm: React.FC<LoginProps> = props => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [username, setUsername] = useState<string>("");
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const socket = props.socket;

    const onSubmit = (data: JSON) => {
        // window.location.href = baseUrl+'/login'
        biseoAxios.post(baseUrl+"/login", data)
            .then((response)=> {
                alert("logged in!");
                // console.log(response);
                if (response.status == 200) {
                    setUsername(response.data.user);
                    setLoggedIn(true);
                }
            })
            .catch((error)=> {
                console.log(error);
                if (error.response.status == 400) {
                    alert("Wrong password.");
                }
                if (error.response.status == 404) {
                    alert("Username does not exist.");
                }
            })
    };

    return (
        <div>
            {
            isLoggedIn ?
            <Chat socket={socket} username={username}/>
            :
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <label>ID</label>
                    <div className="form-group">
                        <input defaultValue="" {...register("id", {required: true})}/>
                    </div>
                        {
                        errors.id && 
                        <div>
                            <a className="error-msg">This field is required</a>
                        </div>
                        }
                    <label>Password</label>
                    <div className="form-group">
                        <input type="password" defaultValue="" {...register("password", {required: true})}/>
                    </div>
                    {
                        errors.password && 
                        <div>
                            <a className="error-msg">This field is required</a>
                        </div>
                    }
                    <input 
                        type="submit" 
                        className="btn btn-primary btn-block"
                        value="Sign In"
                    />
                </Form>
                <Link to='/register'
                    className="btn-register btn btn-block"
                >
                    Register
                </Link>
            </div>
            }
        </div>
    )
};

export default LoginForm;
