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
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
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
    const [year, setYear] = useState('');
    const [flightFlown, setFlightFlown] = useState('');
    const [month, setMonth] = useState('');
    const [km, setKm] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);

    const [error, setError] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictedPrice(null);
        setLoading(true);

        try {
            // Axios call to the backend to predict house price
            const response = await axios.get(`http://localhost:8000/predict/${year}/${flightFlown}/${month}/${km}`);
            setPredictedPrice(response.data.price);
            console.log(predictedPrice)

        } catch (err) {
            setError('Error predicting price. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };




    const features = ["Year", "Flights Flown", "Month", "Distance(Km)"]

    return (
        <div className= 'wapper'>
            <Container sx={{ bgcolor: '#afe3ff', borderRadius: '16px', borderColor: '#131313', p: 4, my: 4, boxShadow: 5 }} >
                <Typography variant="h1" sx={{ color: '#131313', textAlign: 'center' }} >AI Flight Price Predictor</Typography>

                <Typography variant="h6" sx={{ textAlign: 'center', my: 10 }}>Thanks to evolutions in technology we are now able to (with varying levels of success) predict future flight prices in Australia! Input the required features in their respective box to become more informed on your future flight's price.</Typography>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                   
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Box item sx={{ display: 'flex', my: 1, flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                                <TextField
                                    sx={{ bgcolor: '#ffffff', borderRadius: '4px', boxShadow: 3 }}
                                    fullWidth
                                    type="number"
                                    label="Year"
                                    variant="outlined"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box item sx={{ display: 'flex', my: 1,flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                                <TextField
                                    sx={{ bgcolor: '#ffffff', borderRadius: '4px', boxShadow: 3 }}
                                    fullWidth
                                    type="number"
                                    label="Flights Flown"
                                    variant="outlined"
                                    value={flightFlown}
                                    onChange={(e) => setFlightFlown(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box item sx={{ display: 'flex', my: 1, flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                                <TextField
                                    sx={{ bgcolor: '#ffffff', borderRadius: '4px', boxShadow: 3 }}
                                    fullWidth
                                    type="number"
                                    label="Month"
                                    variant="outlined"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    required
                                />
                            </Box>
                            <Box item sx={{ display: 'flex', my: 1, flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                                <TextField
                                    sx={{ bgcolor: '#ffffff', borderRadius: '4px', boxShadow: 3 }}
                                    fullWidth
                                    type="number"
                                    label="Km"
                                    variant="outlined"
                                    value={km}
                                    onChange={(e) => setKm(e.target.value)}
                                    required
                                />
                            </Box>
                            
                            <Button
                                sx={{ mt: 3, textAlign: 'center', boxShadow: 3 }}
                                type="submit"
                                variant="contained"

                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Predict Price'}
                            </Button>

                        </Box>
                    </form>

                    <FormControl sx={{ display: 'flex', my: 4, flexDirection: 'row', justifyContent: "space-between", gap: 4 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Projected Price</InputLabel>
                        <OutlinedInput 
                            fullWidth
                            sx={{
                                bgcolor: '#dcf3ff', borderRadius: '4px', boxShadow: 3 }}
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            
                            label="Projected Price"
                            value={predictedPrice}
                            onChange={(e) => setPredictedPrice(e.target.value)}
                            disabled

                        />
                    </FormControl>
                </Box>
            </Container>
        </div>  
  );
}

export default App;
