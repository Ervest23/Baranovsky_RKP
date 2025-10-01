import React, { useState } from 'react';

const UsersTable = ({ users, deleteUser, updateUser }) => {
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [error, setError] = useState('');

    const startEditing = (user, field) => {
        setEditing({ id: user.id, field });
        setEditValue(user[field]);
        setError('');
    };

    const saveEditing = () => {
        if (editing && editValue.trim()) {
            const userToUpdate = users.find(user => user.id === editing.id);
            const updatedUser = {
                ...userToUpdate,
                [editing.field]: editValue.trim()
            };
            
            try {
                updateUser(updatedUser);
                setEditing(null);
                setEditValue('');
                setError('');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const cancelEditing = () => {
        setEditing(null);
        setEditValue('');
        setError('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') saveEditing();
        if (e.key === 'Escape') cancelEditing();
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
                        <button className="edit-confirm-btn" onClick={saveEditing}>OK</button>
                        <button className="edit-cancel-btn" onClick={cancelEditing}>Отмена</button>
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
        <>
            {error && <p className="error" style={{ marginBottom: '20px' }}>{error}</p>}
            
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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{renderCell(user, 'firstName', user.firstName)}</td>
                            <td>{renderCell(user, 'lastName', user.lastName)}</td>
                            <td>{renderCell(user, 'email', user.email)}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteUser(user.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UsersTable;