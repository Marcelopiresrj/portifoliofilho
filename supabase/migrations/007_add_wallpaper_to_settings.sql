-- Add wallpaper field to site_settings
ALTER TABLE public.site_settings
ADD COLUMN wallpaper_url text DEFAULT '/wallpaper.jpg';

COMMENT ON COLUMN public.site_settings.wallpaper_url IS 'URL for the desktop wallpaper image';
