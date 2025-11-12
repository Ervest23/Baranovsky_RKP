import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import EmployeesAPI from "../../api/services";

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const employees = EmployeesAPI.all();
      return employees;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки сотрудников');
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const newEmployee = EmployeesAPI.add(employeeData);
      if (newEmployee) {
        return newEmployee;
      } else {
        return rejectWithValue('Ошибка при добавлении сотрудника');
      }
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении сотрудника');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      const success = EmployeesAPI.delete(employeeId);
      if (success) {
        return employeeId;
      } else {
        return rejectWithValue('Ошибка при удалении сотрудника');
      }
    } catch (error) {
      return rejectWithValue('Ошибка при удалении сотрудника');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const success = EmployeesAPI.update(employeeData);
      if (success) {
        return employeeData;
      } else {
        return rejectWithValue('Ошибка при обновлении сотрудника');
      }
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении сотрудника');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
    currentEmployee: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
        state.error = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, setCurrentEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;