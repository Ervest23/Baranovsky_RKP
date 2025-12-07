import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Login from '../pages/login/Login.jsx';
import Employees from '../pages/employees/Employees.jsx';
import ThemeToggle from './ThemeToggle';

const AppRouter = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <ThemeToggle />
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;