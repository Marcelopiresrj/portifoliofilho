-- Migration: Update projects table for clients showcase
-- Drops unused columns and adds youtube_urls array

-- Drop unused columns
ALTER TABLE public.projects 
  DROP COLUMN IF EXISTS tags,
  DROP COLUMN IF EXISTS demo_link,
  DROP COLUMN IF EXISTS github_link,
  DROP COLUMN IF EXISTS icon,
  DROP COLUMN IF EXISTS youtube_url;

-- Add youtube_urls column
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS youtube_urls text[] DEFAULT '{}';

-- Add a comment
COMMENT ON TABLE public.projects IS 'Portfolio client projects containing video carousels';
