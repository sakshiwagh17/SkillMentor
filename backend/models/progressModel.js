import mongoose from "mongoose";

//to store the user progress
const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    topic: { type: String, required: true },
    totalAttempts: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    lastScore: { type: Number, default: 0 }, // latest score %
    timestamp: { type: Date, default: Date.now }
  })
  
const progressModel=mongoose.model('progressModel',userProgressSchema);
export default progressModel;