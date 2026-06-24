-- Add contact fields to site_settings
ALTER TABLE public.site_settings
ADD COLUMN contact_email text DEFAULT 'contact@example.com',
ADD COLUMN contact_twitter text DEFAULT 'https://twitter.com/example',
ADD COLUMN contact_youtube text DEFAULT 'https://youtube.com/example',
ADD COLUMN contact_discord text DEFAULT 'example_discord_tag';

COMMENT ON COLUMN public.site_settings.contact_email IS 'Email address to copy in Contact app';
COMMENT ON COLUMN public.site_settings.contact_twitter IS 'Twitter URL to redirect in Contact app';
COMMENT ON COLUMN public.site_settings.contact_youtube IS 'Youtube URL to redirect in Contact app';
COMMENT ON COLUMN public.site_settings.contact_discord IS 'Discord username to copy in Contact app';
