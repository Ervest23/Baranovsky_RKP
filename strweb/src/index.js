import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './components/Router';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();