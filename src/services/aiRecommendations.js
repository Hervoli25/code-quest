// Code written and maintained by Elisee Kajingu
import openai from '../openaiClient';

export async function getPersonalizedRecommendations(userSkills, completedChallenges, performanceMetrics) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI learning assistant that provides personalized coding recommendations.
                   Analyze the user's skills, completed challenges, and performance metrics to suggest
                   the next best topics or challenges to focus on.`
        },
        {
          role: "user",
          content: `Based on my current progress, what should I focus on next?
                   My skills: ${JSON.stringify(userSkills)}
                   Completed challenges: ${completedChallenges.length}
                   Performance: ${JSON.stringify(performanceMetrics)}`
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}
