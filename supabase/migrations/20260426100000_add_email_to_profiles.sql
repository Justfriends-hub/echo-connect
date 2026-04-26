-- Add email column to profiles table if missing
DO $$ BEGIN
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
EXCEPTION WHEN duplicate_column THEN NULL; END $$;

-- Add bot flag to profiles table if missing
DO $$ BEGIN
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_bot boolean DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL; END $$;

UPDATE public.profiles SET is_bot = false WHERE is_bot IS NULL;

-- Populate email from auth.users
UPDATE public.profiles
SET email = auth.users.email
FROM auth.users
WHERE public.profiles.id = auth.users.id;

-- Make email unique if possible; leave nullable if not all users have email
DO $$ BEGIN
  ALTER TABLE public.profiles ADD CONSTRAINT IF NOT EXISTS profiles_email_key UNIQUE (email);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Ensure is_bot cannot be null
DO $$ BEGIN
  ALTER TABLE public.profiles ALTER COLUMN is_bot SET NOT NULL;
EXCEPTION WHEN undefined_column THEN NULL; END $$;

-- Update RLS policies to allow reading email
-- Assuming profiles are viewable by authenticated users, email should be included