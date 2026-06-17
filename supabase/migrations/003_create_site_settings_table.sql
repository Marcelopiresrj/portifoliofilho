-- Migration: Create site_settings table
-- Created for Marcelo's Portfolio global configurations

CREATE TABLE IF NOT EXISTS public.site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  about_text text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Ensure there is always exactly one row
INSERT INTO public.site_settings (id, about_text)
VALUES (1, 'Hello! I am Marcelo, an software engineer and creative designer who loves building tactile, beautifully structured digital experiences.\n\nMy design philosophy is grounded in simplicity & responsive fluidism. Whether it is adjusting typographic scales or writing custom GSAP interpolation equations for fine letters, I prioritize detail in every viewport.\n\nI specialize in combining React, TypeScript, and Tailwind with high-fidelity performance.')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can SELECT (read settings)
CREATE POLICY "Allow public reads on site_settings" ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Only authenticated users (admin) can UPDATE
CREATE POLICY "Allow authenticated updates on site_settings" ON public.site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Comments
COMMENT ON TABLE public.site_settings IS 'Global site settings and content like the About Me section';
