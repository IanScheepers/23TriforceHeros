import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline'; 
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main:"#2e774c9"
        },
    },
    body: {
        backgroundcolor: "#1976d2",
        },
    typography: {
        fontFamily: [
            'inter',
        ].join(','),

        h1: {
            fontSize: "3rem",
            fontWeight: 600,
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },

        h6: {
            fontSize: "1.2rem",
            fontWeight: 400,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* Wrap the app in ThemeProvider and pass the theme for consistent styling */}
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>  {/* Wrap the App component in Router */}
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);