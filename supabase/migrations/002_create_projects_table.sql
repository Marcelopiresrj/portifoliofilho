-- Migration: Create projects table
-- Created for Marcelo's Portfolio dynamic project management

-- Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL CHECK (char_length(title) > 0 AND char_length(title) <= 200),
  category    text NOT NULL CHECK (char_length(category) > 0 AND char_length(category) <= 100),
  description text NOT NULL CHECK (char_length(description) > 0 AND char_length(description) <= 2000),
  tags        text[] NOT NULL DEFAULT '{}',
  demo_link   text,
  github_link text,
  icon        text NOT NULL DEFAULT '🚀',
  featured    boolean NOT NULL DEFAULT false,
  created_at  timestamptz DEFAULT now() NOT NULL,
  order_idx   integer DEFAULT 0 NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can SELECT (read projects)
CREATE POLICY "Allow public reads on projects" ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can INSERT, UPDATE, DELETE
CREATE POLICY "Allow authenticated inserts on projects" ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated updates on projects" ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated deletes on projects" ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS projects_featured_idx ON public.projects (featured);
CREATE INDEX IF NOT EXISTS projects_order_idx ON public.projects (order_idx);

-- Add comments
COMMENT ON TABLE public.projects IS 'Portfolio projects displayed on the website';
