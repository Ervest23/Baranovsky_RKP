import React from 'react';
import LoginForm from './components/LoginForm';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;