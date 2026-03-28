<div align="center">

# Code Universum

**Open-Source UI Component & Website Sharing Platform**

Upload, discover and preview UI components with live rendering.
Share buttons, cards, loaders, forms, landing pages and full website projects — free and open source.

[Live Demo](https://beko2210.github.io/Code-Universum/) · [Report Bug](https://github.com/BEKO2210/Code-Universum/issues) · [Request Feature](https://github.com/BEKO2210/Code-Universum/issues)

</div>

---

## What is Code Universum?

Code Universum is a community-driven platform where developers and designers share reusable UI components. Think of it as an open library of buttons, cards, loaders, toggles, forms, navigation bars, landing pages — anything you can build with HTML, CSS, JavaScript, Tailwind or React.

Every component uploaded to Code Universum is **open source** and available for anyone to copy, use and modify.

### Key Features

- **Upload Components** — Paste your HTML, CSS, JS or Tailwind code and see a live preview instantly
- **Upload Full Sites** — Upload a ZIP of your website project (Vite, React, static HTML)
- **Live Preview** — Every component renders live in an isolated iframe
- **One-Click Copy** — Copy any component code to your clipboard
- **Tag & Filter** — Browse by category (Button, Card, Loader, Input, Toggle, ...) or framework (React, Vue, Tailwind, Vanilla)
- **Like & Discover** — Like your favorite components, see what's trending
- **GitHub Login** — Sign in with your GitHub account to upload and manage your components
- **Mobile-First** — Fully responsive on all devices, from 375px phones to 4K displays

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion |
| Backend | Supabase (PostgreSQL, Auth, Storage) |
| State | Zustand |
| Testing | Vitest, Testing Library |
| Hosting | GitHub Pages (static export) |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A [Supabase](https://supabase.com) account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/BEKO2210/Code-Universum.git
cd Code-Universum

# Install dependencies
npm install

# Copy the environment file
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

For the full setup guide (Supabase, GitHub OAuth, database schema, storage, secrets), see **[SETUP.md](SETUP.md)**.

### Available Commands

```bash
npm run dev        # Start development server
npm run build      # Production build (static export)
npm run test       # Run tests (Vitest)
npm run typecheck  # TypeScript type checking
npm run quality    # Full pipeline: typecheck + lint + tests
```

## How It Works

1. **Browse** — Visit the Components or Sites page to explore what others have shared
2. **Sign In** — Click "Sign In" and authenticate with your GitHub account
3. **Upload** — Go to Upload, paste your code (HTML + CSS + JS or Tailwind), see the live preview, add tags, and publish
4. **Copy** — Hover over any component card and click "Copy Code" to grab it
5. **Like** — Click the heart icon to save your favorites

All uploaded code is visible to everyone and licensed under the MIT License.

## Open Source Policy

**All code uploaded to Code Universum must be open source.**

By uploading a component or website to this platform, you agree that:

- Your code is shared under the **MIT License**
- Anyone can view, copy, modify and redistribute your code
- You have the right to share the code (it is your own work or properly licensed)
- You do not upload proprietary, copyrighted or confidential code

This is a fundamental principle of Code Universum. The platform exists to make UI code freely available to everyone.

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── (auth)/             # Login, OAuth callback
│   ├── (browse)/           # Components, Sites browsing
│   ├── (dashboard)/        # Upload forms
│   ├── terms/              # Terms of Use
│   ├── privacy/            # Privacy Policy (DSGVO)
│   └── impressum/          # Legal Notice (TMG)
├── components/             # Reusable UI components
│   ├── ui/                 # Design system (GlassCard, NeonButton, ...)
│   ├── layout/             # Header, Footer
│   ├── preview/            # Live preview, toolbar
│   └── auth/               # Auth provider
├── lib/                    # Business logic
│   ├── supabase/           # Database client
│   ├── webcontainer/       # WebContainer integration
│   └── utils/              # Security scanner, clipboard
├── stores/                 # Zustand state management
├── hooks/                  # React hooks
├── types/                  # TypeScript types
└── __tests__/              # Test suite
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

## Code of Conduct

This project follows the Contributor Covenant Code of Conduct. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Legal

- **[Terms of Use](https://beko2210.github.io/Code-Universum/terms)** — Usage rules and open-source upload policy
- **[Privacy Policy](https://beko2210.github.io/Code-Universum/privacy)** — DSGVO/GDPR-compliant, essential cookies only
- **[Impressum](https://beko2210.github.io/Code-Universum/impressum)** — Legal notice per German TMG

### Operator

Belkis Aslani
Vogelsangstr. 32, 71691 Freiberg am Neckar, Germany
belkis.aslani@gmail.com

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 Belkis Aslani
