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
