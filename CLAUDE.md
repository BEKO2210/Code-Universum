@AGENTS.md

# Code-Universum Project Rules

## Project Overview
Open-source UI component & website sharing platform. Next.js 16 + React 19 + Supabase + Tailwind v4.
Hosted on GitHub Pages (static export). Backend via Supabase (PostgreSQL, Auth, Storage).

## Integrated Skill Frameworks

### 1. Superpowers (TDD Workflow)
- **Every new feature must follow RED-GREEN-REFACTOR**:
  1. RED: Write a failing test first (`src/__tests__/`)
  2. GREEN: Write minimal code to pass
  3. REFACTOR: Clean up while keeping tests green
- Run `npm run quality` before any commit (typecheck + lint + test)
- Tests use Vitest + Testing Library. Config: `vitest.config.ts`
- Break tasks into 2-5 minute chunks with exact file paths

### 2. ClaudeMem (Persistent Memory)
- Session context lives in `.claude-context/memory.md`
- Update memory.md after significant architecture decisions
- Track: schema changes, new pages, API routes, component inventory
- Format: tables for decisions, checklists for progress

### 3. Awesome Claude Code (Quality Gates)
- Pre-commit hook (`.husky/pre-commit`): typecheck + lint + tests
- All uploaded user code goes through `lib/utils/security.ts` scan
- No code ships without passing `npm run quality`

### 4. UI/UX Pro Max (Design System)
- Dark theme ONLY (no light mode toggle on site chrome)
- Glassmorphism + neon accents (cyan #00f0ff, purple #a855f7, pink #ec4899)
- WCAG AA: 4.5:1 contrast minimum, focus-visible outlines, skip-to-content
- Touch targets: min 44px on mobile (enforced via CSS)
- Reduced motion: respects `prefers-reduced-motion`
- Breakpoints: 375px (mobile), 640px (sm), 768px (md), 1024px (lg), 1440px (xl)
- Transitions: 150-300ms, cubic-bezier(0.4, 0, 0.2, 1)
- Anti-patterns to AVOID: generic light-gray UIs, missing hover states, invisible focus rings

## Key Technical Constraints
- `output: "export"` — static site, NO server-side routes
- `basePath: /Code-Universum` — all links must use Next.js `<Link>`
- `isSupabaseConfigured` — guard all DB calls; site must render without backend
- WebContainers require COOP/COEP headers (not available on GitHub Pages)
- No `middleware.ts` (incompatible with static export)

## File Structure
- Pages: `src/app/(auth|browse|dashboard)/`
- Components: `src/components/(ui|layout|preview|upload|cards|auth)/`
- Logic: `src/lib/(supabase|webcontainer|utils)/`
- State: `src/stores/`
- Tests: `src/__tests__/`
- DB: `supabase/migrations/`

## Commands
- `npm run dev` — local development
- `npm run build` — production static export
- `npm run test` — run Vitest tests
- `npm run quality` — typecheck + lint + tests (full pipeline)
