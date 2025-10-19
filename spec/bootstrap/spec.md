# Feature: Project Bootstrap - Public Repository Housekeeping

## Metadata
**Type**: infrastructure

## Outcome
Establish public repository foundation with standard open source documentation, GitHub configuration, and validate CSW workflow.

## User Story
As a developer
I want public repository fully configured with documentation and GitHub settings
So that the project is properly licensed, documented, and the team can use specification-driven development

## Context
**Project**: trakrf.id marketing site (Astro-based static content)
**Repository**: https://github.com/trakrf/www
**CSW Installed**: Claude Spec Workflow from https://github.com/trakrf/claude-spec-workflow
**Stack**: Astro + Tailwind + TypeScript (setup deferred to separate spec)
**Copyright**: DevOps To AI LLC dba TrakRF
**License**: MIT (not BSL like platform)
**Date**: 2025-10-19
**Scope**: Housekeeping ONLY - no Astro setup yet

## Technical Requirements

### Git & GitHub
- Git repository initialized with `main` branch
- Remote configured: `git@github.com:trakrf/www.git`
- Branch protection rules documented (manual GitHub UI setup deferred)
- `.gitignore` with patterns for Node.js, Astro, environment files

### Open Source Documentation
- `LICENSE` - MIT license with copyright "DevOps To AI LLC dba TrakRF"
- `README.md` - Project description, purpose, architecture overview
- `CONTRIBUTING.md` - Contribution guidelines (from platform)
- `CODE_OF_CONDUCT.md` - Contributor Covenant 2.1 (from platform)
- `SECURITY.md` - Vulnerability reporting policy (adapted from platform for marketing site)
- `CHANGELOG.md` - Version history (keepachangelog.com format, from platform)

### Development Environment Configuration
- `.nvmrc` - Node.js version pinning (copy from platform: "24")
- `.env.example` - Example environment variables (generated from mikestankavich.com .env.local, sanitized)
- `.envrc` - direnv integration (copy from mikestankavich.com)
- `.editorconfig` - Consistent editor settings (create sensible defaults)

### CSW Infrastructure
- `spec/` directory structure validated (already exists)
- `spec/README.md` exists and describes workflow
- `spec/template.md` exists for copying
- `spec/stack.md` placeholder (Astro commands deferred to astro-setup spec)
- `spec/SHIPPED.md` ready for tracking shipped features
- `spec/bootstrap/spec.md` this spec
- `spec/bootstrap/plan.md` this plan
- `spec/astro-setup/spec.md` next cycle spec (already created)

## Validation Criteria

### Documentation Files
- [ ] LICENSE exists (MIT with "Copyright (c) 2025 DevOps To AI LLC dba TrakRF")
- [ ] README.md exists and describes trakrf.id marketing site
- [ ] CONTRIBUTING.md exists (from platform)
- [ ] CODE_OF_CONDUCT.md exists (from platform)
- [ ] SECURITY.md exists (adapted from platform)
- [ ] CHANGELOG.md exists (keepachangelog format from platform)

### Development Environment Files
- [ ] .gitignore exists with Node.js, Astro, env patterns
- [ ] .nvmrc exists with Node version "24"
- [ ] .env.example exists (sanitized from mikestankavich.com)
- [ ] .envrc exists (direnv integration)
- [ ] .editorconfig exists (consistent editor settings)

### CSW Structure
- [ ] spec/README.md exists and describes workflow
- [ ] spec/template.md exists and is ready for copying
- [ ] spec/stack.md exists (placeholder for Astro commands)
- [ ] spec/SHIPPED.md exists (ready for tracking)
- [ ] spec/bootstrap/ contains spec.md and plan.md
- [ ] spec/astro-setup/ contains spec.md (next cycle)

### Git Configuration
- [ ] Repository initialized on main branch
- [ ] Remote origin configured (github.com/trakrf/www)
- [ ] Initial commit contains all housekeeping files
- [ ] Branch protection rules documented in README (manual UI setup deferred)

### Copyright Assertions
- [ ] LICENSE has "Copyright (c) 2025 DevOps To AI LLC dba TrakRF"
- [ ] README.md footer includes copyright notice
- [ ] SECURITY.md references TrakRF contact info
- [ ] All documentation consistently uses TrakRF branding

## Success Metrics
- [ ] Repository has complete public documentation
- [ ] MIT license properly configured
- [ ] CSW workflow validated end-to-end
- [ ] This bootstrap spec gets shipped to SHIPPED.md
- [ ] Clean foundation for astro-setup spec (next cycle)
- [ ] Professional presentation for public GitHub repository

## Constraints
- Use MIT license (NOT BSL like platform, NOT CC0 like mikestankavich.com)
- Copyright must be "DevOps To AI LLC dba TrakRF" everywhere applicable
- Branch rules documented but setup deferred to GitHub UI (not automatable via git)
- No code/build tooling in this spec - only documentation and git setup

## References
- Repository: https://github.com/trakrf/www
- Platform Repo: https://github.com/trakrf/platform (for CONTRIBUTING.md, CODE_OF_CONDUCT.md patterns)
- CSW Source: https://github.com/trakrf/claude-spec-workflow
- Next Spec: spec/astro-setup/ (Astro scaffolding)
