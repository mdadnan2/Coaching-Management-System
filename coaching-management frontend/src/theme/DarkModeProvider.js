import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
      },
      secondary: {
        main: '#ec4899',
      },
      success: {
        main: '#10b981',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      info: {
        main: '#06b6d4',
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f8fafc',
        paper: darkMode ? '#171717' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#f1f5f9' : '#0f172a',
        secondary: darkMode ? '#94a3b8' : '#64748b',
      },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      button: { textTransform: 'none', fontWeight: 500 },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          contained: {
            '&:hover': {
              transform: 'translateY(-1px)',
              transition: 'transform 150ms ease',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 250ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  });

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </DarkModeContext.Provider>
  );
};
