# Code Quest Database Setup Guide

This guide will help you set up the Supabase database for Code Quest.

## Prerequisites

1. A Supabase account
2. Access to the Supabase SQL Editor

## Setup Steps

### 1. Create a New Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in to your account
2. Create a new project
3. Choose a name for your project (e.g., "code-quest")
4. Set a secure database password
5. Choose a region close to your users
6. Click "Create new project"

### 2. Set Up the Database Schema

1. Once your project is created, go to the SQL Editor
2. Copy the contents of the `supabase/schema.sql` file
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL script

### 3. Fix Database Issues (if needed)

If you encounter errors related to missing columns or tables, run the comprehensive fix script:

1. Go to the SQL Editor
2. Copy the contents of the `supabase/fix_database.sql` file
3. Paste it into the SQL Editor
4. Click "Run" to execute the SQL script

This script will:

- Add missing columns to the profiles table (`avatar_url`, `website`)
- Create the challenges table if it doesn't exist
- Add sample challenges to the challenges table
- Fix the completed_challenges table structure

### 4. Get Your API Keys

1. Go to Project Settings > API
2. Copy the "URL" and "anon" key
3. Add these to your `.env.local` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Set Up Authentication

1. Go to Authentication > Settings
2. Configure your site URL (e.g., `http://localhost:5173`)
3. Enable the authentication providers you want to use (Email, Google, GitHub, etc.)

#### For Email Authentication

1. Make sure "Enable Email Signup" is turned on
2. Configure your email templates if desired

#### For OAuth Providers (Google, GitHub, etc.)

1. Create OAuth applications on the respective platforms
2. Add the client ID and secret to Supabase
3. Configure the redirect URLs

### 6. Test the Connection

1. Start your application
2. Try to sign up for a new account
3. Check the Supabase dashboard to see if the user was created
4. Verify that the profile, skills, and performance metrics tables were populated

## Database Schema Overview

The database includes the following tables:

1. **profiles**: Stores user profile information
2. **skills**: Tracks user skill levels in different programming languages
3. **completed_challenges**: Records challenges completed by users
4. **performance_metrics**: Stores user performance data
5. **ai_challenges**: Stores AI-generated challenges
6. **challenges**: Stores predefined coding challenges

## Row Level Security (RLS)

The database uses Row Level Security to ensure that users can only access their own data. The policies are set up as follows:

1. Users can view, update, and insert their own profile data
2. Users can view, update, and insert their own skills data
3. Users can view and insert their own completed challenges
4. Users can view and insert their own performance metrics
5. Users can view and insert their own AI challenges
6. Users can view public AI challenges
7. Anyone can view challenges

## Troubleshooting

### Missing Columns

If you encounter errors about missing columns, run the `fix_avatar_url.sql` script as described above.

### Authentication Issues

1. Make sure your site URL is correctly configured in Supabase
2. Check that your `.env.local` file has the correct API keys
3. Verify that the authentication providers are properly configured

### Data Not Being Saved

1. Check the browser console for errors
2. Verify that the RLS policies are correctly set up
3. Make sure the user is authenticated before trying to save data

## Need Help?

If you encounter any issues, please:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Look for error messages in the browser console
3. Check the Supabase dashboard for any error logs
