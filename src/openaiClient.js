// Code written and maintained by Elisee Kajingu
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // For client-side usage (consider server-side proxy for production)
});

export default openai;
