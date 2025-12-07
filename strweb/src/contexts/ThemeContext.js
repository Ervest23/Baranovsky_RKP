import React, { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};