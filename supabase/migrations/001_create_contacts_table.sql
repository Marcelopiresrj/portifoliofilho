-- Migration: Create contacts table
-- Created for Marcelo's Portfolio contact form integration

-- Create the contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL CHECK (char_length(name) > 0 AND char_length(name) <= 200),
  email       text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  message     text NOT NULL CHECK (char_length(message) > 0 AND char_length(message) <= 5000),
  created_at  timestamptz DEFAULT now() NOT NULL,
  is_read     boolean DEFAULT false NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT (send a contact message)
CREATE POLICY "Allow public inserts" ON public.contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admin) can SELECT
CREATE POLICY "Allow authenticated reads" ON public.contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can UPDATE (mark as read)
CREATE POLICY "Allow authenticated updates" ON public.contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_is_read_idx ON public.contacts (is_read);

-- Add a comment to the table
COMMENT ON TABLE public.contacts IS 'Contact form submissions from the portfolio website';
COMMENT ON COLUMN public.contacts.is_read IS 'Flag to track if admin has read the message';
