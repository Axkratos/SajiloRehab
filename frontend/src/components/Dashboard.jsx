import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
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
    const [progressData, setProgressData] = useState(null); // To store progress data
    const [timeData, setTimeData] = useState({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
            {
                label: 'Time Spent (hours)',
                data: [2, 3, 2.5, 4, 3.5],
                backgroundColor: 'rgba(128, 128, 128, 0.8)', // Gray color for bars
                borderColor: 'rgba(128, 128, 128, 1)',
                borderWidth: 1,
            },
        ],
    });

    const [showDescription, setShowDescription] = useState({});
    // Using the Node.js backend URL
const nodeBackendUrl = import.meta.env.VITE_API_NODE_BACKEND;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const userEmail = localStorage.getItem('email');
            try {
                const profileRes = await axios.get(`${nodeBackendUrl}/api/v1/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (profileRes.data && profileRes.data.user) {
                    setUserName(profileRes.data.user.fullName);
                }

                const exercisesRes = await axios.get(`${nodeBackendUrl}/api/v1/exercises/get-exercises`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (exercisesRes.data && exercisesRes.data.exercises) {
                    setExercisesData(exercisesRes.data.exercises);
                }

                // Fetching progress data using the email from localStorage
                if (userEmail) {
                    const progressRes = await axios.get(`${nodeBackendUrl}/api/v1/progress/${userEmail}`);
                    if (progressRes.data && progressRes.data.progress) {
                        setProgressData(progressRes.data.progress[0]); // Assuming there's only one progress object
                    }
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
        <div className="min-h-screen bg-black text-white">
            {/* Dashboard Top Section */}
            <div className="container mx-auto py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Minimized Chart */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <Typography variant="h5" className="text-gray-400 font-bold mb-4">
                        User Activity (Time Spent)
                    </Typography>
                    <div className="w-full h-48"> {/* Reduced height */}
                        <Bar data={timeData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>

                {/* New Progress Summary Component */}
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <Typography variant="h5" className="text-gray-400 font-bold mb-4">
                        Progress Summary
                    </Typography>
                    <div className="text-gray-400">
                        {progressData ? (
                            <>
                                <Typography variant="body1" className="mb-4">
                                    <strong>Total Reps:</strong> {progressData.totalReps}
                                </Typography>
                                <Typography variant="body1" className="mb-4">
  <strong>Total Time Spent:</strong> {(progressData.totalTime / 60).toFixed(2)} minutes
</Typography>

                                <Typography variant="body1" className="mb-4">
                                    <strong>Last Activity:</strong> {new Date(progressData.date).toLocaleDateString()}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1" className="text-gray-400">
                                Loading progress data...
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            className="bg-orange-500 hover:bg-orange-600 mt-4"
                            component={Link}
                            to="/chat"
                        >
                            Update Your Plan
                        </Button>
                    </div>
                </div>
            </div>

            {/* Exercises and Medical Report Section */}
            <div className="container mx-auto py-6">
                {exercisesData.map((exerciseGroup, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Recommended Exercises */}
                        <div className="lg:col-span-2">
                            <Typography variant="h5" className="text-orange-500 font-bold mb-4">
                                Recommended Exercises for {exerciseGroup.injuryType}
                            </Typography>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {exerciseGroup.exercises.map((exercise, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-900 rounded-lg p-4 shadow-lg transition transform hover:scale-105 cursor-pointer"
                                        onClick={() => handleCardClick(exercise.name)}
                                    >
                                        <Typography variant="h6" className="text-orange-500 font-bold mb-2">
                                            {exercise.name}
                                        </Typography>

                                        {showDescription[i] && (
                                            <Typography variant="body2" className="text-gray-400 mb-2">
                                                {exercise.description}
                                            </Typography>
                                        )}

                                        <div className="flex space-x-3">
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleInfoClick(i);
                                                }}
                                            >
                                                <InfoIcon className="text-gray-400" />
                                            </IconButton>
                                            <IconButton onClick={() => handleExerciseClick(exercise.name)}>
                                                <YouTubeIcon className="text-gray-400" />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Medical Report */}
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <Typography variant="h5" className="text-orange-500 font-bold mb-4">
                                Medical Report
                            </Typography>
                            <Typography variant="h6" className="text-gray-400 mb-2">
                                <strong>Name:</strong> {userName}
                            </Typography>
                            <Typography variant="h6" className="text-gray-400 mb-2">
                                <strong>Injury Type:</strong> {exerciseGroup.injuryType}
                            </Typography>
                            <Typography variant="h6" className="text-gray-400 mb-2">
                                <strong>Duration:</strong> {exerciseGroup.injuryDuration}
                            </Typography>
                            <Typography variant="h6" className="text-gray-400 mb-2">
                                <strong>Severity:</strong> {exerciseGroup.injurySeverity}
                            </Typography>
                            {exerciseGroup.additionalDetails && (
                                <Typography variant="h6" className="text-gray-400 mb-2">
                                    <strong>Additional Details:</strong> {exerciseGroup.additionalDetails}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                className="bg-orange-500 hover:bg-orange-600 mt-4"
                                component={Link}
                                to="/chat"
                            >
                                Try Recommendation Plan
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Exercise Description */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle className="bg-gray-800 text-white">
                    {selectedExercise?.name} - Description
                </DialogTitle>
                <DialogContent className="bg-gray-900 text-gray-400">
                    <Typography variant="body1">
                        {selectedExercise ? selectedExercise.description : ''}
                    </Typography>
                </DialogContent>
                <DialogActions className="bg-gray-800">
                    <Button onClick={handleClose} className="text-orange-500">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dashboard;
