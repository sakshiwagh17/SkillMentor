import OpenAI from 'openai'
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const suggestLearningPath = async (topic, subject) => {
    console.log(topic);
    console.log(subject);
    try {
        const prompt = `
Act like a Professional Tutor.

The subject is: ${subject}
The weak topics are: ${topic}

Your job is to suggest a personalized learning path to master these topics strictly within this subject using real existing resources.

For each topic, suggest:
- 2 best **real** YouTube videos (Title - Full working YouTube URL)
- 2 best articles (Title - Full working URL)
- 1 practice exercise (Short Description)

Strict Rules:
1. The YouTube links must be real and working — do not make them up.
2. The articles must be available online.
3. Do not include unrelated topics.
4. No extra explanation.
5. Return ONLY a JSON array in this exact format:

[
  {
    "Topic": "${topic}",
    "Videos": ["Title - Full YouTube URL", ...],
    "Articles": ["Title - Full URL", ...],
    "Exercises": ["Exercise Description"]
  }
]
`;



        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
        });
        const aiText = aiResponse.choices[0].message.content;
        const formattedData = aiText.replace(/```json|```/g, "");
        const learningPath = JSON.parse(formattedData);
        console.log("Learning Path:", learningPath);


        return learningPath;
    } catch (error) {
        console.log(error);
        return { message: "Error in recommadations!", error };

    }

}