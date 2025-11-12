import { 
    fetchEmployees, 
    addEmployee, 
    deleteEmployee, 
    updateEmployee,
    clearError,
    setCurrentEmployee 
} from '../slices/Employee';

export const addEmployeeWithValidation = (employeeData) => (dispatch) => {
    if (!employeeData.firstName?.trim() || !employeeData.lastName?.trim()) {
        return Promise.reject('Имя и фамилия обязательны для заполнения');
    }
    
    if (!employeeData.email?.trim()) {
        return Promise.reject('Email обязателен для заполнения');
    }
    
    return dispatch(addEmployee(employeeData));
};

export const deleteEmployeeWithConfirmation = (employeeId) => (dispatch) => {
    return new Promise((resolve, reject) => {
        if (window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
            dispatch(deleteEmployee(employeeId))
                .then((result) => {
                    if (result.type.endsWith('/fulfilled')) {
                        resolve(result);
                    } else {
                        reject(result);
                    }
                });
        } else {
            reject('Удаление отменено');
        }
    });
};

export const bulkUpdateEmployees = (updates) => (dispatch) => {
    const promises = updates.map(update => 
        dispatch(updateEmployee(update))
    );
    
    return Promise.all(promises);
};

export const searchEmployees = (searchTerm) => (dispatch, getState) => {
    const { employees } = getState().employees;
    
    if (!searchTerm.trim()) {
        return employees;
    }
    
    const filtered = employees.filter(employee => 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered;
};

export { 
    fetchEmployees, 
    addEmployee, 
    deleteEmployee, 
    updateEmployee,
    clearError,
    setCurrentEmployee 
};