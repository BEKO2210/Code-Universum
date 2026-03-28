# Code-Universum — Project Memory

## Status: Phase 1 — Architecture & Initial Scaffold
Last updated: 2026-03-28

## Architecture Decisions
| Decision | Choice | Rationale |
|---|---|---|
| Preview: Snippets | iframe srcdoc | Instant, no WASM overhead |
| Preview: Full Sites | WebContainers API | Full Node.js runtime in browser |
| Auth | Supabase Auth (GitHub OAuth) | Dev-focused audience |
| Storage | Supabase Storage | Integrated with auth, signed URLs |
| State | Zustand | Lightweight, no boilerplate |
| Styling | Tailwind v4 + Framer Motion | Modern, CSS-first config |
| ZIP extraction | JSZip (client-side) | No server compute needed |
| WebContainer | Singleton per tab | Only 1 instance allowed per browser tab |
| Mobile fallback | Screenshot preview | No SharedArrayBuffer on mobile |

## Database Schema
- See: `supabase/migrations/001_initial_schema.sql`
- Tables: profiles, components, full_sites, tags, component_tags, site_tags, likes
- All tables have RLS enabled
- Auto-profile creation on auth.users insert
- Auto updated_at triggers on profiles, components, full_sites

## API Routes (Supabase Edge Functions)
| Function | Path | Purpose |
|---|---|---|
| process-upload | /functions/v1/process-upload | Validate ZIP, extract metadata, detect project type |
| scan-code | /functions/v1/scan-code | Security scan uploaded code before DB insert |

## Next.js API Routes
| Route | Purpose |
|---|---|
| /api/preview/snippet | Server-side render snippet for OG images |

## Key Technical Notes
- COOP/COEP headers required site-wide for WebContainers (SharedArrayBuffer)
- WebContainer boot is async, ~2-5s cold start
- JSZip extracts ZIP client-side → converts to WebContainer FileSystemTree
- Next.js projects in WebContainer are heavy (~500MB); prioritize Vite/static first

## Component Inventory
- [ ] GlassCard — glassmorphism card primitive
- [ ] NeonButton — neon-accented CTA button
- [ ] CodeBlock — syntax-highlighted code (shiki)
- [ ] TagBadge — tag pill component
- [ ] Header — main navigation
- [ ] Sidebar — tag filter sidebar
- [ ] SnippetPreview — iframe srcdoc for HTML/CSS
- [ ] WebContainerPreview — full site preview
- [ ] PreviewToolbar — dark/light toggle, copy, fullscreen
- [ ] ComponentUploadForm — multi-step snippet upload
- [ ] SiteUploadForm — ZIP upload with drag-and-drop
- [ ] FileDropzone — reusable file drop area
- [ ] ComponentCard — browse grid item
- [ ] SiteCard — browse grid item for full sites

## Implementation Progress
- [x] Architecture plan approved
- [x] Project scaffold (Next.js 16 + React 19 + deps)
- [x] Supabase schema + RLS policies (migration file)
- [x] COOP/COEP headers configured
- [x] Tailwind v4 dark glassmorphism theme
- [x] Folder structure created
- [ ] Auth flow (GitHub OAuth)
- [ ] Design system primitives (GlassCard, NeonButton, CodeBlock)
- [ ] Component upload flow
- [ ] Full-site upload + WebContainer preview
- [ ] Browse/discovery page
- [ ] Pre-commit security hooks
