// ============================================
// Code-Universum: Shared TypeScript Types
// ============================================

export type Framework = "vanilla" | "react" | "vue" | "svelte";
export type ProjectType = "static" | "node" | "nextjs" | "vite";
export type ContentType = "component" | "site";
export type TagCategory = "type" | "framework" | "style" | "general";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  github_url: string | null;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  category: TagCategory;
  created_at: string;
}

export interface Component {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  code_html: string | null;
  code_css: string | null;
  code_js: string | null;
  code_tailwind: string | null;
  framework: Framework;
  preview_url: string | null;
  thumbnail_url: string | null;
  likes_count: number;
  views_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface FullSite {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  storage_path: string;
  file_size_bytes: number;
  entry_point: string;
  project_type: ProjectType;
  package_json: Record<string, unknown> | null;
  thumbnail_url: string | null;
  likes_count: number;
  views_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  content_type: ContentType;
  content_id: string;
  created_at: string;
}

// Joined types for display
export interface ComponentWithAuthor extends Component {
  author: Pick<Profile, "id" | "username" | "avatar_url">;
  tags: Tag[];
}

export interface FullSiteWithAuthor extends FullSite {
  author: Pick<Profile, "id" | "username" | "avatar_url">;
  tags: Tag[];
}

// WebContainer state
export type WebContainerStatus =
  | "idle"
  | "booting"
  | "mounting"
  | "installing"
  | "running"
  | "ready"
  | "error";

export interface WebContainerState {
  status: WebContainerStatus;
  url: string | null;
  error: string | null;
}

// Upload types
export interface ComponentUploadPayload {
  title: string;
  description?: string;
  code_html?: string;
  code_css?: string;
  code_js?: string;
  code_tailwind?: string;
  framework: Framework;
  tag_ids: string[];
}

export interface SiteUploadPayload {
  title: string;
  description?: string;
  file: File;
  tag_ids: string[];
}
