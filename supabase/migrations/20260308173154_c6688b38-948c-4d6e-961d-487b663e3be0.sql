ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS contacted boolean NOT NULL DEFAULT false;

-- Allow authenticated users to update leads (for the contacted toggle)
CREATE POLICY "Authenticated can update leads" ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);