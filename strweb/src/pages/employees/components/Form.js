import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, clearError } from '../../../store/slices/Employee';
import { TextField, Button, Box } from '@mui/material';

const UserForm = () => {
    const [form, setForm] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '' 
    });
    
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.employees);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.firstName.trim() && form.lastName.trim() && form.email.trim()) {
            dispatch(addEmployee(form));
            setForm({ firstName: '', lastName: '', email: '' });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Имя"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <TextField
                label="Фамилия"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
            />
            <Button
                type="submit"
                variant="contained"
                disabled={loading}
            >
                {loading ? 'Добавление...' : 'Добавить'}
            </Button>
        </Box>
    );
};

export default UserForm; 