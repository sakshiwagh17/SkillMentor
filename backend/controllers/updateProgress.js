import progressModel from "../models/progressModel.js";

export const updateUserProgress = async (req, res) => {
  try {
    const { userId, topic, score, totalQuestions, correctAnswers } = req.body;

    // Check if there's existing progress
    let progress = await progressModel.findOne({ userId, topic });

    if (progress) {
      // Update existing progress
      progress.totalAttempts += 1;
      progress.correctAnswers += correctAnswers;
      progress.lastScore = score;
      progress.timestamp = Date.now();
    } else {
      // Create new progress document
      progress = new progressModel({
        userId,
        topic,
        totalAttempts: 1,
        correctAnswers,
        lastScore: score,
      });
    }

    await progress.save();
    res.status(200).json({ message: "Progress updated successfully", progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
