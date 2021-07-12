import React, { isValidElement, useState } from "react";
import './register.css'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { biseoAxios } from '../../lib/biseoAxios';
const devUrl = "http://localhost:9000/api"
// const devUrl = undefined;
const baseUrl: string = devUrl ?? "";

interface UserInfo {
    id: string;
    password: string;
}

type passwordStates = 1 | 2 | 3;

const RegisterForm: React.FC = () => {
    const { register, handleSubmit, getValues, watch, formState: {errors} } = useForm();
    const [isIDValid, setIDValid] = useState(false);
    const [confirmedID, setConfirmedID] = useState("");

    const onSubmit = (data: UserInfo) => {
        const uid:string = getValues().id;
        if ((uid !== confirmedID) || (!isIDValid)) {
            setIDValid(false);
            alert("Please check Validate ID first.");
            return;
        }

        const passwordCode = checkPassword();
        if (passwordCode === 1) {
            biseoAxios.post(baseUrl+"/register", data)
            .then((response)=> {
                // console.log(response);
                if (response.status === 200) {
                    alert("Successfully registered.");
                    window.location.href = '/';
                }
                // console.log(response);
            })
            .catch((error)=> {
                alert(error);
                // console.log(error);
            })
        }
        else if (passwordCode === 2) {
            alert("Passwords do not match.");
            return;
        }
        else {
            alert("Password must be 8-20 letters in length.");
            return;
        }

    };

    function checkPassword(): passwordStates  {
        const password = getValues().password;
        const passwordConfirm = getValues().passwordConfirm;
        
        if (password.length < 8 || password.length > 20) {
            return 3;
        }
        
        if (password === passwordConfirm) {
            return 1;
        }
        else {
            return 2;
        }
    };

    const validateID = () => {
        const uid = getValues().id;
        if (uid.length < 4 || uid.length > 12) {
            alert("ID must be within length of 4-12 letters");
            return;
        }
        biseoAxios.get(baseUrl+"/checkDuplicate?id="+uid)
        .then((response)=> {
            if (response.status === 200) {
                alert("You can use this username.");
                setIDValid(true);
                setConfirmedID(uid);
            }
            else {
                alert("Username already exists.");
                setIDValid(false);
            }
        })
        .catch((error)=> {
            if (error.response.status == 400) {
                alert("Username already exists.");
            }
            if (error.response.status == 500) {
                alert("Unknown Internal error.");
            }
        })
    }


    return (
        <div className="register">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <label>ID</label>
                <div className="form-group">
                    <input 
                    type="text" 
                    defaultValue="" 
                    {...register("id", {required: true})} 
                    />
                </div>
                {
                    errors.id && 
                    <div>
                        <a className="error-msg">This field is required</a>
                    </div>
                }
                <div>
                    <Button 
                        variant="light"
                        size="sm"
                        onClick={validateID}
                    >
                    Validate ID                     
                    </Button>
                </div>
                <label>Password</label>
                <div className="form-group">
                    <input 
                        type="password" 
                        defaultValue="" 
                        {...register("password", {required: true})} 
                    />
                </div>
                {
                    errors.password && 
                    <div>
                        <a className="error-msg">This field is required</a>
                    </div>
                }
                <label>Check Password</label>
                <div className="form-group">
                    <input 
                        type="password" 
                        defaultValue="" {...register("passwordConfirm", 
                        {required: true})} 
                    />                
                </div>
                {
                    errors.passwordConfirm && 
                    <div>
                        <a className="error-msg">This field is required</a>
                    </div>
                }
                <input 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    value="Register"
                />
            </Form>
        </div>
    )
};

export default RegisterForm;