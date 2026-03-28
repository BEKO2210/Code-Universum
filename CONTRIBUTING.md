# Contributing to Code Universum

Thank you for your interest in contributing! Code Universum is an open-source project and we welcome contributions from everyone.

## Open Source Requirement

**All code contributed to or uploaded on Code Universum must be open source under the MIT License.**

By contributing, you confirm that:

- You are the author of the code, or have permission to contribute it
- Your contribution is licensed under the MIT License
- Your code does not contain proprietary, copyrighted or confidential material
- Your code does not contain malware, exploits or intentionally harmful logic

## How to Contribute

### Reporting Bugs

1. Check [existing issues](https://github.com/BEKO2210/Code-Universum/issues) first
2. Create a new issue with a clear title and description
3. Include steps to reproduce, expected behavior, and screenshots if applicable

### Suggesting Features

1. Open an issue with the label `enhancement`
2. Describe the feature, why it is useful, and how it should work

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run the quality pipeline:
   ```bash
   npm run quality
   ```
   This runs TypeScript type checking, ESLint and all tests. All must pass.
5. Commit with a clear message:
   ```bash
   git commit -m "feat: add search functionality to browse page"
   ```
6. Push and open a Pull Request

### Commit Message Format

We use conventional commit messages:

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, no logic change)
- `refactor:` — Code refactoring
- `test:` — Adding or modifying tests
- `chore:` — Build, CI, tooling changes

### Code Standards

- **TypeScript** — Strict mode, no `any` unless unavoidable
- **Tests** — Write tests for new logic (Vitest + Testing Library)
- **TDD** — Preferred: write the test first, then the implementation
- **Accessibility** — All interactive elements must be keyboard-navigable with visible focus states
- **Mobile** — All UI must work on 375px screens with 44px minimum touch targets

### Development Setup

```bash
git clone https://github.com/BEKO2210/Code-Universum.git
cd Code-Universum
npm install
npm run dev
```

See [SETUP.md](SETUP.md) for Supabase backend configuration.

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
