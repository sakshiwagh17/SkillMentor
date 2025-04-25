import express from 'express';
import { generateMCQ } from '../controllers/quizController.js';

const quizRoute = express.Router();

quizRoute.post('/get-quiz', generateMCQ);

export default quizRoute;