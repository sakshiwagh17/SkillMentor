import mongoose from "mongoose";
import progressModel from "../models/progressModel.js";

export const getProgress = async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    const progressData = await progressModel.find({ userId: userId }).sort({ timestamp: -1 });


    if (!progressData || progressData.length === 0) {
      return res.status(404).json({ message: "No progress found." });
    }

    const totalQuizzes = progressData.length;
    const totalScore = progressData.reduce((acc, item) => acc + item.lastScore, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const lastTopic = progressData[0].topic;

    return res.json({
      totalQuizzes,
      averageScore,
      lastTopic,
    });
  } catch (err) {
    console.error("Error fetching progress:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
