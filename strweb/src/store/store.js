import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth';
import employeeReducer from './slices/Employee';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;