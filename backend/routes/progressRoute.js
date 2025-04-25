import express from 'express';
import { getProgress } from '../controllers/progressController.js';
import { updateUserProgress } from '../controllers/updateProgress.js';

const progressRoute=express.Router();

progressRoute.get('/get-progress/:userId',getProgress);
progressRoute.post('/updateProgress',updateUserProgress)

export default progressRoute;