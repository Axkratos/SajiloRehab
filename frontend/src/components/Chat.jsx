import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Typography,
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
        const token = localStorage.getItem('token'); 
        if (!token) {
            navigate('/signup'); 
        }
    }, [navigate]); 
    // Using the Node.js backend URL
const nodeBackendUrl = import.meta.env.VITE_API_NODE_BACKEND;

// Using the Python backend URL
const pythonBackendUrl = import.meta.env.VITE_API_PYTHON_BACKEND;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = `Injury Type: ${injuryType}, Duration: ${injuryDuration}, Severity: ${injurySeverity}, Additional Details: ${additionalDetails}`;

        setLoading(true);
        let validDataReceived = false;

        while (!validDataReceived) {
            try {
                const response = await axios.post(`${pythonBackendUrl}/api/suggest-exercises`, {
                    message: message,
                    user_id: userId,
                });
                if (response.data.exercises && response.data.exercises.length > 0) {
                    setExercises(response.data.exercises);
                    validDataReceived = true;
                } else {
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

            const response = await axios.post(`${nodeBackendUrl}/api/v1/exercises/save-exercises`, exerciseData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

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
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto mt-12 px-4">
                <div className="bg-gray-900 rounded-lg p-8 shadow-xl relative">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-orange-500 text-black rounded-full p-3 flex-shrink-0">
                            <FitnessCenterIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <Typography variant="h4" className="font-bold">
                                AI Exercise Suggestor
                            </Typography>
                            <Typography className="text-gray-400 text-sm">
                                Your personalized AI-powered exercise guide.
                            </Typography>
                        </div>
                    </div>

                    <Divider className="mb-6 bg-orange-500" />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <HealingIcon className="text-orange-400" />
                            <TextField
                                fullWidth
                                label="Type of Injury (e.g., sprained ankle)"
                                value={injuryType}
                                onChange={(e) => setInjuryType(e.target.value)}
                                variant="outlined"
                                required
                                InputLabelProps={{ style: { color: '#FFA500' } }}  // Make the label light orange
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white', 
                                        '& fieldset': {
                                            borderColor: '#FFA500', // Light orange border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFA500', // On hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFA500', // On focus
                                        },
                                    }
                                }}
                                className="bg-gray-800 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <TimelapseIcon className="text-orange-400" />
                            <TextField
                                fullWidth
                                label="Duration (e.g., 1 week)"
                                value={injuryDuration}
                                onChange={(e) => setInjuryDuration(e.target.value)}
                                variant="outlined"
                                required
                                InputLabelProps={{ style: { color: '#FFA500' } }}  // Make the label light orange
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white', 
                                        '& fieldset': {
                                            borderColor: '#FFA500', // Light orange border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFA500', // On hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFA500', // On focus
                                        },
                                    }
                                }}
                                className="bg-gray-800 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <SpeedIcon className="text-orange-400" />
                            <TextField
                                fullWidth
                                label="Severity (e.g., mild, moderate, severe)"
                                value={injurySeverity}
                                onChange={(e) => setInjurySeverity(e.target.value)}
                                variant="outlined"
                                required
                                InputLabelProps={{ style: { color: '#FFA500' } }}  // Make the label light orange
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white', 
                                        '& fieldset': {
                                            borderColor: '#FFA500', // Light orange border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFA500', // On hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFA500', // On focus
                                        },
                                    }
                                }}
                                className="bg-gray-800 text-white"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <NotesIcon className="text-orange-400" />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Additional Details"
                                value={additionalDetails}
                                onChange={(e) => setAdditionalDetails(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{ style: { color: '#FFA500' } }}  // Make the label light orange
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white', 
                                        '& fieldset': {
                                            borderColor: '#FFA500', // Light orange border
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#FFA500', // On hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#FFA500', // On focus
                                        },
                                    }
                                }}
                                className="bg-gray-800 text-white"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<FitnessCenterIcon />}
                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 transition-all duration-300"
                        >
                            Get Exercise Suggestions
                        </Button>
                    </form>

                    {loading && (
                        <div className="mt-6 flex justify-center items-center">
                            <CircularProgress className="text-white" />
                            <Typography className="ml-4 text-white">Analyzing...</Typography>
                        </div>
                    )}

                    {!loading && exercises.length > 0 && (
                        <div className="mt-6">
                            <Typography variant="h6" className="mb-4">Recommended Exercises:</Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {exercises.map((exercise, index) => (
                                    <Card
                                        key={index}
                                        className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <CardContent>
                                            <Typography variant="h6" className="font-bold">
                                                {exercise.name}
                                            </Typography>
                                            <Typography className="mt-2">{exercise.description}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAccept}
                                    startIcon={<CheckCircleIcon />}
                                    className="bg-green-600 hover:bg-green-700 transition-all duration-300"
                                >
                                    Accept Exercises
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleReject}
                                    startIcon={<CancelIcon />}
                                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                                >
                                    Reject Exercises
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
