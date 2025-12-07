import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmployee, updateEmployee } from '../../../store/slices/Employee';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Box
} from '@mui/material';

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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        size="small"
                        type={field === 'email' ? 'email' : 'text'}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        autoFocus
                    />
                    <Button size="small" onClick={saveEditing}>ОК</Button>
                    <Button size="small" onClick={cancelEditing}>Отмена</Button>
                </Box>
            );
        }

        return (
            <TableCell
                onDoubleClick={() => startEditing(user, field)}
                sx={{ cursor: 'pointer' }}
            >
                {value}
            </TableCell>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            {renderCell(user, 'firstName', user.firstName)}
                            {renderCell(user, 'lastName', user.lastName)}
                            {renderCell(user, 'email', user.email)}
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;