import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, clearError } from '../../store/slices/Employee';
import UserForm from './components/Form';
import UsersTable from './components/Table';
import { Container, Typography, Alert, Box, CircularProgress } from '@mui/material';

const Employees = () => {
  const { employees, loading, error } = useSelector(state => state.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Загрузка сотрудников...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Студенты ИТ-13
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={handleClearError}>
          {error}
        </Alert>
      )}

      <UserForm />
      <UsersTable employees={employees} />
    </Container>
  );
};

export default Employees;