-- Code written and maintained by Elisee Kajingu

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  experience INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  skill_points INTEGER DEFAULT 0,
  theme TEXT DEFAULT 'fantasy',
  total_play_time INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0
);

-- Create a secure RLS policy for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  javascript INTEGER DEFAULT 0,
  html INTEGER DEFAULT 0,
  css INTEGER DEFAULT 0,
  python INTEGER DEFAULT 0,
  java INTEGER DEFAULT 0,
  ruby INTEGER DEFAULT 0,
  go INTEGER DEFAULT 0,
  csharp INTEGER DEFAULT 0,
  swift INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a secure RLS policy for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own skills"
  ON skills FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create challenges table
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  xp INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  starter_code TEXT,
  solution_code TEXT,
  test_cases JSONB
);

-- Create a secure RLS policy for challenges
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view challenges"
  ON challenges FOR SELECT
  USING (true);

-- Create completed challenges table
CREATE TABLE completed_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id),
  language TEXT NOT NULL,
  code TEXT,
  score INTEGER DEFAULT 0,
  time_taken INTEGER DEFAULT 0, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a secure RLS policy for completed challenges
ALTER TABLE completed_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own completed challenges"
  ON completed_challenges FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own completed challenges"
  ON completed_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create performance metrics table
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  total_attempts INTEGER DEFAULT 0,
  successful_attempts INTEGER DEFAULT 0,
  average_response_time FLOAT DEFAULT 0,
  last_review_dates JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create a secure RLS policy for performance metrics
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own metrics"
  ON performance_metrics FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own metrics"
  ON performance_metrics FOR UPDATE
  USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own metrics"
  ON performance_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create AI challenges table
CREATE TABLE ai_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  hints JSONB DEFAULT '[]'::jsonb,
  tests JSONB DEFAULT '[]'::jsonb,
  solution TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  is_public BOOLEAN DEFAULT false
);

-- Create a secure RLS policy for AI challenges
ALTER TABLE ai_challenges ENABLE ROW LEVEL SECURITY;

-- Users can view their own challenges
CREATE POLICY "Users can view their own challenges"
  ON ai_challenges FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own challenges
CREATE POLICY "Users can insert their own challenges"
  ON ai_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can view public challenges
CREATE POLICY "Users can view public challenges"
  ON ai_challenges FOR SELECT
  USING (is_public = true);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create a profile for the new user
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', NEW.email));

  -- Create skills entry for the new user
  INSERT INTO public.skills (user_id)
  VALUES (NEW.id);

  -- Create performance metrics entry for the new user
  INSERT INTO public.performance_metrics (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
