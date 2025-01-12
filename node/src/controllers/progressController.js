import Progress from '../models/progressModel.js'


export const updateExerciseProgress = async (req, res) => {
  const { userEmail, exerciseType, repsToday, timeToday } = req.body;

  if (!userEmail || !exerciseType || typeof repsToday !== 'number' || typeof timeToday !== 'number') {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    // Find the existing progress record for the user and exercise type
    let progress = await Progress.findOne({ userEmail, exerciseType });

    if (progress) {
      // Update the existing record
      progress.totalReps += repsToday;
      progress.totalTime += timeToday;
      progress.date = new Date(); // Update the date to the latest activity
    } else {
      // Create a new record if none exists
      progress = new Progress({
        userEmail,
        exerciseType,
        totalReps: repsToday,
        totalTime: timeToday,
      });
    }

    // Save the updated or new record to the database
    await progress.save();

    res.status(200).json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'An error occurred while updating progress' });
  }
};


export const getExerciseProgress = async (req, res) => {
    const { userEmail } = req.params;
   
  
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }
  
    try {
      // Fetch all progress records for the user
      const progress = await Progress.find({ userEmail });
  
      if (!progress || progress.length === 0) {
        return res.status(404).json({ message: 'No progress records found for the user' });
      }
  
      res.status(200).json({ message: 'Progress fetched successfully', progress });
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({ message: 'An error occurred while fetching progress' });
    }
  };