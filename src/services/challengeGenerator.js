// Code written and maintained by Elisee Kajingu
import openai from '../openaiClient';

export async function generateChallenge(language, difficulty, userSkills) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert coding instructor creating programming challenges. 
                   Generate a coding challenge in ${language} at ${difficulty} difficulty level.
                   The user's skill level in ${language} is ${userSkills[language]}/10.
                   Format your response as a JSON object with the following fields:
                   {
                     "title": "Challenge title",
                     "description": "Detailed description of the challenge",
                     "difficulty": "${difficulty}",
                     "category": "appropriate category",
                     "language": "${language}",
                     "starterCode": "Code template to start with",
                     "hints": ["Hint 1", "Hint 2", "Hint 3"],
                     "tests": [
                       {
                         "description": "Test description",
                         "test": "Code to test the solution"
                       }
                     ],
                     "solution": "Complete working solution code"
                   }`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error generating challenge:", error);
    throw error;
  }
}
