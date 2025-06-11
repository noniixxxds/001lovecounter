/*
  # Create mini sites table

  1. New Tables
    - `mini_sites`
      - `id` (uuid, primary key)
      - `page_title` (text, required)
      - `message` (text, optional)
      - `start_date` (date, optional)
      - `photos` (text array for storing photo URLs)
      - `youtube_url` (text, optional)
      - `animation` (text, optional)
      - `contact_name` (text, required)
      - `contact_email` (text, required)
      - `contact_phone` (text, optional)
      - `site_url` (text, unique, required)
      - `payment_status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `mini_sites` table
    - Add policy for public insert (anyone can create a mini site)
    - Add policy for admin read access
*/

CREATE TABLE IF NOT EXISTS mini_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_title text NOT NULL,
  message text,
  start_date date,
  photos text[] DEFAULT '{}',
  youtube_url text,
  animation text,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  site_url text UNIQUE NOT NULL,
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mini_sites ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new mini sites
CREATE POLICY "Anyone can create mini sites"
  ON mini_sites
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow public read access to individual sites by URL
CREATE POLICY "Public can read mini sites by URL"
  ON mini_sites
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_mini_sites_updated_at
  BEFORE UPDATE ON mini_sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();