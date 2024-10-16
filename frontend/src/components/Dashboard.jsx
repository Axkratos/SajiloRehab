import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [exercisesData, setExercisesData] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [timeData, setTimeData] = useState({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
            {
                label: 'Time Spent (hours)',
                data: [2, 3, 2.5, 4, 3.5],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [showDescription, setShowDescription] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const profileRes = await axios.get('https://noderehab.onrender.com/api/v1/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (profileRes.data && profileRes.data.user) {
                    setUserName(profileRes.data.user.fullName);
                }

                const exercisesRes = await axios.get('https://noderehab.onrender.com/api/v1/exercises/get-exercises', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (exercisesRes.data && exercisesRes.data.exercises) {
                    setExercisesData(exercisesRes.data.exercises);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleCardClick = (exerciseName) => {
        const formattedName = exerciseName.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/exercise/${formattedName}`;
    };

    const handleExerciseClick = (exerciseName) => {
        const query = encodeURIComponent(exerciseName);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    };

    const handleInfoClick = (index) => {
        setShowDescription((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedExercise(null);
    };

    return (
        <Container sx={{ marginTop: '20px' }}>
            {/* Graph Section */}
            <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#4a90e2', fontWeight: 'bold' }}>
                    User Activity (Time Spent)
                </Typography>
                <Bar data={timeData} />
            </Paper>

            {exercisesData.map((exerciseGroup, index) => (
                <div key={index}>
                    <Grid container spacing={3}>
                        {/* Exercises Column */}
                        <Grid item xs={12} md={8}>
                            <Typography variant="h5" gutterBottom sx={{ color: '#4a90e2', fontWeight: 'bold', marginTop: '20px' }}>
                                Recommended Exercises for {exerciseGroup.injuryType}
                            </Typography>
                            <Grid container spacing={3}>
                                {exerciseGroup.exercises.map((exercise, i) => (
                                    <Grid item xs={12} md={6} key={i}>
                                        <Card
                                            sx={{
                                                cursor: 'pointer',
                                                backgroundColor: '#f0f4ff',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                textAlign: 'center',
                                                marginBottom: '10px',
                                            }}
                                            onClick={() => handleCardClick(exercise.name)}
                                        >
                                            <CardContent>
                                                <Typography variant="h6" sx={{ color: '#34495e', fontWeight: 'bold' }}>
                                                    {exercise.name}
                                                </Typography>

                                                {showDescription[i] && (
                                                    <Typography variant="body2" sx={{ marginTop: '10px', color: '#7f8c8d' }}>
                                                        {exercise.description}
                                                    </Typography>
                                                )}

                                                <Box display="flex" justifyContent="center" mt={2}>
                                                    <IconButton onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInfoClick(i);
                                                    }}>
                                                        <InfoIcon sx={{ color: '#2980b9' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleExerciseClick(exercise.name)}>
                                                        <YouTubeIcon sx={{ color: '#e74c3c' }} />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* Medical Report Column */}
                        <Grid item xs={12} md={4}>
                            <Paper
                                sx={{
                                    padding: '30px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '15px',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Typography variant="h5" gutterBottom sx={{ color: '#e67e22', fontWeight: 'bold' }}>
                                    Medical Report
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#2c3e50', marginBottom: '10px' }}>
                                    <strong>Name:</strong> {userName}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#2c3e50', marginBottom: '10px' }}>
                                    <strong>Injury Type:</strong> {exerciseGroup.injuryType}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#2c3e50', marginBottom: '10px' }}>
                                    <strong>Duration:</strong> {exerciseGroup.injuryDuration}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#2c3e50', marginBottom: '10px' }}>
                                    <strong>Severity:</strong> {exerciseGroup.injurySeverity}
                                </Typography>
                                {exerciseGroup.additionalDetails && (
                                    <Typography variant="h6" sx={{ color: '#2c3e50', marginBottom: '10px' }}>
                                        <strong>Additional Details:</strong> {exerciseGroup.additionalDetails}
                                    </Typography>
                                )}
                                {/* Link to Chat/Recommendation Plan */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    component={Link}
                                    to="/chat"
                                >
                                    Try Recommendation Plan
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            ))}

            {/* Modal for Exercise Description */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedExercise?.name} - Description</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ color: '#34495e' }}>
                        {selectedExercise ? selectedExercise.description : ''}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
