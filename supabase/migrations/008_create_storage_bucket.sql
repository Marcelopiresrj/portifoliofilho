-- Create the storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public read access
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Policy to allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' AND 
  auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to update their files
CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
WITH CHECK (
  bucket_id = 'portfolio-images' AND 
  auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' AND 
  auth.role() = 'authenticated'
);
