import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const accounts = [
    { username: 'slava', password: '1111' },
    { username: 'ilya', password: '1111' },
    { username: 'maxim', password: '1111' },
    { username: 'artur', password: '1111' }
];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const user = accounts.find(acc => 
            acc.username === username && acc.password === password
        );

        if (user) {
            navigate('/students');
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Вход в систему</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;