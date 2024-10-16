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
    const [category, setCategory] = useState('All'); // Default to showing all exercises
    const navigate = useNavigate();

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

    // Filter exercises based on selected category
    const filteredExercises = Object.keys(exercises).filter((exercise) => {
        if (category === 'All') return true;
        // Example category filter, you can add more logic for filtering by category
        if (category === 'Strength' && ['Push-ups', 'Squats', 'Lunges', 'Plank'].includes(exercise)) return true;
        if (category === 'Flexibility' && ['Hamstring Stretch', 'Spinal Twist', 'Pigeon Pose'].includes(exercise)) return true;
        return false;
    });

    return (
        <Container style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e8f0fe', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" style={{ marginBottom: '20px', color: '#34495e' }}>
                Exercise Guide
            </Typography>

            {/* Filter by Category */}
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select value={category} onChange={handleCategoryChange} label="Filter by Category">
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
                            style={{
                                cursor: 'pointer',
                                backgroundColor: '#f0f4ff',
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                            onClick={() => handleExerciseClick(exercise)} // Navigate on card click
                        >
                            <CardContent>
                                <Typography variant="h6" style={{ color: '#34495e', fontWeight: 'bold' }}>
                                    {exercise}
                                </Typography>
                                <Typography variant="body2" style={{ color: '#7f8c8d', marginTop: '8px' }}>
                                    {exercises[exercise]} {/* Description here */}
                                </Typography>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        handleInfoClick({ name: exercise, description: exercises[exercise] });
                                    }}>
                                        <InfoIcon style={{ color: '#2980b9' }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleExerciseClick(exercise)}>
                                        <YouTubeIcon style={{ color: '#e74c3c' }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal for Exercise Description */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedExercise?.name} - Description</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" style={{ color: '#34495e' }}>
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

export default ExercisePage;
