import React from 'react';
import LoginForm from '../Login/LoginForm';
import './home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <div className="form-container">
                <LoginForm/>
            </div>
        </div>
    )
};

export default Home;
