# Code-Universum — Project Memory

## Status: Phase 4 — Final QA Audit Complete
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
| Hosting | GitHub Pages (static export) | Free, auto-deploy via Actions |
| Graceful degradation | Placeholder Supabase client | Site works without backend |
| Mobile nav | Hamburger menu + fullscreen overlay | Touch-first, 44px+ targets |

## Database Schema
- See: `supabase/migrations/001_initial_schema.sql`
- Tables: profiles, components, full_sites, tags, component_tags, site_tags, likes
- All tables have RLS enabled
- Auto-profile creation on auth.users insert
- Auto updated_at triggers on profiles, components, full_sites
- 28 seed tags in 3 categories (type, framework, style)

## API Routes (Supabase Edge Functions)
| Function | Path | Purpose |
|---|---|---|
| process-upload | /functions/v1/process-upload | Validate ZIP, extract metadata |
| scan-code | /functions/v1/scan-code | Security scan uploaded code |

## Pages
| Route | Type | Description |
|---|---|---|
| / | Homepage | Hero, stats from DB, recent components grid |
| /components | Browse | Grid with tag filters, likes, copy code |
| /sites | Browse | Full site cards with type badges |
| /upload/component | Dashboard | Code editor with live preview, tag selector |
| /upload/site | Dashboard | ZIP drag-and-drop with security scan |
| /login | Auth | GitHub OAuth |
| /callback | Auth | OAuth redirect handler (client-side) |
| /terms | Legal | Terms of Use |
| /privacy | Legal | Privacy Policy (GDPR) |
| /impressum | Legal | Impressum with MIT license |

## Key Technical Notes
- `output: "export"` in next.config.ts for GitHub Pages static deploy
- `basePath: /Code-Universum` for GitHub Pages subpath
- COOP/COEP headers defined but NOT applied in static export (need Vercel for WebContainers)
- `isSupabaseConfigured` flag guards all DB calls — site renders without backend
- Placeholder Supabase client prevents crash when env vars missing
- GitHub Actions workflow reads secrets for build-time env vars
- All `<a>` replaced with Next.js `<Link>` for basePath support

## Mobile Responsiveness (Phase 2)
- Hamburger menu with AnimatePresence fullscreen overlay
- All touch targets min 44px (h-10, h-12 buttons)
- Stats grid: 1 col mobile, 3 col desktop
- Component grid: 1 col mobile, 2/3/4 col responsive
- Reduced padding on mobile (px-4 sm:px-6, py-6 sm:py-8)
- Hero title: text-3xl mobile, text-5xl sm, text-7xl md, text-8xl lg
- Legal pages: reduced spacing on mobile
- Upload forms: reduced min-heights and padding on mobile

## Implementation Progress
- [x] Architecture plan approved
- [x] Project scaffold (Next.js 16 + React 19 + deps)
- [x] Supabase schema + RLS policies (migration file)
- [x] COOP/COEP headers configured
- [x] Tailwind v4 dark glassmorphism theme
- [x] Folder structure created
- [x] GitHub Actions deploy workflow
- [x] Real auth flow (GitHub OAuth via Supabase)
- [x] Real component upload form with live preview
- [x] Real ZIP site upload with security scan
- [x] Real browse pages (DB queries, tag filters, likes)
- [x] Legal pages (Terms, Privacy, Impressum)
- [x] SETUP.md guide for Supabase + GitHub setup
- [x] Graceful degradation without Supabase
- [x] Mobile-first responsive design (all pages)
- [x] SEO: robots.txt, sitemap.xml, OG tags, Twitter Cards, JSON-LD
- [x] Lighthouse: CSS animations for LCP, contrast fix, aria-labels
- [x] PWA manifest, favicon.svg, apple-touch-icon, og-image
- [x] Per-page metadata (unique title/description/canonical on every route)
- [x] Accessibility: focus-visible, skip-to-content, reduced-motion, 4.5:1 contrast
- [x] Component Detail Modal (click card -> code tabs, live preview)
- [x] QA Audit: removed dead server-side files, security verified
- [ ] WebContainer live preview for full sites
- [ ] User profile page
- [ ] Search functionality
- [ ] Code syntax highlighting (shiki)

## QA Audit (Phase 4) — Bugs Found & Fixed
| Zone | Bug | Severity | Fix |
|---|---|---|---|
| 1 | server.ts uses cookies() — crashes on static export | CRITICAL | Deleted file (unused) |
| 1 | middleware.ts uses NextRequest — crashes on static export | CRITICAL | Deleted file (unused) |
| 1 | Auth callback redirect missing origin | HIGH | Added window.location.origin |
| 2 | Modal z-index vs Header | OK | Modal z-[100] > Header z-50 |
| 2 | Scroll lock cleanup | OK | useEffect cleanup in both modal and header |
| 3 | Iframe sandbox | OK | All use sandbox="allow-scripts" only (no allow-same-origin) |
| 3 | Missing aria-hidden on iframes | LOW | Added to upload preview + modal preview |
| 4 | Hydration mismatches | OK | All window/document access inside useEffect or handlers |

## SEO & Lighthouse Decisions (Phase 3)
| What | Choice | Why |
|---|---|---|
| Above-fold animation | CSS @keyframes | Framer Motion blocks LCP |
| Muted text color | #7b7b9a (was #555570) | WCAG AA 4.5:1 contrast |
| OG image | SVG (1200x630) | No build tooling needed |
| Favicon | SVG with "CU" letters | Scales to any size |
| Structured Data | JSON-LD WebApplication | Google rich snippets |
| Sitemap | Static XML in public/ | output:export compatible |
| Metadata | Next.js Metadata API + layout wrappers | Unique per page |
