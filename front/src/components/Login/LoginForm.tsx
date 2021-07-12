import React from "react";
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { biseoAxios } from '../../lib/biseoAxios';
import { Link } from "react-router-dom";
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

const LoginForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const onSubmit = (data: JSON) => {
        // window.location.href = baseUrl+'/login'
        biseoAxios.post(baseUrl+"/login", data)
            .then((response)=> {
                alert("logged in!");
                console.log(response);
            })
            .catch((error)=> {
                console.log(error);
            })

    };

    return (
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
    )
};

export default LoginForm;
