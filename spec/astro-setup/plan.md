# Implementation Plan: Astro Development Environment Setup

Generated: 2025-10-19
Specification: spec.md

## Understanding

This plan establishes a complete Astro + Tailwind CSS + TypeScript development environment for the trakrf.id marketing website. The goal is to prove the build toolchain works end-to-end with a Hello World page that validates DaisyUI integration, while keeping configuration minimal. Custom animations and theme extensions from trakrf-web will be deferred to the content migration phase to avoid unnecessary complexity.

**Key Decisions from Clarification**:

- Node.js 22 LTS (not 24) - no Noble dependency, more stable
- Tailwind + DaisyUI for CSS framework (matches trakrf-web for easier migration)
- Hello World page uses DaisyUI components to validate integration
- Minimal Tailwind config - custom animations/themes added during content migration
- Astro recommended ESLint preset
- Standard Astro-friendly Prettier config (tabs, single quotes, semicolons)
- Script patterns from mikestankavich.com (dev with astro check --watch)
- packageManager field in package.json (Corepack standard, Astro best practice)

## Relevant Files

**Reference Patterns** (existing code to follow):

- `/home/mike/mikestankavich.com/package.json` - Script patterns, packageManager setup, dependency versions
- `/home/mike/mikestankavich.com/astro.config.mjs` - Astro + Tailwind integration pattern
- `/home/mike/mikestankavich.com/tsconfig.json` - Strict TypeScript configuration
- `/home/mike/mikestankavich.com/tailwind.config.js` - Tailwind structure (will simplify for DaisyUI)
- `/home/mike/mikestankavich.com/.prettierrc` - Prettier formatting standards
- `/home/mike/mikestankavich.com/.prettierignore` - Ignore patterns
- `/home/mike/trakrf-web/tailwind.config.js` - DaisyUI theme config reference (lines 60-67)

**Files to Create**:

- `/home/mike/www/package.json` - Project manifest with pnpm, scripts, dependencies
- `/home/mike/www/astro.config.mjs` - Astro configuration with Tailwind integration
- `/home/mike/www/tsconfig.json` - TypeScript strict mode configuration
- `/home/mike/www/tailwind.config.mjs` - Minimal Tailwind + DaisyUI configuration
- `/home/mike/www/.prettierrc` - Code formatting rules
- `/home/mike/www/.prettierignore` - Files to exclude from formatting
- `/home/mike/www/eslint.config.js` - Astro ESLint configuration (flat config format)
- `/home/mike/www/src/env.d.ts` - Astro type definitions
- `/home/mike/www/src/pages/index.astro` - Hello World page with DaisyUI components
- `/home/mike/www/public/.gitkeep` - Ensure public directory exists in git

**Files to Modify**:

- `/home/mike/www/.nvmrc` - Update from "24" to "22"
- `/home/mike/www/spec/stack.md` - Replace placeholder commands with actual Astro validation commands

## Architecture Impact

- **Subsystems affected**: Build tooling/development environment only
- **New dependencies**:
  - Core: `astro`, `@astrojs/tailwind`, `@astrojs/check`, `typescript`, `tailwindcss`
  - DaisyUI: `daisyui`
  - Dev tools: `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`, `eslint`, `eslint-plugin-astro`
- **Breaking changes**: None (initial setup)

## Task Breakdown

### Task 1: Update Node.js Version

**File**: `/home/mike/www/.nvmrc`
**Action**: MODIFY
**Pattern**: Simple version string update

**Implementation**:

```bash
# Change from "24" to "22"
echo "22" > /home/mike/www/.nvmrc
```

**Validation**: File contains "22"

---

### Task 2: Initialize pnpm and Create package.json

**File**: `/home/mike/www/package.json`
**Action**: CREATE
**Pattern**: Reference `/home/mike/mikestankavich.com/package.json` for structure

**Implementation**:

```json
{
	"name": "trakrf-www",
	"packageManager": "pnpm@9.x.x",
	"type": "module",
	"version": "0.1.0",
	"private": true,
	"scripts": {
		"dev": "astro check --watch & astro dev",
		"start": "astro dev",
		"build": "astro check && astro build",
		"preview": "astro preview",
		"astro": "astro",
		"lint": "prettier --write \"**/*.{js,ts,astro,md,json}\" && eslint --fix \"src/**/*.{js,ts,astro}\"",
		"typecheck": "astro check"
	},
	"dependencies": {
		"@astrojs/check": "^0.9.4",
		"@astrojs/tailwind": "^5.1.2",
		"astro": "^4.16.18",
		"tailwindcss": "^3.4.17",
		"daisyui": "^4.12.14",
		"typescript": "^5.7.2"
	},
	"devDependencies": {
		"@typescript-eslint/parser": "^8.18.1",
		"eslint": "^9.17.0",
		"eslint-plugin-astro": "^1.3.2",
		"prettier": "^3.4.2",
		"prettier-plugin-astro": "^0.14.1",
		"prettier-plugin-tailwindcss": "^0.6.9"
	}
}
```

**Key Details**:

- `packageManager: "pnpm@9.x.x"` - Corepack standard for version pinning
- `dev` script runs `astro check --watch` in parallel with dev server (type checking)
- `build` script runs `astro check` before building (validation gate)
- `lint` combines Prettier formatting + ESLint fixes
- Latest stable versions as of late 2024/early 2025

**Validation**: File exists and is valid JSON

---

### Task 3: Install Dependencies

**Action**: RUN
**Pattern**: Standard pnpm install

**Implementation**:

```bash
cd /home/mike/www
pnpm install
```

**Validation**:

- `node_modules/` directory created
- `pnpm-lock.yaml` generated
- No installation errors

---

### Task 4: Create Astro Configuration

**File**: `/home/mike/www/astro.config.mjs`
**Action**: CREATE
**Pattern**: Reference `/home/mike/mikestankavich.com/astro.config.mjs` (simplified)

**Implementation**:

```javascript
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://trakrf.id',
	integrations: [
		tailwind({
			// Allow custom base styles (DaisyUI needs this)
			applyBaseStyles: true
		})
	],
	// Static site generation (no SSR needed for marketing site)
	output: 'static'
});
```

**Key Details**:

- `site: 'https://trakrf.id'` - Production URL for sitemap/canonical URLs
- `applyBaseStyles: true` - Required for DaisyUI to work properly
- `output: 'static'` - Explicit static site generation (Cloudflare Pages compatible)

**Validation**: File exists and is valid JavaScript

---

### Task 5: Create TypeScript Configuration

**File**: `/home/mike/www/tsconfig.json`
**Action**: CREATE
**Pattern**: Reference `/home/mike/mikestankavich.com/tsconfig.json` (strict mode)

**Implementation**:

```json
{
	"extends": "astro/tsconfigs/strict",
	"compilerOptions": {
		"target": "ESNext",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,
		"removeComments": true,
		"preserveConstEnums": true,
		"strict": true,
		"alwaysStrict": true,
		"strictNullChecks": true,
		"noUncheckedIndexedAccess": true,
		"noImplicitAny": true,
		"noImplicitReturns": true,
		"noImplicitThis": true,
		"allowUnreachableCode": false,
		"noFallthroughCasesInSwitch": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"isolatedModules": true,
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["src/**/*.ts", "src/**/*.astro"]
}
```

**Key Details**:

- Extends Astro's strict preset
- Very strict TypeScript rules (matching mikestankavich.com)
- Path alias `@/*` for cleaner imports
- `moduleResolution: "bundler"` - Modern Astro recommendation

**Validation**: File exists and is valid JSON

---

### Task 6: Create Tailwind Configuration with DaisyUI

**File**: `/home/mike/www/tailwind.config.mjs`
**Action**: CREATE
**Pattern**: Minimal config with DaisyUI plugin (reference trakrf-web themes)

**Implementation**:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		// Light & dark themes (matching trakrf-web setup)
		themes: ['light', 'dark']
	}
};
```

**Key Details**:

- Minimal theme extensions (custom animations deferred to content migration)
- DaisyUI plugin with light/dark themes (matches trakrf-web)
- Standard Astro content paths

**Validation**: File exists and is valid JavaScript

---

### Task 7: Create Prettier Configuration

**File**: `/home/mike/www/.prettierrc`
**Action**: CREATE
**Pattern**: Reference `/home/mike/mikestankavich.com/.prettierrc`

**Implementation**:

```json
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"semi": true,
	"printWidth": 100,
	"plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

**Key Details**:

- Tabs (matches .editorconfig)
- Single quotes (Astro community standard)
- prettier-plugin-tailwindcss auto-sorts Tailwind classes
- prettier-plugin-astro handles .astro file formatting

**Validation**: File exists and is valid JSON

---

### Task 8: Create Prettier Ignore File

**File**: `/home/mike/www/.prettierignore`
**Action**: CREATE
**Pattern**: Reference `/home/mike/mikestankavich.com/.prettierignore`

**Implementation**:

```
node_modules/
dist/
.astro/
pnpm-lock.yaml
```

**Validation**: File exists

---

### Task 9: Create ESLint Configuration

**File**: `/home/mike/www/eslint.config.js`
**Action**: CREATE
**Pattern**: Astro recommended ESLint setup (flat config format)

**Implementation**:

```javascript
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	// Recommended Astro config
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			// Customize rules if needed
			'astro/no-set-html-directive': 'error'
		}
	}
];
```

**Key Details**:

- Uses ESLint 9.x flat config format (modern standard)
- Astro's recommended preset
- Can be extended during content migration if needed

**Validation**: File exists and is valid JavaScript

---

### Task 10: Create Astro Type Definitions

**File**: `/home/mike/www/src/env.d.ts`
**Action**: CREATE
**Pattern**: Standard Astro type definitions

**Implementation**:

```typescript
/// <reference types="astro/client" />
```

**Validation**: File exists in src/ directory

---

### Task 11: Create Hello World Page with DaisyUI

**File**: `/home/mike/www/src/pages/index.astro`
**Action**: CREATE
**Pattern**: Simple Astro page with DaisyUI components to validate integration

**Implementation**:

```astro
---
// Component script (runs at build time)
const pageTitle = 'TrakRF - Hello World';
---

<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{pageTitle}</title>
	</head>
	<body>
		<div class="hero min-h-screen bg-base-200">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="text-5xl font-bold">Hello World!</h1>
					<p class="py-6">
						TrakRF marketing website is ready for development. This page uses DaisyUI components to
						validate Tailwind + DaisyUI integration.
					</p>
					<button class="btn btn-primary">Get Started</button>
				</div>
			</div>
		</div>
	</body>
</html>
```

**Key Details**:

- Uses DaisyUI components: `hero`, `btn`, `btn-primary`
- Uses DaisyUI theme colors: `bg-base-200`
- Validates Tailwind utility classes work
- Simple, semantic HTML structure

**Validation**:

- Page renders at http://localhost:4321
- DaisyUI styles applied correctly
- Button shows primary theme color

---

### Task 12: Create Public Directory Placeholder

**File**: `/home/mike/www/public/.gitkeep`
**Action**: CREATE
**Pattern**: Ensure public directory tracked in git

**Implementation**:

```bash
mkdir -p /home/mike/www/public
touch /home/mike/www/public/.gitkeep
```

**Validation**: Directory exists and is tracked by git

---

### Task 13: Update spec/stack.md with Validation Commands

**File**: `/home/mike/www/spec/stack.md`
**Action**: MODIFY
**Pattern**: Replace placeholder commands with actual Astro commands

**Implementation**:
Replace entire file content with:

````markdown
# Stack: Astro + Tailwind + TypeScript

> **Package Manager**: pnpm
> **Framework**: Astro 4.x
> **Styling**: Tailwind CSS + DaisyUI
> **Language**: TypeScript (strict mode)

## Validation Commands

These commands are used by `/check` and `/ship` to validate code quality.

## Lint

```bash
pnpm lint
```
````

Runs Prettier formatting and ESLint fixes. Must pass with no errors.

## Typecheck

```bash
pnpm typecheck
```

Runs Astro's TypeScript checker. Must pass with no type errors.

## Test

```bash
# No tests configured yet - will be added in future spec
echo "✅ No tests to run (marketing site)"
exit 0
```

Tests will be added when interactive features are implemented.

## Build

```bash
pnpm build
```

Builds the static site. Must complete successfully with no errors.

---

**Development Commands**:

- `pnpm dev` - Start dev server with type checking
- `pnpm preview` - Preview production build locally

````

**Validation**:
- Commands execute successfully
- All validation gates pass

---

### Task 14: Final Validation - Run All Gates
**Action**: VALIDATE
**Pattern**: Execute all validation commands from spec/stack.md

**Implementation**:
```bash
cd /home/mike/www

# Gate 1: Lint
pnpm lint

# Gate 2: Typecheck
pnpm typecheck

# Gate 3: Test (placeholder passes)
echo "✅ No tests to run (marketing site)"

# Gate 4: Build
pnpm build

# Gate 5: Dev server smoke test
timeout 10s pnpm dev || true  # Start and auto-stop after 10s
````

**Validation Criteria**:

- ✅ Lint passes with no errors
- ✅ Typecheck passes with no type errors
- ✅ Build completes successfully
- ✅ Dev server starts without errors
- ✅ Hello World page accessible at http://localhost:4321
- ✅ DaisyUI styles render correctly

**If any validation fails**:

1. Check error output
2. Fix the issue
3. Re-run validation
4. Repeat until all gates pass

---

## Risk Assessment

- **Risk**: DaisyUI styles not loading properly
  **Mitigation**: `applyBaseStyles: true` in astro.config.mjs ensures DaisyUI base styles are included

- **Risk**: TypeScript strict mode catches unexpected issues
  **Mitigation**: Start with simple Hello World page to validate setup before adding complexity

- **Risk**: pnpm version mismatch
  **Mitigation**: `packageManager` field in package.json enforces pnpm 9.x via Corepack

- **Risk**: ESLint flat config format unfamiliarity
  **Mitigation**: Using Astro's recommended preset minimizes custom configuration

- **Risk**: Missing dependencies for prettier plugins
  **Mitigation**: All plugins explicitly listed in devDependencies

## Integration Points

- **Tailwind + Astro**: Integrated via `@astrojs/tailwind` (official integration)
- **DaisyUI + Tailwind**: Plugin-based integration (standard approach)
- **TypeScript + Astro**: `astro check` command validates types
- **Prettier + ESLint**: `lint` script runs both in sequence
- **Next spec (content migration)**: Will build on this foundation, using established Tailwind + DaisyUI setup

## VALIDATION GATES (MANDATORY)

**CRITICAL**: These are not suggestions - they are GATES that block progress.

After EVERY code change, use commands from `spec/stack.md`:

- **Gate 1**: Syntax & Style → `pnpm lint`
- **Gate 2**: Type Safety → `pnpm typecheck`
- **Gate 3**: Unit Tests → `echo "✅ No tests to run"`
- **Gate 4**: Build Success → `pnpm build`

**Enforcement Rules**:

- If ANY gate fails → Fix immediately
- Re-run validation after fix
- Loop until ALL gates pass
- After 3 failed attempts → Stop and ask for help

**Do not proceed to next task until current task passes all gates.**

## Validation Sequence

**After each task (1-13)**:

```bash
# Quick validation
pnpm lint
pnpm typecheck
```

**Final validation (Task 14)**:

```bash
# Full suite
pnpm lint
pnpm typecheck
pnpm build
pnpm dev  # Manual check: visit http://localhost:4321
```

## Plan Quality Assessment

**Complexity Score**: 8/10 (HIGH - but manageable due to configuration-only nature)

**File Count**: 9 files to create, 2 files to modify (11 file operations total)
**Subsystems**: 1 (Build tooling/scaffolding)
**Task Estimate**: 14 subtasks
**Dependencies**: 11 new packages (Astro, Tailwind, DaisyUI, TypeScript, linting/formatting)

**Confidence Score**: 9/10 (HIGH)

**Confidence Factors**:
✅ Clear requirements from spec
✅ Reference implementation exists at `/home/mike/mikestankavich.com/`
✅ All clarifying questions answered
✅ DaisyUI integration is well-documented and straightforward
✅ Astro's official Tailwind integration is mature and stable
✅ No complex application logic - just configuration files
✅ Validation is straightforward (does it build? does page render?)
✅ Similar pattern successfully used in mikestankavich.com
⚠️ TypeScript strict mode may catch edge cases, but scope is minimal

**Assessment**: Very high confidence. This is primarily configuration file creation with clear reference implementations. The tasks are independent and can be validated incrementally. Main complexity comes from number of files, not technical difficulty.

**Estimated one-pass success probability**: 95%

**Reasoning**: Configuration setup with proven patterns and clear validation criteria. The 5% risk accounts for potential version incompatibilities or DaisyUI integration quirks, but Astro's official Tailwind integration is mature and DaisyUI is a popular, well-supported plugin. Reference implementation (mikestankavich.com) provides concrete patterns to follow, reducing guesswork.
