import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, clearError } from '../../../store/slices/Employee'; 

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
        <>
            <div className="add-user-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={form.firstName}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={form.lastName}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                <button 
                    className="add-btn" 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>
        </>
    );
};

export default UserForm; 