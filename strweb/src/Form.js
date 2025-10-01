import React, { useState } from 'react';

const UserForm = ({ onSubmit, initialUser = { firstName: '', lastName: '', email: '' } }) => {
    const [form, setForm] = useState(initialUser);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onSubmit(form);
            setForm(initialUser); 
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="add-user-form">
            <input
                type="text"
                name="firstName"
                placeholder="Имя"
                value={form.firstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Фамилия"
                value={form.lastName}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            <button className="add-btn" onClick={handleSubmit}>
                Добавить
            </button>
            
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default UserForm;