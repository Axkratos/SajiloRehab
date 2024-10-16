import React, { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

const exercises = {
    'Push-ups': 'An exercise to strengthen the upper body, particularly the chest and triceps.',
    'Squats': 'A lower body exercise that targets the thighs, hips, and buttocks.',
    'Lunges': 'An exercise focusing on the legs, enhancing strength and balance.',
    'Plank': 'A core-strengthening exercise that also works the shoulders and back.',
    'Bridges': 'Targets the glutes and lower back while improving core stability.',
    'Clamshells': 'Strengthens the hip muscles and improves hip stability.',
    'Bird Dogs': 'Enhances balance and coordination while working on core stability.',
    'Dead Bugs': 'Strengthens the core while focusing on coordination between limbs.',
    'Shoulder Press': 'An exercise to build shoulder and upper arm strength.',
    'Bicep Curls': 'Strengthens the biceps and improves arm aesthetics.',
    'Tricep Dips': 'Targets the triceps, helping to tone and strengthen the arms.',
    'Calf Raises': 'Focuses on strengthening the calf muscles.',
    'Seated Row': 'Targets the back muscles, improving posture and strength.',
    'Wall Angels': 'Improves shoulder mobility and posture.',
    'Chest Stretch': 'A flexibility exercise for the chest and shoulders.',
    'Hamstring Stretch': 'Stretches the hamstring muscles to enhance flexibility.',
    'Quadriceps Stretch': 'Stretches the quadriceps for improved flexibility.',
    'Hip Flexor Stretch': 'Stretches the hip flexors to improve range of motion.',
    'Spinal Twist': 'Enhances spinal mobility and flexibility.',
    'Side Lunges': 'Strengthens the inner thighs and improves balance.',
    'Glute Bridges': 'Focuses on the glutes and lower back for better stability.',
    'Mountain Climbers': 'A full-body exercise that increases heart rate and builds endurance.',
    'Leg Raises': 'Strengthens the lower abdominal muscles.',
    'Standing Balance': 'Improves balance and stability through weight shifting.',
    'Side Plank': 'Strengthens the oblique muscles and stabilizes the core.',
    'Torso Rotation': 'Enhances core flexibility and stability.',
    'Wrist Flexor Stretch': 'Stretches the wrist and forearm muscles.',
    'Ankle Circles': 'Improves ankle mobility and flexibility.',
    'T-Pose Exercise': 'Strengthens the upper back and shoulders.',
    'Knee to Chest Stretch': 'Stretches the lower back and glutes.',
    'Pigeon Pose': 'A yoga pose that stretches the hips and glutes.',
};

const ExercisePage = () => {
    const [open, setOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();
    const nodeBackendUrl = import.meta.env.VITE_API_NODE_BACKEND;

// Using the Python backend URL
const pythonBackendUrl = import.meta.env.VITE_API_PYTHON_BACKEND;
    const handleInfoClick = (exercise) => {
        setSelectedExercise(exercise);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedExercise(null);
    };

    const handleExerciseClick = (exerciseName) => {
        const formattedName = exerciseName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/exercise/${formattedName}`);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredExercises = Object.keys(exercises).filter((exercise) => {
        if (category === 'All') return true;
        if (category === 'Strength' && ['Push-ups', 'Squats', 'Lunges', 'Plank'].includes(exercise)) return true;
        if (category === 'Flexibility' && ['Hamstring Stretch', 'Spinal Twist', 'Pigeon Pose'].includes(exercise)) return true;
        return false;
    });

    return (
        <Container sx={{ mt: 4, py: 4, borderRadius: 2, bgcolor: '#121212', color: '#fff' }}>
            <Typography
                variant="h4"
                align="center"
                sx={{ mb: 4, color: '#fff', fontWeight: 'bold' }}
            >
                SajiloRehab Exercise Guide
            </Typography>

            {/* Filter by Category */}
            <FormControl variant="outlined" fullWidth sx={{ mb: 4 }}>
                <InputLabel sx={{ color: '#fff' }}>Filter by Category</InputLabel>
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Filter by Category"
                    sx={{
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2980b9' },
                    }}
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Strength">Strength</MenuItem>
                    <MenuItem value="Flexibility">Flexibility</MenuItem>
                </Select>
            </FormControl>

            {/* Exercise Cards */}
            <Grid container spacing={3}>
                {filteredExercises.map((exercise, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                bgcolor: '#1f1f1f',
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                            onClick={() => handleExerciseClick(exercise)}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#fff', fontWeight: 'bold' }}
                                >
                                    {exercise}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b0bec5', mt: 1 }}>
                                    {exercises[exercise]}
                                </Typography>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleInfoClick({ name: exercise, description: exercises[exercise] });
                                        }}
                                    >
                                        <InfoIcon sx={{ color: '#3498db' }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleExerciseClick(exercise)}>
                                        <YouTubeIcon sx={{ color: '#e74c3c' }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for Exercise Description */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#2c3e50', color: '#fff' }}>{selectedExercise?.name} - Description</DialogTitle>
                <DialogContent sx={{ bgcolor: '#2c3e50' }}>
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                        {selectedExercise ? selectedExercise.description : ''}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#2c3e50' }}>
                    <Button onClick={handleClose} sx={{ color: '#2980b9' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ExercisePage;
