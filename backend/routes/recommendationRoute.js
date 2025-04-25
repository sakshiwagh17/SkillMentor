import express from 'express'
import { getMastery, getrecommendation } from "../controllers/recommendationController.js";

const recommendationsRoute=express.Router();
recommendationsRoute.post('/get-recommendation',getrecommendation);
recommendationsRoute.post('/get-mastery',getMastery);

export default recommendationsRoute;



