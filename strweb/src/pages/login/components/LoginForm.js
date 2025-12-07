import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../../store/slices/Auth';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/employees');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Вход в систему
            </Typography>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            {error && (
                <Alert severity="error" sx={{ mt: 2 }} onClose={handleClearError}>
                    {error}
                </Alert>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? 'Вход...' : 'Войти'}
            </Button>
        </Box>
    );
};

export default LoginForm;