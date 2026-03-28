-- Patch: Add is_full_page column to components table
-- Run this in Supabase SQL Editor if you created the DB before this feature was added

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'components'
    AND column_name = 'is_full_page'
  ) THEN
    ALTER TABLE public.components ADD COLUMN is_full_page BOOLEAN NOT NULL DEFAULT false;
    CREATE INDEX idx_components_full_page ON public.components(is_full_page) WHERE is_full_page = true;
  END IF;
END $$;

-- Add new tags if they don't exist yet
INSERT INTO public.tags (name, slug, category)
VALUES
  ('Full Webpage', 'full-webpage', 'type'),
  ('Portfolio', 'portfolio', 'type'),
  ('Sidebar', 'sidebar', 'type'),
  ('Table', 'table', 'type'),
  ('Accordion', 'accordion', 'type')
ON CONFLICT (slug) DO NOTHING;
