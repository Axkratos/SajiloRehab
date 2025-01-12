import express from 'express';
import { updateExerciseProgress, getExerciseProgress } from '../controllers/progressController.js';

const router = express.Router();

/**
 * @route POST /api/progress/update
 * @desc Update exercise progress for a user
 * @access Public or Protected (depending on your authentication setup)
 */
router.post('/update', updateExerciseProgress);

/**
 * @route GET /api/progress
 * @desc Get exercise progress for a user by email
 * @access Public or Protected (depending on your authentication setup)
 */
router.get('/:userEmail', getExerciseProgress);

export default router;
