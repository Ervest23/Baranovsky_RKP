import React from 'react';
import LoginForm from './components/LoginForm';
import { Container, Paper, Box } from '@mui/material';

const Login = () => {
    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    <LoginForm />
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;