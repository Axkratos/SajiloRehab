import express from 'express';
import {  getAllUsers,getUser,deleteUser,updateUser,getProfile } from '../controllers/userController.js';

import { protect, restrictTo } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.use(protect);
router.use(restrictTo('patient'));

router.get('/profile', getProfile);
router.get('/users/:id', getUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);




export default router;