import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateQuiz = async (subject, topic, difficulty) => {
    const prompt = `
  You are a Quiz Master. Generate 5 Multiple Choice Questions from ${subject} - Topic: ${topic} of ${difficulty} level.
  
  Response format (only pure JSON):
  [
    {
      "question": "Your question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Correct Option"
    }
  ]
  `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const result = response.choices[0].message.content;
        const formattedData = result.replace(/```json|```/g, "");
        // Parse response string to JSON
        const quizData = JSON.parse(formattedData);

        return quizData;
    } catch (error) {
        console.error('Error generating quiz:', error.message);
        throw new Error('Failed to generate quiz');
    }
};
