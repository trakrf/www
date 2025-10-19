# Feature: Astro Development Environment Setup

## Metadata
**Type**: infrastructure
**Depends On**: bootstrap (completed)

## Outcome
Complete Astro + Tailwind + TypeScript development environment with full validation tooling and Hello World page.

## User Story
As a developer
I want a fully configured Astro development environment
So that I can build the trakrf.id marketing site with proper tooling and validation

## Context
**Project**: trakrf.id marketing site
**Target Stack**: Astro + Tailwind + TypeScript
**Package Manager**: pnpm (preferred over npm)
**Reference Implementation**: mikestankavich.com (Astro + Tailwind + TypeScript)
**Scope**: Development scaffolding ONLY - content extraction deferred to separate spec
**Deployment**: Cloudflare Pages (setup deferred to separate spec)

## Technical Requirements

### Package Setup
- `package.json` with pnpm configuration
- Minimal dependencies: Astro core, Tailwind, TypeScript
- Dev dependencies: ESLint, Prettier, Astro/Tailwind plugins
- Scripts: dev, build, preview, lint

### Configuration Files
- `astro.config.mjs` - Minimal Astro config with Tailwind integration
- `tsconfig.json` - Strict TypeScript configuration
- `tailwind.config.mjs` - Basic Tailwind setup
- `.prettierrc` - Code formatting rules (tabs, single quotes)
- `.prettierignore` - Ignore node_modules, dist, .astro

### Source Structure
- `src/pages/index.astro` - Hello World placeholder page
- `src/env.d.ts` - Astro type definitions
- Minimal styling to validate Tailwind works

### Validation Commands
- Update `spec/stack.md` with Astro-specific commands:
  - Lint: `pnpm lint`
  - Typecheck: `pnpm tsc --noEmit`
  - Test: Placeholder (no tests yet)
  - Build: `pnpm build`

## Validation Criteria
- [ ] `pnpm install` completes successfully
- [ ] `pnpm dev` starts dev server
- [ ] `pnpm build` produces static output
- [ ] `pnpm lint` passes (no errors)
- [ ] `pnpm tsc --noEmit` passes (type checking)
- [ ] Hello World page renders with Tailwind styles
- [ ] All spec/stack.md commands execute successfully

## Success Metrics
- [ ] Full CSW validation suite passes (lint, typecheck, build)
- [ ] Hello World page viewable at http://localhost:4321
- [ ] Clean foundation for content extraction (next spec)
- [ ] TypeScript strict mode enabled and passing
- [ ] Code formatting standards enforced via Prettier

## Constraints
- Use pnpm, not npm
- Follow mikestankavich.com patterns for configuration
- Minimal packages only - no unnecessary dependencies
- No deployment configuration (deferred)
- No content extraction (deferred)
- No auth/interactive features (out of scope for marketing site)

## References
- Reference Implementation: `/home/mike/mikestankavich.com/`
  - `package.json` - Package structure and scripts
  - `astro.config.mjs` - Astro configuration pattern
  - `tsconfig.json` - TypeScript strict mode config
  - `.prettierrc` - Formatting standards
  - `tailwind.config.mjs` - Tailwind setup
- Astro Docs: https://docs.astro.build
- Previous Spec: spec/bootstrap/ (housekeeping)
- Next Spec: Content extraction from trakrf-web

## Notes
This spec focuses on proving the build toolchain works end-to-end. Content, deployment, and advanced features are explicitly deferred to maintain manageable scope.
