// controllers/exerciseController.js
import Exercise from '../models/exerciseModel.js'; // Adjust the path as necessary
import User from '../models/userModel.js'; // Adjust the path as necessary

// Function to save exercises
export const saveExercises = async (req, res) => {
  const { exercises, injuryType, injuryDuration, injurySeverity, additionalDetails } = req.body;
  const userId = req.user.id;

  try {
    // Find the user by their ID to make sure the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new Exercise document for each set of exercises
    const newExerciseRecord = new Exercise({
      user: userId,
      exercises,  // Save the exercises array
      injuryType,  // Save injury type
      injuryDuration,  // Save injury duration
      injurySeverity,  // Save injury severity
      additionalDetails,  // Save additional details if any
    });

    // Save the new record to the database
    await newExerciseRecord.save();
    
    res.status(200).json({ message: 'Exercises saved successfully', exercise: newExerciseRecord });
  } catch (error) {
    console.error('Error saving exercises:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to get all exercises for a user
export const getExercises = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch all exercise documents for the user
    const exercises = await Exercise.find({ user: userId });

    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ error: 'No exercises found for this user' });
    }

    res.status(200).json({ status: 'success', exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
