-- Migration: Add profile and photos to site_settings

ALTER TABLE public.site_settings
ADD COLUMN profile_photo_url text DEFAULT 'https://github.com/Marcelopiresrj.png',
ADD COLUMN photos_urls text[] DEFAULT ARRAY[
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&auto=format&fit=crop'
];

-- Comments
COMMENT ON COLUMN public.site_settings.profile_photo_url IS 'URL for the profile photo used in About and Contact';
COMMENT ON COLUMN public.site_settings.photos_urls IS 'Array of URLs for the Photos app gallery';
