// routes/exerciseRoutes.js
import express from 'express';
import { saveExercises,getExercises } from '../controllers/exerciseController.js'; // Adjust the path as necessary

import { protect, restrictTo } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.use(protect);
router.use(restrictTo('patient'));

// Define the route for saving exercises
router.post('/save-exercises', saveExercises);
router.get('/get-exercises', getExercises);

export default router;
