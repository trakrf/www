# TRA-336 Wholesale Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the trakrf.id marketing site from a ShipFast-derived consumer funnel into a single-page Astro wholesale/platform site targeting channel partners and technical evaluators, per spec `docs/superpowers/specs/2026-04-17-trakrf-wholesale-rewrite-design.md`.

**Architecture:** Delete five obsolete ShipFast components, rewrite Hero/Header/Footer in place, add six new section components (HowItWorks, FreeBleScanning, Hardware, ChannelPartners, BecomePartner, TechnicalDetails), and recompose `src/pages/index.astro`. Real product imagery is scraped from rfidready.net (our own channel partner's site) into `public/images/product/`. No stock photos, no AI imagery, no pricing, no checkout.

**Tech Stack:** Astro 4.x, Tailwind CSS + DaisyUI, TypeScript (strict), Alpine.js (CDN, already in BaseLayout), pnpm.

**Validation per-task:** No automated tests exist in this repo. Per-task validation is `pnpm typecheck`, visual smoke in `pnpm dev`, and `pnpm lint`. Full `pnpm build` runs at the end.

**Branch:** `miks2u/tra-336-rewrite-trakrfid-as-wholesale-platformtechnology-site` (already created; the design spec lives in its initial commit).

---

## Phase 1: Prep — product imagery

### Task 1: Scrape product images from rfidready.net

**Files:**
- Create: `public/images/product/` (directory)
- Create: `public/images/product/scanner-trakrf-hero.webp`
- Create: `public/images/product/cs108-handheld.webp`
- Create: `public/images/product/tag-sample-pack.webp`
- Create: `public/images/product/app-scan-screen.webp`
- Create: `public/images/product/rfidready-logo.webp` (or .svg/.png if that's what rfidready.net serves)
- Optional: `public/images/product/app-home-screen.png`, `public/images/product/app-locate-screen.png`

- [ ] **Step 1: Create target directory**

Run: `mkdir -p public/images/product`

- [ ] **Step 2: Enumerate candidate image URLs on rfidready.net**

Use WebFetch against `https://rfidready.net/` and any linked product/solution pages to harvest image URLs. Look specifically for:
- Composite image showing a handheld scanner next to the TrakRF app (hero candidate)
- CS108 handheld with mount (product photo)
- Tag sample pack (loose tags fanned out)
- TrakRF app screenshots (home / scan / locate / search views)
- rfidReady wordmark or logo

Record the full URL and content-type for each candidate before downloading.

- [ ] **Step 3: Download each candidate to `public/images/product/` with the target filename**

For every mapped asset, run the equivalent of:

```bash
curl -L --fail -o public/images/product/scanner-trakrf-hero.webp \
  'https://rfidready.net/<path>/<source-filename>.jpg'
```

Keep the Content-Type honest — use `.png` for PNGs, `.jpg` for JPEGs, `.svg` for SVGs. Do not re-encode.

- [ ] **Step 4: Sanity-check sizes and dimensions**

```bash
ls -lah public/images/product/
file public/images/product/*
```

Expected: each file under ~2 MB; correct MIME. If any file is an HTML error page (happens when a URL 404s under `curl -L` without `--fail`), delete it and re-resolve its source URL.

- [ ] **Step 5: Flag missing assets**

If any of the five required assets (scanner-trakrf-hero, cs108-handheld, tag-sample-pack, app-scan-screen, rfidready-logo) cannot be sourced from rfidready.net, note which ones in the commit message. Do NOT substitute stock photos or AI-generated imagery. Downstream tasks will render text-only cards in the affected sections.

- [ ] **Step 6: Commit**

```bash
git add public/images/product/
git commit -m "chore(tra-336): scrape product imagery from rfidready.net"
```

---

## Phase 2: Shell rewrites — Header, Footer, Hero

### Task 2: Rewrite Header.astro

New nav: How it works / Hardware / Partners, plus a primary "Try the free app" button linking to app.trakrf.id. Remove Pricing, FAQ, Sign In, and the `handheld.trakrf.id` link. Mobile menu is preserved (Alpine.js).

**Files:**
- Modify: `src/components/Header.astro` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/components/Header.astro` with the following**

```astro
---
import { Image } from 'astro:assets';
import logo from '../../public/images/icon.png';

const links = [
	{ href: '#how-it-works', label: 'How it works' },
	{ href: '#hardware', label: 'Hardware' },
	{ href: '#partners', label: 'Partners' }
];
---

<header class="bg-base-200">
	<nav
		class="container mx-auto flex items-center justify-between px-8 py-4"
		x-data="{ mobileMenuOpen: false }"
	>
		<!-- Logo -->
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<Image src={logo} alt="TrakRF" class="w-8" />
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">
			{
				links.map((link) => (
					<a href={link.href} class="link-hover link">
						{link.label}
					</a>
				))
			}
		</div>

		<!-- Desktop CTA -->
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<a
				href="https://app.trakrf.id"
				target="_blank"
				rel="noopener"
				class="btn btn-primary"
			>
				Try the free app
			</a>
		</div>

		<!-- Mobile menu button -->
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
				@click="mobileMenuOpen = true"
				aria-label="Open main menu"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6 text-base-content"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
				</svg>
			</button>
		</div>
	</nav>

	<!-- Mobile menu panel -->
	<div
		class="lg:hidden"
		x-show="mobileMenuOpen"
		x-transition:enter="transition ease-out duration-300"
		x-transition:enter-start="opacity-0 translate-x-full"
		x-transition:enter-end="opacity-100 translate-x-0"
		x-transition:leave="transition ease-in duration-200"
		x-transition:leave-start="opacity-100 translate-x-0"
		x-transition:leave-end="opacity-0 translate-x-full"
	>
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-base-200 px-8 py-4 sm:max-w-sm sm:ring-1 sm:ring-neutral/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<Image src={logo} alt="TrakRF" class="w-8" />
				</a>
				<button
					type="button"
					class="-m-2.5 rounded-md p-2.5"
					@click="mobileMenuOpen = false"
					aria-label="Close menu"
				>
					<span class="sr-only">Close menu</span>
					<svg
						class="h-6 w-6 text-base-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="flex flex-col items-start gap-y-4">
					{
						links.map((link) => (
							<a href={link.href} class="link-hover link" @click="mobileMenuOpen = false">
								{link.label}
							</a>
						))
					}
					<div class="divider"></div>
					<a
						href="https://app.trakrf.id"
						target="_blank"
						rel="noopener"
						class="btn btn-primary w-full"
					>
						Try the free app
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: passes. Astro may still warn about unused imports elsewhere; only fail on errors in `Header.astro`.

- [ ] **Step 3: Visually smoke-test in dev server**

Run: `pnpm dev` (leave running through subsequent tasks)
Open: `http://localhost:4321/`
Check:
- Header shows logo + three nav links + "Try the free app" button on desktop
- Mobile menu button visible below `lg` breakpoint; clicking it opens the drawer with the same links + button
- "Try the free app" opens `https://app.trakrf.id` in a new tab

The nav anchors may 404-scroll for now since the target sections don't exist yet — that's expected; we'll add them later.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(tra-336): rewrite Header for wholesale positioning"
```

---

### Task 3: Rewrite Footer.astro

Three-column footer: Platform (app.trakrf.id external), Partners (rfidready.net external, Become a partner anchor), Legal (ToS, Privacy). Copyright becomes "© YYYY DevOps To AI LLC dba TrakRF". Remove `/#pricing` link, `/blog` link, and the generic Support mailto (superseded by the Become a partner section).

**Files:**
- Modify: `src/components/Footer.astro` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/components/Footer.astro` with the following**

```astro
---
import { Image } from 'astro:assets';
import logo from '../../public/images/icon.png';

const currentYear = new Date().getFullYear();
---

<footer class="border-t border-base-content/10 bg-base-200">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="flex flex-col flex-wrap md:flex-row md:flex-nowrap lg:items-start">
			<!-- Logo and Description -->
			<div class="mx-auto w-64 flex-shrink-0 text-center md:mx-0 md:text-left">
				<a href="/" class="flex items-center justify-center gap-2 md:justify-start">
					<Image src={logo} alt="TrakRF logo" class="h-6 w-6" />
					<strong class="text-base font-extrabold tracking-tight md:text-lg"> TrakRF </strong>
				</a>
				<p class="mt-3 text-sm text-base-content/80">The RFID implementation layer.</p>
				<p class="mt-3 text-sm text-base-content/60">
					© {currentYear} DevOps To AI LLC dba TrakRF
				</p>
			</div>

			<!-- Link Columns -->
			<div
				class="-mb-10 mt-10 flex flex-grow flex-wrap justify-center text-center md:mt-0 md:pl-20 md:text-left"
			>
				<!-- Column 1: Platform -->
				<div class="w-full px-4 md:w-1/2 lg:w-1/3">
					<div
						class="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content md:text-left"
					>
						PLATFORM
					</div>
					<div class="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
						<a
							href="https://app.trakrf.id"
							target="_blank"
							rel="noopener"
							class="link-hover link"
						>
							Free BLE app
						</a>
					</div>
				</div>

				<!-- Column 2: Partners -->
				<div class="w-full px-4 md:w-1/2 lg:w-1/3">
					<div
						class="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content md:text-left"
					>
						PARTNERS
					</div>
					<div class="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
						<a
							href="https://rfidready.net"
							target="_blank"
							rel="noopener"
							class="link-hover link"
						>
							rfidReady
						</a>
						<a href="#become-partner" class="link-hover link"> Become a partner </a>
					</div>
				</div>

				<!-- Column 3: Legal -->
				<div class="w-full px-4 md:w-1/2 lg:w-1/3">
					<div
						class="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content md:text-left"
					>
						LEGAL
					</div>
					<div class="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
						<a href="/tos" class="link-hover link"> Terms of services </a>
						<a href="/privacy-policy" class="link-hover link"> Privacy policy </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
```

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: passes.

- [ ] **Step 3: Smoke-test**

Reload `http://localhost:4321/`. Check:
- Three columns visible on desktop (Platform / Partners / Legal)
- rfidReady link opens rfidready.net in new tab
- Become a partner link targets `#become-partner` (will no-op until that section exists; fine for now)
- Copyright line shows "© {currentYear} DevOps To AI LLC dba TrakRF"

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(tra-336): rewrite Footer with wholesale navigation"
```

---

### Task 4: Rewrite Hero.astro

New hero with wholesale positioning. Primary CTA → app.trakrf.id (external); secondary CTA → `#become-partner`. Image is `scanner-trakrf-hero.webp` from Task 1 (or text-only variant if missing).

**Files:**
- Modify: `src/components/Hero.astro` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/components/Hero.astro` with the following**

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../../public/images/product/scanner-trakrf-hero.webp';
---

<section
	class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 bg-base-100 px-8 py-8 lg:flex-row lg:gap-20 lg:py-20"
>
	<!-- Text Content -->
	<div
		class="flex flex-col items-center justify-center gap-8 text-center lg:items-start lg:gap-10 lg:text-left"
	>
		<h1 class="text-3xl font-extrabold tracking-tight lg:text-5xl">
			The RFID implementation layer for channel partners and integrators
		</h1>
		<p class="text-lg leading-relaxed opacity-80">
			Browser-based asset tracking. Zero install, no middleware, no driver support calls. Handheld
			BLE and fixed-reader MQTT paths in one platform.
		</p>
		<div class="flex flex-col gap-3 sm:flex-row">
			<a
				href="https://app.trakrf.id"
				target="_blank"
				rel="noopener"
				class="btn btn-primary btn-wide"
			>
				Try the free BLE app
			</a>
			<a href="#become-partner" class="btn btn-outline btn-wide">
				Talk to us about partnering
			</a>
		</div>
	</div>

	<!-- Hero Image -->
	<div class="lg:w-full">
		<Image
			src={heroImage}
			alt="A handheld RFID scanner paired with the TrakRF web app"
			class="w-full rounded-lg"
			widths={[400, 800, 1200]}
			sizes="(max-width: 768px) 100vw, 50vw"
		/>
	</div>
</section>
```

- [ ] **Step 2: Handle missing image gracefully**

If Task 1 could not source `scanner-trakrf-hero.webp`, replace the `---` frontmatter and the `<!-- Hero Image -->` block with a text-only variant:

```astro
---
---

<section
	class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 bg-base-100 px-8 py-16 lg:py-24"
>
	<!-- Text Content (centered, no image) -->
	<div
		class="flex max-w-4xl flex-col items-center justify-center gap-8 text-center lg:gap-10"
	>
		<h1 class="text-3xl font-extrabold tracking-tight lg:text-5xl">
			The RFID implementation layer for channel partners and integrators
		</h1>
		<p class="text-lg leading-relaxed opacity-80">
			Browser-based asset tracking. Zero install, no middleware, no driver support calls. Handheld
			BLE and fixed-reader MQTT paths in one platform.
		</p>
		<div class="flex flex-col gap-3 sm:flex-row">
			<a
				href="https://app.trakrf.id"
				target="_blank"
				rel="noopener"
				class="btn btn-primary btn-wide"
			>
				Try the free BLE app
			</a>
			<a href="#become-partner" class="btn btn-outline btn-wide">
				Talk to us about partnering
			</a>
		</div>
	</div>
</section>
```

- [ ] **Step 3: Typecheck**

Run: `pnpm typecheck`
Expected: passes. If Astro complains about the image import when the file is missing, you are in the fallback case — use the text-only variant from Step 2.

- [ ] **Step 4: Smoke-test**

Reload `http://localhost:4321/`. Check:
- New H1 copy renders
- Both buttons present
- Image loads if present; no broken-image icon

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(tra-336): rewrite Hero with wholesale positioning"
```

---

## Phase 3: Transition — simplify index.astro and delete obsolete components

### Task 5: Simplify index.astro to Hero-only and fix smooth-scroll guard

Before deleting obsolete components we must stop importing them. This task leaves the page at "just the new Hero" so the delete in Task 6 is clean.

**Files:**
- Modify: `src/pages/index.astro` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/pages/index.astro` with the following**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';

const title = 'TrakRF — The RFID implementation layer';
const description =
	'Browser-based RFID and BLE asset tracking for channel partners and integrators. Zero install, no middleware, no driver support calls.';
---

<BaseLayout title={title} description={description}>
	<main>
		<Hero />
	</main>

	<script>
		// Smooth scroll to in-page hash anchors
		document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e: Event) {
				const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
				if (!href || href === '#') return;

				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: 'smooth' });
				}
			});
		});
	</script>
</BaseLayout>
```

Note the guard list changed from `'#' || '#signin' || '#checkout'` to just the empty-hash guard — those two anchors are gone.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: passes. Even though `Problem.astro`, `FeaturesAccordion.astro`, `Pricing.astro`, `FAQ.astro`, and `CTA.astro` still exist on disk, nothing imports them any more.

- [ ] **Step 3: Smoke-test**

Reload `http://localhost:4321/`. Page should render Hero only (between Header and Footer). Title in the tab should be "TrakRF — The RFID implementation layer".

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "chore(tra-336): reduce index.astro to Hero-only as transition point"
```

---

### Task 6: Delete obsolete ShipFast components

**Files:**
- Delete: `src/components/Problem.astro`
- Delete: `src/components/FeaturesAccordion.astro`
- Delete: `src/components/Pricing.astro`
- Delete: `src/components/FAQ.astro`
- Delete: `src/components/CTA.astro`

- [ ] **Step 1: Verify no lingering imports**

```bash
grep -RIn "Problem\.astro\|FeaturesAccordion\.astro\|Pricing\.astro\|FAQ\.astro\|CTA\.astro" src/ || true
grep -RIn "from '\.\./components/\(Problem\|FeaturesAccordion\|Pricing\|FAQ\|CTA\)'" src/ || true
```

Expected: zero matches. If any remain, resolve them before deleting.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/Problem.astro \
       src/components/FeaturesAccordion.astro \
       src/components/Pricing.astro \
       src/components/FAQ.astro \
       src/components/CTA.astro
```

- [ ] **Step 3: Typecheck and build**

```bash
pnpm typecheck
pnpm build
```

Expected: both pass. Build must succeed — this is the last chance to catch a lingering reference before we start adding new sections.

- [ ] **Step 4: Smoke-test**

Reload `http://localhost:4321/`. Still Hero-only, no runtime errors in the browser console.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore(tra-336): remove ShipFast-derived section components"
```

---

## Phase 4: New section components

Each task creates one component and inserts it into `src/pages/index.astro` in the correct position. Section anchor IDs match the Header nav and footer "Become a partner" link.

### Task 7: HowItWorks.astro

Two-lane architecture overview — handheld (Web BLE) + fixed (MQTT). No photos.

**Files:**
- Create: `src/components/HowItWorks.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/HowItWorks.astro`**

```astro
---
const lanes = [
	{
		title: 'Handheld · Web BLE',
		flow: 'Browser → Web BLE → CS108 (or any supported BLE reader)',
		body:
			'A Bluetooth-capable browser talks directly to the handheld. Tags stream into the TrakRF web app; a Web Worker decodes the read stream so the UI stays responsive. No installs, no drivers, no support tickets for USB cables.'
	},
	{
		title: 'Fixed · MQTT',
		flow: 'LLRP reader → MQTT (direct or via Pi 5 edge relay) → Browser',
		body:
			'Fixed readers publish to MQTT — directly if the reader supports native MQTT, or through the TrakRF Pi 5 edge relay for LLRP-only hardware. The browser subscribes and renders reads through the same UI and data model as the handheld path.'
	}
];
---

<section id="how-it-works" class="bg-base-100">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="mb-12 text-center">
			<p class="mb-2 font-medium text-primary">How it works</p>
			<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
				Two paths, one browser-based platform
			</h2>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			{
				lanes.map((lane) => (
					<div class="rounded-lg border border-base-content/10 bg-base-200 p-8">
						<h3 class="text-xl font-bold">{lane.title}</h3>
						<p class="mt-3 font-mono text-sm text-base-content/70">{lane.flow}</p>
						<p class="mt-4 leading-relaxed">{lane.body}</p>
					</div>
				))
			}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Replace the current imports and `<main>` block with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';

const title = 'TrakRF — The RFID implementation layer';
const description =
	'Browser-based RFID and BLE asset tracking for channel partners and integrators. Zero install, no middleware, no driver support calls.';
---

<BaseLayout title={title} description={description}>
	<main>
		<Hero />
		<HowItWorks />
	</main>

	<script>
		document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e: Event) {
				const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
				if (!href || href === '#') return;
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: 'smooth' });
				}
			});
		});
	</script>
</BaseLayout>
```

- [ ] **Step 3: Typecheck + smoke**

Run: `pnpm typecheck`
Expected: passes. Reload browser; click the Header "How it works" link — page should now smooth-scroll to the new section.

- [ ] **Step 4: Commit**

```bash
git add src/components/HowItWorks.astro src/pages/index.astro
git commit -m "feat(tra-336): add HowItWorks section"
```

---

### Task 8: FreeBleScanning.astro

Proof-point section — app.trakrf.id is not a trial funnel, it's a technology demonstrator.

**Files:**
- Create: `src/components/FreeBleScanning.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/FreeBleScanning.astro`**

```astro
---
import { Image } from 'astro:assets';
let screenshot: ImageMetadata | null = null;
try {
	screenshot = (await import('../../public/images/product/app-scan-screen.webp')).default;
} catch {
	screenshot = null;
}
---

<section class="bg-base-200">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="flex flex-col items-center gap-12 lg:flex-row">
			<div class="flex basis-1/2 flex-col gap-6 text-center lg:text-left">
				<p class="font-medium text-primary">Free BLE scanning</p>
				<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
					Touch the product in under a minute
				</h2>
				<p class="text-lg leading-relaxed opacity-80">
					<code class="rounded bg-base-300 px-1.5 py-0.5 text-base">app.trakrf.id</code> is a
					proof point, not a trial funnel. Open it in a Bluetooth-capable browser, pair a CSL
					CS108, and scan — no account, no download, no middleware. Technical evaluators can
					verify the platform end-to-end without a sales conversation.
				</p>
				<div class="flex justify-center lg:justify-start">
					<a
						href="https://app.trakrf.id"
						target="_blank"
						rel="noopener"
						class="btn btn-primary btn-wide"
					>
						Open app.trakrf.id
					</a>
				</div>
			</div>

			<div class="basis-1/2">
				{
					screenshot ? (
						<Image
							src={screenshot}
							alt="TrakRF web app scan screen"
							class="mx-auto w-full max-w-md rounded-lg border border-base-content/10 shadow-lg"
							widths={[360, 720]}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					) : (
						<div class="mx-auto w-full max-w-md rounded-lg border border-dashed border-base-content/20 p-8 text-center text-sm text-base-content/60">
							Screenshot coming soon
						</div>
					)
				}
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Update the imports and `<main>`:

```astro
import FreeBleScanning from '../components/FreeBleScanning.astro';
```

```astro
<Hero />
<HowItWorks />
<FreeBleScanning />
```

- [ ] **Step 3: Typecheck + smoke**

`pnpm typecheck` → passes. Reload; new section renders between HowItWorks and Footer. "Open app.trakrf.id" opens in a new tab.

- [ ] **Step 4: Commit**

```bash
git add src/components/FreeBleScanning.astro src/pages/index.astro
git commit -m "feat(tra-336): add FreeBleScanning proof-point section"
```

---

### Task 9: Hardware.astro

Two-tier grid: Supported today + On roadmap. Uses scraped images for CS108 and tag sample pack where available; text-only cards otherwise.

**Files:**
- Create: `src/components/Hardware.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Hardware.astro`**

```astro
---
import { Image } from 'astro:assets';

let cs108Img: ImageMetadata | null = null;
let tagsImg: ImageMetadata | null = null;
try {
	cs108Img = (await import('../../public/images/product/cs108-handheld.webp')).default;
} catch {}
try {
	tagsImg = (await import('../../public/images/product/tag-sample-pack.webp')).default;
} catch {}

const supported = [
	{
		name: 'CSL CS108',
		spec: 'Handheld UHF · BLE · iOS/Android/Browser',
		integration: 'Direct BLE to browser',
		image: cs108Img,
		alt: 'CSL CS108 handheld RFID reader'
	},
	{
		name: 'CSL CS463',
		spec: 'Fixed UHF · 4 antennas · PoE',
		integration: 'Direct MQTT',
		image: null,
		alt: null
	},
	{
		name: 'Impinj Speedway R420',
		spec: 'Fixed UHF · 4 antennas · LLRP',
		integration: 'Via Pi 5 edge relay (in production on OMH)',
		image: null,
		alt: null
	},
	{
		name: 'GL-S10 gateway',
		spec: 'MQTT bridge for LLRP readers',
		integration: 'LLRP → MQTT on a compact gateway',
		image: null,
		alt: null
	},
	{
		name: 'Pi 5 edge server',
		spec: 'TrakRF edge software on Raspberry Pi 5',
		integration: 'Enables any LLRP reader today',
		image: null,
		alt: null
	},
	{
		name: 'Tag sample pack',
		spec: 'UHF inlays for pilots and testing',
		integration: 'Included in partner evaluation kits',
		image: tagsImg,
		alt: 'Assorted UHF RFID tag inlays'
	}
];

const roadmap = [
	{ name: 'Impinj R700', note: 'Native MQTT — skip the edge relay' },
	{ name: 'Impinj xArray / later Speedway', note: 'Fixed UHF family' },
	{ name: 'Chainway C72 / C66', note: 'Android handheld, BLE' },
	{ name: 'TSL 1153 / 2166', note: 'BLE sled' },
	{ name: 'Zebra RFD8500 / FX9600', note: 'Handheld + fixed' }
];
---

<section id="hardware" class="bg-base-100">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="mb-12 text-center">
			<p class="mb-2 font-medium text-primary">Supported hardware</p>
			<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
				Any LLRP reader today. More on the roadmap.
			</h2>
			<p class="mx-auto mt-4 max-w-3xl text-base-content/80">
				The Pi 5 edge relay covers every LLRP reader in the field right now. The roadmap
				focuses on readers with native MQTT so deployments can skip the edge device.
			</p>
		</div>

		<h3 class="mb-6 flex items-center gap-2 text-xl font-semibold">
			<span class="badge badge-success badge-lg">Supported today</span>
		</h3>
		<div class="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{
				supported.map((dev) => (
					<div class="flex h-full flex-col overflow-hidden rounded-lg border border-base-content/10 bg-base-200">
						{dev.image && (
							<Image
								src={dev.image}
								alt={dev.alt ?? dev.name}
								class="aspect-[4/3] w-full object-cover"
								widths={[300, 600]}
								sizes="(max-width: 640px) 100vw, 33vw"
							/>
						)}
						<div class="flex flex-1 flex-col gap-2 p-6">
							<h4 class="text-lg font-bold">{dev.name}</h4>
							<p class="text-sm text-base-content/70">{dev.spec}</p>
							<p class="mt-auto text-sm">{dev.integration}</p>
						</div>
					</div>
				))
			}
		</div>

		<h3 class="mb-6 flex items-center gap-2 text-xl font-semibold">
			<span class="badge badge-warning badge-lg">On roadmap</span>
			<span class="text-sm font-normal text-base-content/60">
				Prioritized by partner demand
			</span>
		</h3>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{
				roadmap.map((dev) => (
					<div class="rounded-lg border border-dashed border-base-content/20 p-5">
						<h4 class="font-bold">{dev.name}</h4>
						<p class="mt-1 text-sm text-base-content/70">{dev.note}</p>
					</div>
				))
			}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

```astro
import Hardware from '../components/Hardware.astro';
```

```astro
<Hero />
<HowItWorks />
<FreeBleScanning />
<Hardware />
```

- [ ] **Step 3: Typecheck + smoke**

`pnpm typecheck` → passes. Reload; Hardware renders with the two tiers. If CS108 or tag sample pack images were missing in Task 1, those cards render without an image but the rest of the card content still appears.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hardware.astro src/pages/index.astro
git commit -m "feat(tra-336): add Hardware section with supported/roadmap tiers"
```

---

### Task 10: ChannelPartners.astro

rfidReady card (logo if scraped; wordmark fallback) + "more coming" placeholder.

**Files:**
- Create: `src/components/ChannelPartners.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/ChannelPartners.astro`**

Use whichever extension Task 1 landed for the logo. If neither is present, the card renders with a text wordmark.

```astro
---
import { Image } from 'astro:assets';
let rfidReadyLogo: ImageMetadata | null = null;
try {
	rfidReadyLogo = (await import('../../public/images/product/rfidready-logo.webp')).default;
} catch {}
---

<section id="partners" class="bg-base-200">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="mb-12 text-center">
			<p class="mb-2 font-medium text-primary">Channel partners</p>
			<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
				TrakRF is wholesale-only
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-base-content/80">
				Our channel partners handle pricing, implementation services, and customer support.
				If you're an end customer, start with one of our partners.
			</p>
		</div>

		<div class="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
			<a
				href="https://rfidready.net"
				target="_blank"
				rel="noopener"
				class="flex flex-col items-center gap-4 rounded-lg border border-base-content/10 bg-base-100 p-8 text-center transition hover:border-primary"
			>
				{
					rfidReadyLogo ? (
						<Image
							src={rfidReadyLogo}
							alt="rfidReady"
							class="h-12 w-auto"
							widths={[200, 400]}
							sizes="200px"
						/>
					) : (
						<span class="text-2xl font-bold tracking-tight">rfidReady</span>
					)
				}
				<p class="text-sm text-base-content/70">
					Primary channel partner — inventory, integration services, and customer support
					across North America.
				</p>
				<span class="text-sm font-medium text-primary">rfidready.net →</span>
			</a>

			<div
				class="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-base-content/20 p-8 text-center"
			>
				<span class="text-2xl font-bold tracking-tight text-base-content/40">
					Your logo here
				</span>
				<p class="text-sm text-base-content/70">
					Additional partners listed as agreements finalize. Interested? See
					<a class="link link-primary" href="#become-partner">Become a partner</a>.
				</p>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

```astro
import ChannelPartners from '../components/ChannelPartners.astro';
```

```astro
<Hero />
<HowItWorks />
<FreeBleScanning />
<Hardware />
<ChannelPartners />
```

- [ ] **Step 3: Typecheck + smoke**

`pnpm typecheck` → passes. Reload; the Header "Partners" link should now smooth-scroll to this section. Inline `#become-partner` link falls through (target still missing).

- [ ] **Step 4: Commit**

```bash
git add src/components/ChannelPartners.astro src/pages/index.astro
git commit -m "feat(tra-336): add ChannelPartners section with rfidReady"
```

---

### Task 11: BecomePartner.astro

Primary Google Calendar booking button + secondary mailto.

**Files:**
- Create: `src/components/BecomePartner.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/BecomePartner.astro`**

```astro
---
const bookingUrl = 'https://calendar.app.google/Hv1Bsm8Mc4wjPaJV8';
const partnerEmail = 'partners@trakrf.id';
---

<section id="become-partner" class="bg-primary text-primary-content">
	<div class="mx-auto max-w-3xl px-8 py-24 text-center">
		<p class="mb-2 font-medium uppercase tracking-widest opacity-80">Become a partner</p>
		<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
			Let's talk about reselling TrakRF
		</h2>
		<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed opacity-90">
			We're looking for distributors, systems integrators, and MSPs with industrial and
			logistics customers. 30 minutes is enough to see the platform, hear your use case, and
			decide if it's a fit.
		</p>
		<div class="mt-8 flex flex-col items-center gap-4">
			<a
				href={bookingUrl}
				target="_blank"
				rel="noopener"
				class="btn btn-neutral btn-wide"
			>
				Book a 30-min intro call
			</a>
			<p class="text-sm opacity-90">
				Or email <a href={`mailto:${partnerEmail}`} class="link underline">{partnerEmail}</a>
			</p>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

```astro
import BecomePartner from '../components/BecomePartner.astro';
```

```astro
<Hero />
<HowItWorks />
<FreeBleScanning />
<Hardware />
<ChannelPartners />
<BecomePartner />
```

- [ ] **Step 3: Typecheck + smoke**

`pnpm typecheck` → passes. Reload; scroll-to `#become-partner` now resolves. Click the booking button — opens Google Calendar in a new tab. Click the mailto — opens the default mail client.

- [ ] **Step 4: Commit**

```bash
git add src/components/BecomePartner.astro src/pages/index.astro
git commit -m "feat(tra-336): add BecomePartner section with booking + mailto"
```

---

### Task 12: TechnicalDetails.astro

Four-item grid: License (BSL), Self-hosting, API-first, Integration-ready.

**Files:**
- Create: `src/components/TechnicalDetails.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/TechnicalDetails.astro`**

```astro
---
const details = [
	{
		title: 'License',
		body:
			'Business Source License (BSL). Self-hosting is included. Commercial resale is governed by the partner agreement.'
	},
	{
		title: 'Self-hosting',
		body:
			'Run the full stack on partner or customer infrastructure. No mandatory TrakRF-hosted dependency for operational data.'
	},
	{
		title: 'API-first',
		body:
			'Every action in the web app is an API call. The same endpoints power TeamCentral-style integrations and third-party automation.'
	},
	{
		title: 'Integration-ready',
		body:
			'MQTT, REST, and webhooks out of the box. Pair with Pi 5 edge relay to bridge LLRP readers and existing event buses.'
	}
];
---

<section class="bg-base-100">
	<div class="mx-auto max-w-7xl px-8 py-24">
		<div class="mb-12 text-center">
			<p class="mb-2 font-medium text-primary">Technical details</p>
			<h2 class="text-3xl font-bold tracking-tight lg:text-4xl">
				Built for partners who need to ship
			</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{
				details.map((item) => (
					<div class="rounded-lg border border-base-content/10 bg-base-200 p-6">
						<h3 class="text-lg font-bold">{item.title}</h3>
						<p class="mt-3 text-sm leading-relaxed opacity-80">{item.body}</p>
					</div>
				))
			}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Add to `src/pages/index.astro` (final composition)**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import HowItWorks from '../components/HowItWorks.astro';
import FreeBleScanning from '../components/FreeBleScanning.astro';
import Hardware from '../components/Hardware.astro';
import ChannelPartners from '../components/ChannelPartners.astro';
import BecomePartner from '../components/BecomePartner.astro';
import TechnicalDetails from '../components/TechnicalDetails.astro';

const title = 'TrakRF — The RFID implementation layer';
const description =
	'Browser-based RFID and BLE asset tracking for channel partners and integrators. Zero install, no middleware, no driver support calls.';
---

<BaseLayout title={title} description={description}>
	<main>
		<Hero />
		<HowItWorks />
		<FreeBleScanning />
		<Hardware />
		<ChannelPartners />
		<BecomePartner />
		<TechnicalDetails />
	</main>

	<script>
		document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (e: Event) {
				const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
				if (!href || href === '#') return;
				const target = document.querySelector(href);
				if (target) {
					e.preventDefault();
					target.scrollIntoView({ behavior: 'smooth' });
				}
			});
		});
	</script>
</BaseLayout>
```

- [ ] **Step 3: Typecheck + smoke**

`pnpm typecheck` → passes. Reload; all seven sections render in order.

- [ ] **Step 4: Commit**

```bash
git add src/components/TechnicalDetails.astro src/pages/index.astro
git commit -m "feat(tra-336): add TechnicalDetails section and finalize index composition"
```

---

## Phase 5: Cleanup and final validation

### Task 13: Remove obsolete `public/images/hero.jpg`

The old stock-photo hero is no longer referenced. Delete it.

**Files:**
- Delete: `public/images/hero.jpg`

- [ ] **Step 1: Confirm nothing references it**

```bash
grep -RIn "images/hero\.jpg\|hero\.jpg" src/ public/ || true
```

Expected: zero matches.

- [ ] **Step 2: Delete**

```bash
git rm public/images/hero.jpg
```

- [ ] **Step 3: Typecheck and build**

```bash
pnpm typecheck
pnpm build
```

Both must pass.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(tra-336): remove unused ShipFast hero stock photo"
```

---

### Task 14: Final validation and push

- [ ] **Step 1: Lint**

Run: `pnpm lint`
Expected: passes cleanly. Fix any formatting or ESLint findings before proceeding.

- [ ] **Step 2: Typecheck**

Run: `pnpm typecheck`
Expected: zero errors.

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: builds successfully. Note any unused-image or preload warnings and decide whether to address them inline.

- [ ] **Step 4: Manual smoke checklist**

Run: `pnpm dev` and walk through the following in a desktop browser:

- Header: logo + three nav links + primary button visible
- Clicking each nav link smooth-scrolls to the corresponding section (`#how-it-works`, `#hardware`, `#partners`)
- Hero: H1 copy matches the spec; both CTAs work
- HowItWorks: two lanes render side-by-side on desktop, stacked on mobile
- FreeBleScanning: app.trakrf.id button opens in new tab; screenshot present if sourced
- Hardware: Supported-today grid shows 6 cards; On-roadmap grid shows 5 cards; badges render
- ChannelPartners: rfidReady card links to rfidready.net
- BecomePartner: booking button opens Google Calendar; mailto opens mail client
- TechnicalDetails: four-card grid renders
- Footer: three columns (Platform / Partners / Legal), current-year copyright, no broken links
- Mobile (narrow viewport): hamburger menu opens, nav links work, primary button present at the bottom
- Browser console: no errors on load or navigation

Then test the preview banner path:

```bash
PUBLIC_BRANCH=preview pnpm build && pnpm preview
```

Expected: the Pythonesque preview banner appears at the top of the page.

- [ ] **Step 5: Push the branch**

```bash
git push -u origin miks2u/tra-336-rewrite-trakrfid-as-wholesale-platformtechnology-site
```

- [ ] **Step 6 (optional): open the pull request**

If the user has confirmed they want a PR opened, use:

```bash
gh pr create --title "TRA-336: rewrite trakrf.id as wholesale platform site" --body "$(cat <<'EOF'
## Summary
- Deletes five ShipFast-derived consumer-funnel components
- Adds six new section components (HowItWorks, FreeBleScanning, Hardware, ChannelPartners, BecomePartner, TechnicalDetails)
- Rewrites Hero, Header, and Footer for wholesale/partner positioning
- Sources real product imagery from rfidready.net

Closes TRA-336.

## Test plan
- [ ] pnpm lint clean
- [ ] pnpm typecheck clean
- [ ] pnpm build succeeds
- [ ] Manual smoke on desktop + mobile
- [ ] Preview banner still fires with PUBLIC_BRANCH=preview

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Otherwise stop here and wait for user confirmation.

---

## Notes for the implementer

- **Alpine.js** is loaded via `<script>` in `src/layouts/BaseLayout.astro` and powers the Header's mobile menu. Do not remove those script tags.
- **PreviewBanner.astro** is intentionally untouched. It reads `import.meta.env.PUBLIC_BRANCH` at build time.
- **Smooth scroll script** lives in `src/pages/index.astro`. Keep the empty-hash guard; remove any references to `#signin` or `#checkout`.
- **Accessibility:** every new `<a>` to an external URL includes `target="_blank"` and `rel="noopener"`. Every decorative image has a meaningful `alt`.
- **DaisyUI semantic classes** (`btn`, `btn-primary`, `badge-success`, `link-primary`, `bg-base-*`) are used throughout to stay inside the existing theme. Do not hardcode hex colors.
- **No new dependencies** — everything here is built from components already available in the repo.
