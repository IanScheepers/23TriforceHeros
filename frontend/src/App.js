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

import {
    Paper
} from '@mui/material';


import img1 from './images/iloveAI.png'
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';

//import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, BarElement, Legend);


// this defines the app
function App() {
    //setting variables
    const [year, setYear] = useState('');
    const [flightFlown, setFlightFlown] = useState('');
    const [month, setMonth] = useState('');
    const [km, setKm] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null);

    const [error, setError] = useState('');
    const [linearChartData, setlinearChartData] = useState(null);
    const [barChartData, setbarChartData] = useState(null);
    const [loading, setLoading] = useState(false);


    //this will run when the user presses the predict price button button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPredictedPrice(null);
        setLoading(true);

        try {

            //this will check and log the status of the back end
            const test = await axios.get(`http://localhost:8000/status`);
            console.log(test.data.message)

            // This will send an axios call to get the priced price from the back end based on the variables provided
            const response = await axios.post("http://localhost:8000/predict", {
                year: year,
                flights_flown: flightFlown,
                month: month,
                km: km,
            });
            setPredictedPrice(response.data.price);
            console.log(predictedPrice)

            //flight data for testing
            // [2010, 730, 4, 643]  // Smallest $56
            // [2019,198,12, 434]   // Middle   $238
            // [2018, 150, 11, 287] // Median   $343
            // [2012, 250, 1, 1971] // Middle   $495
            // [2021, 44, 4, 2651]  // Largest  $1453

            //this is the data for the line chart, it will map the user's prediction to the highest and lowest distances in the database
            const squareFootagesKMSCALE = [236,3615]
            const newChartData = {
                labels: squareFootagesKMSCALE,
                datasets: [
                    {
                        label: 'Highest and lowest recorded distances',
                        data: [56, 1453], 
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                    },
                    {
                        label: 'Your flight',
                        data: [{ x: parseInt(km), y: response.data.price }],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        pointRadius: 8,
                        pointHoverRadius: 12,
                        showLine: false  
                    }
                ]
            };

            //this is the data for the bar chart, it will graph the predicted price against the highest and lowest price
            const labels = ["Lowest Price In Dataset","Your Price","Highest Price In Dataset"];
            const data = {
                labels: labels,
                datasets: [{
                    label: "Your price against Highest and Lowest in the Dataset",
                    data: [55, response.data.price,1453],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]

            };
            // Set the chart data
            setbarChartData(data);  
            setlinearChartData(newChartData);

        } catch (err) {
            setError('Error predicting price. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid className= 'wapper'>
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
                                    inputProps={{ min: 2010, max: 3000 }}
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
                                    inputProps={{ min: 1, max: 2500 }}
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
                                    inputProps={{ min: 1, max: 12 }}
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
                                    inputProps={{ min: 200, max: 3700 }}
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

                    {predictedPrice && (
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Predicted Price: ${predictedPrice.toLocaleString()}
                            </Typography>
                            {linearChartData && (
                                <Box sx={{ mx: 3 }}>
                                    <Line
                                        data={linearChartData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Price and Distance Visualisation'
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    type: 'linear',
                                                    position: 'bottom',
                                                    title: {
                                                        display: true,
                                                        text: 'Distance(km)'
                                                    }
                                                },
                                                y: {
                                                    title: {
                                                        display: true,
                                                        text: 'Predicted Price ($)'
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                            )}
                        </Paper>
                    )}
                    {predictedPrice && (
                        <Paper elevation={3} sx={{ p: 3, my:3 }}>
                            <Typography variant="h5" gutterBottom>
                                Predicted Price: ${predictedPrice.toLocaleString()}
                            </Typography>
                            {linearChartData && (
                                <Box sx={{ my: 3 }}>
                                    <Bar
                                        data={barChartData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Your price Compared to the highest and lowest recorded prices'
                                                }
                                            }
                                           
                                        }}
                                    />
                                </Box>
                            )}
                        </Paper>
                    )}
                </Box>
            </Container>
        </Grid>  
  );
}

export default App;
