import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box,
    Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField,
    Switch, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, CircularProgress, LinearProgress, Chip, Avatar, Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    Info as InfoIcon,
    Mail as MailIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import img1 from './images/iloveAI.png'


function About() {
    return (
        <Container>
            <Typography variant="h2" component="h1" gutterBottom>
                About Us
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                This is the About page. Here, you can add more information about the project or your team.
            </Typography>
        </Container>
    );
}

function App() {
    const features = ["Year", "Flights Flown", "Month", "Price", "Distance(Km)" ]

    return (
        <div className= 'wapper'>
            <Container sx={{ bgcolor: '#afe3ff', height: "75vh", borderRadius: '16px', borderColor: '#131313', p: 4, my: 4, boxShadow: 5 }} >
                <Typography variant="h1" sx={{ color: '#131313', textAlign: 'center' }} >AI Flight Price Predictor</Typography>

                <Typography variant="h6" sx={{ textAlign: 'center', my: 10 }}>Thanks to evolutions in technology we are now able to (with varying levels of success) predict future flight prices in Australia! Input the required features in their respective box to become more informed on your future flights price.</Typography>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                        {features.map((feature) => (
                            <TextField fullWidth sx={{ bgcolor: '#ffffff', borderRadius: '4px', boxShadow: 3}} label={feature} variant="outlined" />
                        ))}
                    </Box>
                    <Button variant="contained" sx={{ mt: 4, textAlign: 'center', boxShadow: 3 }}>Predict</Button>
                </Box>
            </Container>
        </div>
        
        
        
  );
}

export default App;
