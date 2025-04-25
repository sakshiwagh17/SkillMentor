import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateMastery = async (topic, subject) => {
  try {
    const prompt = `
Act like an Expert Tutor.

The subject is: ${subject}

The topic is: ${topic}

Goal: Suggest advanced, in-depth, and mastery-level learning resources to help the user reach expert-level proficiency in this topic.

Strict Guidelines:
1. Focus ONLY on advanced concepts, deep-dive resources, case studies, projects, or real-world applications.
2. Recommend:
   - Videos (deep-dive lectures, masterclasses, real-world use cases)
   - Articles (research-based, detailed guides, expert blogs)
   - Exercises (challenging projects, case studies, real-world problem-solving)

Output Rules:
- No beginner content.
- No explanation or extra text.
- Output ONLY pure JSON in this format:

[
  {
    "Topic": "${topic}",
    "Videos": ["Title - URL"],
    "Articles": ["Title - URL"],
    "Exercises": ["Challenging Project or Exercise Description"]
  }
]
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const aiText = aiResponse.choices[0].message.content;
    const formattedData = aiText.replace(/```json|```/g, "").trim();

    let masteryPath;
    try {
      masteryPath = JSON.parse(formattedData);
    } catch (jsonError) {
      console.log("AI response is not valid JSON, raw response:", aiText);
      throw new Error("Failed to parse AI response to JSON");
    }

    return masteryPath;
  } catch (error) {
    console.error("Error generating mastery learning path:", error);
    return { message: "Error in mastery recommendations!", error };
  }
};
