
-- 1. Create leads table for contact form
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  service text,
  budget text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anon)
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

-- 2. Create site_config table for admin CMS persistence
CREATE TABLE public.site_config (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Public can read site config
CREATE POLICY "Public can read site_config"
  ON public.site_config FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated can insert/update
CREATE POLICY "Authenticated can insert site_config"
  ON public.site_config FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update site_config"
  ON public.site_config FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
