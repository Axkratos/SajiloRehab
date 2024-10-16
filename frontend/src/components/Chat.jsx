import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Card,
    CardContent,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; 
import HealingIcon from '@mui/icons-material/Healing'; 
import TimelapseIcon from '@mui/icons-material/Timelapse'; 
import SpeedIcon from '@mui/icons-material/Speed'; 
import NotesIcon from '@mui/icons-material/Notes'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import CancelIcon from '@mui/icons-material/Cancel'; 

const Chat = () => {
    const [userId] = useState("12345");
    const [injuryType, setInjuryType] = useState("");
    const [injuryDuration, setInjuryDuration] = useState("");
    const [injurySeverity, setInjurySeverity] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Check for token in localStorage
        if (!token) {
            navigate('/signup'); // Navigate to signup if token is not found
        }
    }, [navigate]); // Empty dependency array ensures this runs on mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = `Injury Type: ${injuryType}, Duration: ${injuryDuration}, Severity: ${injurySeverity}, Additional Details: ${additionalDetails}`;

        setLoading(true);
        let validDataReceived = false;

        while (!validDataReceived) {
            try {
                const response = await axios.post('http://localhost:5000/api/suggest-exercises', {
                    message: message,
                    user_id: userId,
                });
                console.log(response);
                if (response.data.exercises && response.data.exercises.length > 0) {
                    setExercises(response.data.exercises);
                    validDataReceived = true;
                } else {
                    console.log('Received empty data, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
                break;
            }
        }

        setLoading(false);
    };

    const handleAccept = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const exerciseData = {
                exercises,
                injuryType,
                injuryDuration,
                injurySeverity,
                additionalDetails,
            };

            const response = await axios.post('https://noderehab.onrender.com/api/v1/exercises/save-exercises', exerciseData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            console.log(response.data.message);
            navigate('/dashboard', { state: { exercises, injuryType, injuryDuration, injurySeverity } });
        } catch (error) {
            console.error('Error saving exercises:', error);
        }
    };

    const handleReject = () => {
        setExercises([]);
        setInjuryType("");
        setInjuryDuration("");
        setInjurySeverity("");
        setAdditionalDetails("");
    };

    return (
        <Container>
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Exercise Suggestor
                </Typography>

                <Divider style={{ margin: '10px 0' }} />

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <HealingIcon style={{ marginRight: '10px' }} />
                        <TextField
                            fullWidth
                            label="Type of Injury (e.g., sprained ankle)"
                            value={injuryType}
                            onChange={(e) => setInjuryType(e.target.value)}
                            variant="outlined"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <TimelapseIcon style={{ marginRight: '10px' }} />
                        <TextField
                            fullWidth
                            label="Duration (e.g., 1 week)"
                            value={injuryDuration}
                            onChange={(e) => setInjuryDuration(e.target.value)}
                            variant="outlined"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <SpeedIcon style={{ marginRight: '10px' }} />
                        <TextField
                            fullWidth
                            label="Severity (e.g., mild, moderate, severe)"
                            value={injurySeverity}
                            onChange={(e) => setInjurySeverity(e.target.value)}
                            variant="outlined"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <NotesIcon style={{ marginRight: '10px' }} />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Additional Details"
                            value={additionalDetails}
                            onChange={(e) => setAdditionalDetails(e.target.value)}
                            variant="outlined"
                        />
                    </div>

                    <Button type="submit" variant="contained" color="primary" startIcon={<FitnessCenterIcon />}>
                        Get Exercise Suggestions
                    </Button>
                </form>

                {loading && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <CircularProgress />
                        <Typography>Analyzing...</Typography>
                    </div>
                )}

                {!loading && exercises.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6">Recommended Exercises:</Typography>
                        {exercises.map((exercise) => (
                            <Card key={exercise.name} style={{ marginTop: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" color="textSecondary">
                                        {exercise.name}
                                    </Typography>
                                    <Typography>{exercise.description}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleAccept} 
                                startIcon={<CheckCircleIcon />}
                            >
                                Accept Exercises
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={handleReject} 
                                startIcon={<CancelIcon />}
                            >
                                Reject Exercises
                            </Button>
                        </div>
                    </div>
                )}
            </Paper>
        </Container>
    );
};

export default Chat;
