-- Code written and maintained by Elisee Kajingu
-- This script fixes missing columns and tables in the database

-- Fix profiles table
DO $$
BEGIN
  -- Add avatar_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
  END IF;

  -- Add website column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'website'
  ) THEN
    ALTER TABLE profiles ADD COLUMN website TEXT;
  END IF;
END $$;

-- Create challenges table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'challenges'
  ) THEN
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
      
    -- Insert sample challenges
    INSERT INTO challenges (title, description, difficulty, category, tags, xp)
    VALUES 
      ('Reverse a String', 'Write a function that reverses a string. The input string is given as an array of characters.', 'Beginner', 'algorithms', ARRAY['Strings', 'Arrays'], 50),
      ('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Beginner', 'algorithms', ARRAY['Arrays', 'Hash Table'], 75),
      ('Linked List Cycle', 'Given head, the head of a linked list, determine if the linked list has a cycle in it.', 'Intermediate', 'data-structures', ARRAY['Linked List', 'Two Pointers'], 100),
      ('Binary Search', 'Implement a binary search algorithm to find a target value in a sorted array.', 'Intermediate', 'algorithms', ARRAY['Binary Search', 'Arrays'], 100),
      ('Implement a Queue using Stacks', 'Implement a first in first out (FIFO) queue using only two stacks.', 'Advanced', 'data-structures', ARRAY['Stack', 'Queue', 'Design'], 150),
      ('Build a Responsive Navbar', 'Create a responsive navigation bar that collapses into a hamburger menu on mobile devices.', 'Intermediate', 'web-development', ARRAY['HTML', 'CSS', 'JavaScript'], 100),
      ('SQL Query Optimization', 'Optimize a complex SQL query to improve performance on a large database.', 'Advanced', 'databases', ARRAY['SQL', 'Performance'], 150),
      ('Implement a Neural Network', 'Build a simple neural network from scratch to classify handwritten digits.', 'Expert', 'machine-learning', ARRAY['Python', 'Neural Networks', 'Classification'], 200),
      ('Merge Sort Implementation', 'Implement the merge sort algorithm to sort an array of integers.', 'Intermediate', 'algorithms', ARRAY['Sorting', 'Divide and Conquer'], 100);
  END IF;
END $$;

-- Fix completed_challenges table
DO $$
BEGIN
  -- Check if challenge_id is TEXT
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'completed_challenges'
    AND column_name = 'challenge_id'
    AND data_type = 'text'
  ) THEN
    -- Create a temporary column
    ALTER TABLE completed_challenges ADD COLUMN temp_challenge_id UUID;
    
    -- Drop the foreign key constraint if it exists
    ALTER TABLE completed_challenges DROP CONSTRAINT IF EXISTS completed_challenges_challenge_id_fkey;
    
    -- Rename the old column
    ALTER TABLE completed_challenges RENAME COLUMN challenge_id TO old_challenge_id;
    
    -- Rename the new column
    ALTER TABLE completed_challenges RENAME COLUMN temp_challenge_id TO challenge_id;
    
    -- Add the foreign key constraint
    ALTER TABLE completed_challenges ADD CONSTRAINT completed_challenges_challenge_id_fkey 
      FOREIGN KEY (challenge_id) REFERENCES challenges(id);
  END IF;
  
  -- Add score column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'completed_challenges'
    AND column_name = 'score'
  ) THEN
    ALTER TABLE completed_challenges ADD COLUMN score INTEGER DEFAULT 0;
  END IF;
  
  -- Add time_taken column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'completed_challenges'
    AND column_name = 'time_taken'
  ) THEN
    ALTER TABLE completed_challenges ADD COLUMN time_taken INTEGER DEFAULT 0;
  END IF;
END $$;
