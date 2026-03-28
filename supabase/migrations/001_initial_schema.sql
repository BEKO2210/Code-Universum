-- Code-Universum: Initial Database Schema
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  github_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TAGS
-- ============================================
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- COMPONENTS (HTML/CSS/JS/React snippets)
-- ============================================
CREATE TABLE public.components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  code_html TEXT,
  code_css TEXT,
  code_js TEXT,
  code_tailwind TEXT,
  framework TEXT NOT NULL DEFAULT 'vanilla'
    CHECK (framework IN ('vanilla', 'react', 'vue', 'svelte')),
  is_full_page BOOLEAN NOT NULL DEFAULT false,
  preview_url TEXT,
  thumbnail_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_components_full_page ON public.components(is_full_page) WHERE is_full_page = true;

-- ============================================
-- FULL SITES (ZIP uploads)
-- ============================================
CREATE TABLE public.full_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  storage_path TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  entry_point TEXT NOT NULL DEFAULT 'index.html',
  project_type TEXT NOT NULL DEFAULT 'static'
    CHECK (project_type IN ('static', 'node', 'nextjs', 'vite')),
  package_json JSONB,
  thumbnail_url TEXT,
  likes_count INTEGER NOT NULL DEFAULT 0,
  views_count INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- JUNCTION: Component <-> Tags
-- ============================================
CREATE TABLE public.component_tags (
  component_id UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (component_id, tag_id)
);

-- ============================================
-- JUNCTION: Site <-> Tags
-- ============================================
CREATE TABLE public.site_tags (
  site_id UUID NOT NULL REFERENCES public.full_sites(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (site_id, tag_id)
);

-- ============================================
-- LIKES (polymorphic via content_type)
-- ============================================
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('component', 'site')),
  content_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, content_type, content_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_components_author ON public.components(author_id);
CREATE INDEX idx_components_framework ON public.components(framework);
CREATE INDEX idx_components_public ON public.components(is_public) WHERE is_public = true;
CREATE INDEX idx_full_sites_author ON public.full_sites(author_id);
CREATE INDEX idx_full_sites_public ON public.full_sites(is_public) WHERE is_public = true;
CREATE INDEX idx_likes_content ON public.likes(content_type, content_id);
CREATE INDEX idx_likes_user ON public.likes(user_id);
CREATE INDEX idx_tags_slug ON public.tags(slug);
CREATE INDEX idx_tags_category ON public.tags(category);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.full_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_tags ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "profiles_own_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Components
CREATE POLICY "components_public_read" ON public.components
  FOR SELECT USING (is_public = true OR auth.uid() = author_id);
CREATE POLICY "components_own_insert" ON public.components
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "components_own_update" ON public.components
  FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "components_own_delete" ON public.components
  FOR DELETE USING (auth.uid() = author_id);

-- Full Sites
CREATE POLICY "sites_public_read" ON public.full_sites
  FOR SELECT USING (is_public = true OR auth.uid() = author_id);
CREATE POLICY "sites_own_insert" ON public.full_sites
  FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "sites_own_update" ON public.full_sites
  FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "sites_own_delete" ON public.full_sites
  FOR DELETE USING (auth.uid() = author_id);

-- Likes
CREATE POLICY "likes_public_read" ON public.likes
  FOR SELECT USING (true);
CREATE POLICY "likes_auth_insert" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "likes_own_delete" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- Tags (read-only for users)
CREATE POLICY "tags_public_read" ON public.tags
  FOR SELECT USING (true);

-- Component Tags
CREATE POLICY "component_tags_read" ON public.component_tags
  FOR SELECT USING (true);
CREATE POLICY "component_tags_insert" ON public.component_tags
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.components WHERE id = component_id AND author_id = auth.uid())
  );
CREATE POLICY "component_tags_delete" ON public.component_tags
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.components WHERE id = component_id AND author_id = auth.uid())
  );

-- Site Tags
CREATE POLICY "site_tags_read" ON public.site_tags
  FOR SELECT USING (true);
CREATE POLICY "site_tags_insert" ON public.site_tags
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.full_sites WHERE id = site_id AND author_id = auth.uid())
  );
CREATE POLICY "site_tags_delete" ON public.site_tags
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.full_sites WHERE id = site_id AND author_id = auth.uid())
  );

-- ============================================
-- TRIGGERS: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_components_updated
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_sites_updated
  BEFORE UPDATE ON public.full_sites
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'user_name',
      NEW.raw_user_meta_data->>'preferred_username',
      split_part(NEW.email, '@', 1)
    ),
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED: Default Tags
-- ============================================
INSERT INTO public.tags (name, slug, category) VALUES
  ('Button', 'button', 'type'),
  ('Card', 'card', 'type'),
  ('Loader', 'loader', 'type'),
  ('Form', 'form', 'type'),
  ('Navigation', 'navigation', 'type'),
  ('Modal', 'modal', 'type'),
  ('Toggle', 'toggle', 'type'),
  ('Input', 'input', 'type'),
  ('Landing Page', 'landing-page', 'type'),
  ('Dashboard', 'dashboard', 'type'),
  ('Hero', 'hero', 'type'),
  ('Footer', 'footer', 'type'),
  ('Pricing', 'pricing', 'type'),
  ('Tooltip', 'tooltip', 'type'),
  ('Checkbox', 'checkbox', 'type'),
  ('Full Webpage', 'full-webpage', 'type'),
  ('Portfolio', 'portfolio', 'type'),
  ('Sidebar', 'sidebar', 'type'),
  ('Table', 'table', 'type'),
  ('Accordion', 'accordion', 'type'),
  ('React', 'react', 'framework'),
  ('Vue', 'vue', 'framework'),
  ('Svelte', 'svelte', 'framework'),
  ('Vanilla', 'vanilla', 'framework'),
  ('Tailwind', 'tailwind', 'framework'),
  ('Glassmorphism', 'glassmorphism', 'style'),
  ('Neon', 'neon', 'style'),
  ('Neumorphism', 'neumorphism', 'style'),
  ('Gradient', 'gradient', 'style'),
  ('Minimalist', 'minimalist', 'style'),
  ('Brutalist', 'brutalist', 'style'),
  ('Retro', 'retro', 'style'),
  ('3D', '3d', 'style');
