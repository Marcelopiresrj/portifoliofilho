-- Add favicon_url field to site_settings
ALTER TABLE public.site_settings
ADD COLUMN favicon_url text;

COMMENT ON COLUMN public.site_settings.favicon_url IS 'URL for the site favicon';
