# Implementation Plan: Project Bootstrap - Public Repository Housekeeping

Generated: 2025-10-19
Specification: spec.md

## Understanding

This bootstrap establishes the public repository foundation for trakrf.id marketing site with complete open source documentation, development environment configuration, and CSW workflow validation. Scope includes:
- MIT license with TrakRF copyright (NOT BSL, NOT CC0)
- Complete public documentation (README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, CHANGELOG)
- Development environment files (.nvmrc, .env.example, .envrc, .editorconfig, .gitignore)
- CSW infrastructure validation
- No Astro setup (deferred to spec/astro-setup/)
- No deployment configuration (deferred to later spec)

This proves the CSW workflow and creates a professional public repository ready for the Astro setup cycle.

## Relevant Files

**Reference Patterns** (existing code to copy/adapt):
- `/home/mike/platform/LICENSE` - BSL license (DO NOT COPY - use MIT instead)
- `/home/mike/platform/README.md` - README structure and content patterns
- `/home/mike/platform/CONTRIBUTING.md` - Copy directly, minimal adaptation
- `/home/mike/platform/CODE_OF_CONDUCT.md` - Copy directly
- `/home/mike/platform/SECURITY.md` - Adapt for marketing site (remove platform-specific sections)
- `/home/mike/platform/CHANGELOG.md` - Copy and adapt (keepachangelog format)
- `/home/mike/mikestankavich.com/.env.local` - Sanitize to create .env.example
- `/home/mike/mikestankavich.com/.envrc` - Copy directly
- `/home/mike/trakrf-infra/.env` - Reference for Cloudflare account ID

**Files to Create**:
- `/home/mike/www/LICENSE` - MIT license with TrakRF copyright
- `/home/mike/www/README.md` - Project overview and documentation
- `/home/mike/www/.gitignore` - Node.js, Astro, env patterns
- `/home/mike/www/.nvmrc` - Node.js 22 LTS
- `/home/mike/www/.env.example` - Sanitized environment variables
- `/home/mike/www/.editorconfig` - Consistent editor settings

**Files to Copy**:
- `/home/mike/www/CONTRIBUTING.md` ← platform/CONTRIBUTING.md
- `/home/mike/www/CODE_OF_CONDUCT.md` ← platform/CODE_OF_CONDUCT.md
- `/home/mike/www/.envrc` ← mikestankavich.com/.envrc

**Files to Adapt**:
- `/home/mike/www/SECURITY.md` ← platform/SECURITY.md (remove platform-specific sections)
- `/home/mike/www/CHANGELOG.md` ← platform/CHANGELOG.md (update for www repo)

**Files to Modify**:
- `/home/mike/www/spec/stack.md` - Update placeholder for Astro (minimal change)

**Files Already Exist** (validate only):
- `/home/mike/www/spec/README.md`
- `/home/mike/www/spec/template.md`
- `/home/mike/www/spec/SHIPPED.md`
- `/home/mike/www/spec/bootstrap/spec.md`
- `/home/mike/www/spec/astro-setup/spec.md`

## Architecture Impact

- **Subsystems affected**: Repository infrastructure, CSW workflow
- **New dependencies**: None (documentation only)
- **Breaking changes**: None (initial commit)

## Task Breakdown

### Task 1: Create MIT LICENSE
**File**: `/home/mike/www/LICENSE`
**Action**: CREATE
**Pattern**: Standard MIT license with TrakRF copyright

**Implementation**:
```
MIT License

Copyright (c) 2025 DevOps To AI LLC dba TrakRF

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Validation**: File exists and contains correct copyright

### Task 2: Create README.md
**File**: `/home/mike/www/README.md`
**Action**: CREATE
**Pattern**: Reference platform/README.md structure

**Implementation**:
```markdown
# trakrf.id - Marketing Website

> Official marketing website for TrakRF RFID/BLE asset tracking platform

## Overview

Static marketing site built with Astro + Tailwind + TypeScript. Presents TrakRF's capabilities, features, and provides call-to-action links to the main application.

## Architecture

**Stack**:
- Framework: Astro
- Styling: Tailwind CSS
- Language: TypeScript
- Package Manager: pnpm
- Deployment: Cloudflare Pages

**Purpose**:
This repository contains ONLY the marketing content (copy, images, layout). The interactive application is a separate React + Go project.

## Development

### Prerequisites
- Node.js 24+ (see .nvmrc)
- pnpm 8.x
- direnv (optional but recommended)

### Quick Start
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Project Structure
```
www/
├── spec/              # Claude Spec Workflow specifications
├── src/               # Astro source files (coming soon)
├── public/            # Static assets (coming soon)
└── [config files]     # Astro, TypeScript, Tailwind configs
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Copyright (c) 2025 DevOps To AI LLC dba TrakRF**
```

**Validation**: File exists and describes project

### Task 3: Copy CONTRIBUTING.md
**File**: `/home/mike/www/CONTRIBUTING.md`
**Action**: COPY
**Pattern**: Copy from platform/CONTRIBUTING.md

**Implementation**:
```bash
cp /home/mike/platform/CONTRIBUTING.md /home/mike/www/CONTRIBUTING.md
```

**Validation**: File exists and is readable

### Task 4: Copy CODE_OF_CONDUCT.md
**File**: `/home/mike/www/CODE_OF_CONDUCT.md`
**Action**: COPY
**Pattern**: Copy from platform/CODE_OF_CONDUCT.md

**Implementation**:
```bash
cp /home/mike/platform/CODE_OF_CONDUCT.md /home/mike/www/CODE_OF_CONDUCT.md
```

**Validation**: File exists and is readable

### Task 5: Adapt SECURITY.md
**File**: `/home/mike/www/SECURITY.md`
**Action**: ADAPT
**Pattern**: Copy from platform/SECURITY.md and remove platform-specific sections

**Implementation**:
```markdown
# Security Policy

## Supported Versions

We release patches for security vulnerabilities.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**DO NOT** open public issues for security vulnerabilities.

To report a security vulnerability, please use ONE of the following:

1. **Email**: admin@trakrf.id
2. **Contact Form**: https://trakrf.id/contact (select "Security Issue")
3. **GitHub Security Advisories**: [Report a vulnerability](https://github.com/trakrf/www/security/advisories/new) (preferred)

### What to Include

Please provide:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Resolution Timeline**: Depends on severity
    - Critical: 7-14 days
    - High: 30 days
    - Medium/Low: 90 days

### Disclosure Policy

We follow coordinated disclosure:
1. Reporter submits vulnerability
2. We validate and develop fix
3. We release patched version
4. We publicly disclose after users have time to update (typically 30 days)

## Recognition

We maintain a [Security Hall of Fame](https://trakrf.id/security/thanks) for responsible disclosure.
```

**Validation**: File exists and references www repo

### Task 6: Adapt CHANGELOG.md
**File**: `/home/mike/www/CHANGELOG.md`
**Action**: ADAPT
**Pattern**: Copy from platform/CHANGELOG.md and adapt for www repo

**Implementation**:
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project documentation structure
- MIT License
- Code of Conduct (Contributor Covenant 2.1)
- Security policy with vulnerability reporting procedures
- Contributing guidelines
- Claude Spec Workflow (CSW) integration
- Development environment configuration (.nvmrc, .editorconfig, .envrc)

## [0.1.0] - 2025-10-19

### Added
- Project bootstrap with public repository housekeeping
- Standard open source documentation
- CSW infrastructure for specification-driven development
```

**Validation**: File exists and follows keepachangelog format

### Task 7: Create .gitignore
**File**: `/home/mike/www/.gitignore`
**Action**: CREATE

**Implementation**:
```
# Dependencies
node_modules/

# Build outputs
dist/
.astro/

# Environment
.env
.env.local
.env.production

# Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*

# Misc
.cache/
```

**Validation**: File exists

### Task 8: Create .nvmrc
**File**: `/home/mike/www/.nvmrc`
**Action**: CREATE
**Pattern**: Use Node.js 22 LTS (no Noble dependency, more flexible)

**Implementation**:
```bash
echo "22" > /home/mike/www/.nvmrc
```

**Validation**: File contains "22"

### Task 9: Create .env.example
**File**: `/home/mike/www/.env.example`
**Action**: CREATE
**Pattern**: Reference trakrf-infra/.env and mikestankavich.com/.env.local

**Implementation**:
```
# Cloudflare Configuration
# Account ID from trakrf-infra (trakrf.id domain)
CLOUDFLARE_ACCOUNT_ID=44e11a8ed610444ba0026bf7f710355d
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_API_URL=https://api.cloudflare.com/client/v4

# R2 Storage (if needed for assets)
# Note: trakrf-infra uses R2 for terraform state
R2_DOWNLOADS_CLOUDFLARE_TOKEN=your_r2_token_here
R2_DOWNLOADS_ACCESS_KEY=your_r2_access_key_here
R2_DOWNLOADS_SECRET_KEY=your_r2_secret_key_here
```

**Validation**: File exists with correct account ID and placeholder tokens

### Task 10: Copy .envrc
**File**: `/home/mike/www/.envrc`
**Action**: COPY
**Pattern**: Copy from mikestankavich.com/.envrc

**Implementation**:
```bash
cp /home/mike/mikestankavich.com/.envrc /home/mike/www/.envrc
```

**Validation**: File exists

### Task 11: Create .editorconfig
**File**: `/home/mike/www/.editorconfig`
**Action**: CREATE

**Implementation**:
```
# EditorConfig: https://editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,jsx,ts,tsx,astro,json,md}]
indent_style = tab
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.yml, *.yaml]
indent_style = space
indent_size = 2
```

**Validation**: File exists

### Task 12: Update spec/stack.md placeholder
**File**: `/home/mike/www/spec/stack.md`
**Action**: MODIFY
**Pattern**: Replace with Astro placeholder

**Implementation**:
Replace entire content with:
```markdown
# Stack: Astro + Tailwind + TypeScript

> **Package Manager**: pnpm
> **Framework**: Astro (setup pending - see spec/astro-setup/)
> **Styling**: Tailwind CSS
> **Language**: TypeScript

## Validation Commands

*Note: These commands will be functional after completing spec/astro-setup/*

## Lint
```bash
# Coming soon - requires Astro setup
echo "Lint commands will be added in astro-setup spec"
```

## Typecheck
```bash
# Coming soon - requires Astro setup
echo "Typecheck commands will be added in astro-setup spec"
```

## Test
```bash
# Coming soon - requires Astro setup
echo "Test commands will be added in astro-setup spec"
```

## Build
```bash
# Coming soon - requires Astro setup
echo "Build commands will be added in astro-setup spec"
```
```

**Validation**: File is updated and describes current state

### Task 13: Validate CSW structure
**Action**: VALIDATE
**Pattern**: Verify all CSW files exist

**Implementation**:
```bash
# Check that all required CSW files exist
test -f /home/mike/www/spec/README.md && \
test -f /home/mike/www/spec/template.md && \
test -f /home/mike/www/spec/stack.md && \
test -f /home/mike/www/spec/SHIPPED.md && \
test -f /home/mike/www/spec/bootstrap/spec.md && \
test -f /home/mike/www/spec/bootstrap/plan.md && \
test -f /home/mike/www/spec/astro-setup/spec.md && \
echo "✅ CSW structure validated"
```

**Validation**: All CSW files exist

### Task 14: Final validation
**Action**: VALIDATE ALL
**Pattern**: Verify all files created

**Implementation**:
```bash
# Check all documentation files
ls -la /home/mike/www/LICENSE
ls -la /home/mike/www/README.md
ls -la /home/mike/www/CONTRIBUTING.md
ls -la /home/mike/www/CODE_OF_CONDUCT.md
ls -la /home/mike/www/SECURITY.md
ls -la /home/mike/www/CHANGELOG.md

# Check all dev environment files
ls -la /home/mike/www/.gitignore
ls -la /home/mike/www/.nvmrc
ls -la /home/mike/www/.env.example
ls -la /home/mike/www/.envrc
ls -la /home/mike/www/.editorconfig

# Verify git configuration
git branch --show-current  # Should be "main"
git remote -v              # Should show github.com/trakrf/www

echo "✅ All bootstrap files validated"
```

**Validation**: All files exist, git configured correctly

## Risk Assessment

- **Risk**: Copying wrong license from platform (BSL instead of MIT)
  **Mitigation**: Explicitly create MIT license in Task 1, do NOT copy from platform

- **Risk**: Sensitive data in .env.example
  **Mitigation**: Manually create with placeholder values, do NOT copy .env.local directly

- **Risk**: Platform-specific content in adapted files
  **Mitigation**: Review SECURITY.md and CHANGELOG.md for platform references

- **Risk**: Missing copyright notices
  **Mitigation**: Explicit validation in Task 14 for TrakRF copyright assertions

## Integration Points

- **Git Repository**: github.com/trakrf/www (remote already configured)
- **CSW Workflow**: Will commit via scripts/plan.sh after plan generation
- **Next Spec**: spec/astro-setup/ depends on this bootstrap completing successfully
- **Branch Strategy**: main branch (no feature branch for bootstrap per CSW convention)

## VALIDATION GATES (MANDATORY)

**CRITICAL**: Since this is documentation-only (no code), validation gates are file existence checks.

After EVERY file creation task:
- Verify file exists: `test -f <filepath>`
- Verify file is not empty: `test -s <filepath>`
- Verify file has correct permissions: `ls -l <filepath>`

**Do not proceed to next task until current task files are created and validated.**

## Validation Sequence

After each task:
```bash
ls -la <created-file>
cat <created-file> | head -20  # Spot check content
```

Final validation (Task 14):
```bash
# List all files created
ls -la /home/mike/www/
ls -la /home/mike/www/spec/

# Verify git configuration
git status
git branch --show-current

echo "✅ Bootstrap complete - ready for CSW commit workflow"
```

## Plan Quality Assessment

**Complexity Score**: 5/10 (MEDIUM-LOW)

**File Count**: 11 files to create, 4 files to copy, 1 to modify (16 file operations total)
**Subsystems**: 1 (Repository infrastructure)
**Task Estimate**: 14 subtasks
**Dependencies**: 0 new packages (documentation only)

**Confidence Score**: 9/10 (HIGH)

**Confidence Factors**:
✅ Clear requirements from updated spec
✅ Reference implementations exist in platform and mikestankavich.com
✅ No code compilation or build steps (documentation only)
✅ Simple file copy/adapt operations
✅ User is CSW author - familiar with workflow expectations
✅ All patterns are proven and working
✅ No external dependencies

**Assessment**: Very high confidence due to simple file operations and clear reference materials. Main complexity is ensuring copyright and licensing are correct (MIT not BSL).

**Estimated one-pass success probability**: 90%

**Reasoning**: Bootstrap is straightforward file creation and copying. The 10% risk accounts for potential typos in LICENSE text, missing copyright notices, or accidentally copying platform-specific content. All risks are easily mitigated with careful validation after each task.
