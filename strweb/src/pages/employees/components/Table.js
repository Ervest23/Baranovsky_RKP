import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmployee, updateEmployee } from '../../../store/slices/Employee'; 

const UsersTable = ({ employees }) => {
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const dispatch = useDispatch();

    const startEditing = (user, field) => {
        setEditing({ id: user.id, field });
        setEditValue(user[field]);
    };

    const saveEditing = () => {
        if (editing && editValue.trim()) {
            const userToUpdate = employees.find(user => user.id === editing.id);
            const updatedUser = {
                ...userToUpdate,
                [editing.field]: editValue.trim()
            };
            
            dispatch(updateEmployee(updatedUser));
            setEditing(null);
            setEditValue('');
        }
    };

    const cancelEditing = () => {
        setEditing(null);
        setEditValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') saveEditing();
        if (e.key === 'Escape') cancelEditing();
    };

    const handleDeleteUser = (userId) => {
            dispatch(deleteEmployee(userId));
    };

    const renderCell = (user, field, value) => {
        const isEditingCell = editing?.id === user.id && editing?.field === field;

        if (isEditingCell) {
            return (
                <div className="edit-container">
                    <input
                        type={field === 'email' ? 'email' : 'text'}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        autoFocus
                        className="edit-input"
                    />
                    <div className="edit-buttons">
                        <button className="edit-confirm-btn" onClick={saveEditing}>
                            ОК
                        </button>
                        <button className="edit-cancel-btn" onClick={cancelEditing}>
                            Отмена
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div 
                className="editable-cell"
                onDoubleClick={() => startEditing(user, field)}
            >
                {value}
            </div>
        );
    };

    return (
        <table className="users-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{renderCell(user, 'firstName', user.firstName)}</td>
                        <td>{renderCell(user, 'lastName', user.lastName)}</td>
                        <td>{renderCell(user, 'email', user.email)}</td>
                        <td>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;