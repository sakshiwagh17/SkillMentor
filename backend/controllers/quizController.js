import { generateQuiz } from "../utils/generateMCQ.js";

export const generateMCQ = async (req, res) => {
  const { subject, topic, difficulty } = req.body;

  try {
    const questions = await generateQuiz(subject, topic, difficulty);

    res.json({
      success: true,
      message: "MCQ generated successfully!",
      questions, // directly send it
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to generate mcq!", error });
  }
};
