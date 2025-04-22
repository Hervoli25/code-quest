# Code Quest API Integration Setup Guide

This guide will help you set up the Supabase and OpenAI API integrations for Code Quest.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account
- An [OpenAI](https://openai.com/) account with API access

## Setup Steps

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js openai
# or
yarn add @supabase/supabase-js openai
```

### 2. Set Up Supabase

1. Create a new project on [Supabase](https://app.supabase.com/)
2. Once your project is created, go to Project Settings > API
3. Copy your project URL and anon key
4. Create a `.env.local` file in your project root (use the `.env.local.example` as a template)
5. Add your Supabase URL and anon key to the `.env.local` file:

6. Set up the database schema:

   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Paste and run the SQL in the Supabase SQL Editor

7. Enable the authentication providers you want to use:
   - Go to Authentication > Providers in your Supabase dashboard
   - Enable Email/Password authentication
   - Optionally, configure GitHub, Google, or other OAuth providers

### 3. Set Up OpenAI API

1. Create an account on [OpenAI](https://openai.com/) if you don't have one
2. Go to [API Keys](https://platform.openai.com/account/api-keys) in your OpenAI dashboard
3. Create a new API key
4. Add your OpenAI API key to the `.env.local` file:

```
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 4. Update Supabase Client

Open `src/supabaseClient.js` and replace the placeholder values with your environment variables:

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## Testing the Integration

1. Start your development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5174`
3. You should see the authentication screen
4. Create an account or sign in
5. Test the AI challenge generation feature in the Code Quest Playground

## Troubleshooting

### Authentication Issues

- Make sure your Supabase project has Email/Password authentication enabled
- Check that your Supabase URL and anon key are correct
- If using OAuth providers, ensure they are properly configured in the Supabase dashboard

### OpenAI API Issues

- Verify your OpenAI API key is valid and has sufficient credits
- Check the browser console for any API-related errors
- Ensure your OpenAI account has access to the GPT-4 model

### Database Issues

- Confirm that all tables were created successfully in Supabase
- Check that Row Level Security (RLS) policies are properly configured
- Verify that the database triggers for new user creation are working

## Next Steps

- Customize the authentication UI to match your application's theme
- Add more OpenAI-powered features like code explanation or debugging assistance
- Implement user profiles and social features using Supabase Realtime

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [React Supabase Auth Example](https://github.com/supabase/supabase/tree/master/examples/auth/react)
