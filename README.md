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

- Node.js 22+ (see .nvmrc)
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

## Preview Branch

The `preview` branch is automatically synced via GitHub Actions and deployed to Cloudflare Pages at `https://preview.trakrf.id`. When deployed, it displays a Pythonesque visual indicator to remind you that you're viewing the preview environment.

### Cloudflare Pages Configuration

To enable the preview banner on the preview branch deployment, set the following environment variable in the Cloudflare Pages dashboard:

- **Branch**: `preview`
- **Variable**: `PUBLIC_BRANCH`
- **Value**: `preview`

The banner will automatically appear when the site is built with this environment variable set.

### Local Testing

To test the preview banner locally:

1. Add `PUBLIC_BRANCH=preview` to your `.env.local` file
2. Run `pnpm build`
3. Run `pnpm preview`

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

## Branch Protection Rules

The following branch protection rules should be configured in GitHub UI for the `main` branch:

- **Require pull request reviews before merging**: 1 approval required
- **Require status checks to pass before merging**:
  - Build check
  - Lint check
  - Type check (when Astro setup is complete)
- **Require conversation resolution before merging**: Enabled
- **Do not allow bypassing the above settings**: Enabled
- **Restrict who can push to matching branches**: Maintainers only

> **Note**: These rules must be configured manually in GitHub Settings → Branches. They cannot be set via git commands.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Copyright (c) 2025 DevOps To AI LLC dba TrakRF**
