-- Code written and maintained by Elisee Kajingu
-- This script fixes the missing avatar_url column in the profiles table

-- Check if avatar_url column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'avatar_url'
  ) THEN
    -- Add avatar_url column if it doesn't exist
    ALTER TABLE profiles ADD COLUMN avatar_url TEXT;
  END IF;
END $$;

-- Check if website column exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'profiles'
    AND column_name = 'website'
  ) THEN
    -- Add website column if it doesn't exist
    ALTER TABLE profiles ADD COLUMN website TEXT;
  END IF;
END $$;
