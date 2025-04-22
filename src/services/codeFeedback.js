// Code written and maintained by Elisee Kajingu
import openai from '../openaiClient';

export async function getCodeFeedback(code, language, challenge) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert ${language} developer providing feedback on code.
                   Analyze the code for a challenge and provide constructive feedback.
                   Focus on code quality, efficiency, and best practices.
                   Be encouraging but highlight areas for improvement.`
        },
        {
          role: "user",
          content: `Challenge: ${challenge.title}
                   Description: ${challenge.description}
                   My solution:
                   \`\`\`${language}
                   ${code}
                   \`\`\``
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating code feedback:", error);
    throw error;
  }
}
