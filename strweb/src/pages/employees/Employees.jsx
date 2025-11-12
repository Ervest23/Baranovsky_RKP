import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, clearError } from '../../store/slices/Employee'; 
import UserForm from './components/Form';
import UsersTable from './components/Table';
import './Employees.css';

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
      <div className="App">
        <div className="container">
          <div>Загрузка сотрудников...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Студенты ИТ-13</h1>
        
        {error && (
          <div className="error">
            {error}
            <button onClick={handleClearError} style={{ marginLeft: '10px' }}>
              ×
            </button>
          </div>
        )}
        
        <UserForm />
        <UsersTable employees={employees} />
      </div>
    </div>
  );
};

export default Employees;