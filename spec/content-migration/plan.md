# Implementation Plan: TrakRF-Web Content Migration to Astro

Generated: 2025-10-19
Specification: spec.md

## Understanding

This plan implements **Phase 1 of 3** for migrating trakrf-web marketing content to Astro. Phase 1 establishes the foundation with static components and styling, creating a functional (but not yet interactive) homepage. This "lift and shift" migration preserves the existing Next.js/React component structure while adapting to Astro's component syntax.

**Phase 1 Goal**: Get a visually accurate static homepage on screen with proper Tailwind styling, image assets organized, and foundation ready for interactivity in Phase 2.

**Key Decisions**:

- Using Astro `<Image>` component for optimization
- Header HTML structure complete but menu toggle stubbed (non-functional until Phase 2)
- Custom gradient added to global.css (simpler than Tailwind utility)
- Components imported inline in index.astro (no Layout abstraction yet)
- Pricing updated to $97/$297 (production pricing, not template $19/$69)

## Relevant Files

### Reference Patterns (existing code to follow):

**Tailwind Configuration**:

- `/home/mike/trakrf-web/tailwind.config.js` (lines 10-67) - Custom animations, keyframes, gradient, DaisyUI config

**Global CSS**:

- `/home/mike/trakrf-web/app/globals.css` (lines 5-21) - Smooth scroll, `.btn-gradient`, `.btn` capitalization

**Component Copy & Structure**:

- `/home/mike/trakrf-web/components/Header.tsx` (195 lines) - Navigation links, logo, mobile menu HTML
- `/home/mike/trakrf-web/components/Hero.tsx` (48 lines) - Headline, subheading, image, layout
- `/home/mike/trakrf-web/components/Problem.tsx` (69 lines) - 3-step journey, Arrow SVG, emoji steps
- `/home/mike/trakrf-web/components/Footer.tsx` (118 lines) - Logo, links, copyright, layout

**Configuration**:

- `/home/mike/trakrf-web/config.ts` (lines 4-115) - App metadata, email config, domain

**Assets**:

- `/home/mike/trakrf-web/app/icon.png` - Logo (24KB)
- `/home/mike/trakrf-web/app/opengraph-image.png` - OG image (33.6KB)
- `/home/mike/trakrf-web/app/twitter-image.png` - Twitter card (33.6KB)

### Files to Create:

**Configuration & Styles** (Phase 1):

- `src/styles/global.css` - Global CSS with Tailwind imports, smooth scroll, custom classes

**Components** (Phase 1):

- `src/components/Header.astro` - Navigation with stubbed mobile menu
- `src/components/Hero.astro` - Main hero section
- `src/components/Problem.astro` - Problem agitation section with Arrow SVG
- `src/components/Footer.astro` - Site footer

**Pages** (Phase 1):

- `src/pages/index.astro` - Homepage layout importing 4 components

**Assets** (Phase 1):

- `public/images/hero.jpg` - Downloaded Unsplash hero image
- `public/images/icon.png` - Logo
- `public/images/opengraph-image.png` - OG image
- `public/images/twitter-image.png` - Twitter card

### Files to Modify:

**Configuration** (Phase 1):

- `tailwind.config.mjs` (add custom animations, keyframes, gradient to theme.extend)
- `astro.config.mjs` (verify - likely no changes needed)
- `src/env.d.ts` (verify - likely no changes needed)

**To Delete** (Phase 1):

- `src/pages/index.astro` - Current Hello World page (replace with new homepage)

## Architecture Impact

**Subsystems affected**: Frontend/UI only

**New dependencies**:

- None for Phase 1 (Alpine.js deferred to Phase 2)

**Breaking changes**:

- Replaces Hello World homepage with marketing content

## Phase 1 Task Breakdown

### Task 1: Update Tailwind Configuration with Custom Animations

**File**: `tailwind.config.mjs`
**Action**: MODIFY
**Pattern**: Reference `/home/mike/trakrf-web/tailwind.config.js` lines 10-67

**Implementation**:

Add to `theme.extend` object:

```javascript
animation: {
  opacity: "opacity 0.25s ease-in-out",
  appearFromRight: "appearFromRight 300ms ease-in-out",
  wiggle: "wiggle 1.5s ease-in-out infinite",
  popup: "popup 0.25s ease-in-out",
  shimmer: "shimmer 3s ease-out infinite alternate",
},
keyframes: {
  opacity: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  appearFromRight: {
    "0%": { opacity: "0.3", transform: "translate(15%, 0px)" },
    "100%": { opacity: "1", transform: "translate(0)" },
  },
  wiggle: {
    "0%, 20%, 80%, 100%": { transform: "rotate(0deg)" },
    "30%, 60%": { transform: "rotate(-2deg)" },
    "40%, 70%": { transform: "rotate(2deg)" },
    "45%": { transform: "rotate(-4deg)" },
    "55%": { transform: "rotate(4deg)" },
  },
  popup: {
    "0%": { transform: "scale(0.8)", opacity: "0.8" },
    "50%": { transform: "scale(1.1)", opacity: "1" },
    "100%": { transform: "scale(1)", opacity: "1" },
  },
  shimmer: {
    "0%": { backgroundPosition: "0 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
},
```

**Validation**:

- Run `pnpm lint` to verify no syntax errors
- Verify animations are accessible in browser DevTools

---

### Task 2: Create Global CSS with Custom Classes

**File**: `src/styles/global.css`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/app/globals.css` lines 5-21

**Implementation**:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Smooth scroll behavior */
html,
body {
	scroll-behavior: smooth !important;
}

/* Progress bar transition */
progress::-webkit-progress-value {
	transition: 0.6s width ease-out;
}

/* Custom gradient button with shimmer */
.btn-gradient {
	background: linear-gradient(
		60deg,
		#f79533,
		#f37055,
		#ef4e7b,
		#a166ab,
		#5073b8,
		#1098ad,
		#07b39b,
		#6fba82
	);
	background-size: 300% 300%;
	animation: shimmer 3s ease-out infinite alternate;
	border: 0;
	border-color: transparent;
	color: white;
	box-shadow:
		0 1px 3px 0 rgb(0 0 0 / 0.1),
		0 1px 2px -1px rgb(0 0 0 / 0.1);
	transition-duration: 100ms;
}

.btn-gradient:hover {
	filter: saturate(1.2);
}

.btn-gradient:disabled {
	background: rgb(107 114 128 / 0.3);
	animation: none;
}

/* Override DaisyUI button capitalization */
.btn {
	text-transform: capitalize !important;
}
```

**Then import in `src/pages/index.astro`**:

```astro
---
import '../styles/global.css';
---
```

**Validation**:

- Run `pnpm build` to verify CSS compiles
- Check browser for smooth scroll and custom classes

---

### Task 3: Download and Organize Image Assets

**Action**: DOWNLOAD & ORGANIZE
**Pattern**: Create `public/images/` directory structure

**Implementation**:

```bash
# Create images directory
mkdir -p public/images

# Download hero image from Unsplash
curl -o public/images/hero.jpg "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"

# Copy logo from trakrf-web
cp /home/mike/trakrf-web/app/icon.png public/images/icon.png

# Copy OpenGraph images
cp /home/mike/trakrf-web/app/opengraph-image.png public/images/opengraph-image.png
cp /home/mike/trakrf-web/app/twitter-image.png public/images/twitter-image.png
```

**Assets to download**:

1. `hero.jpg` - Main hero image (Unsplash)
2. `icon.png` - Logo (24KB)
3. `opengraph-image.png` - OG share image (33.6KB)
4. `twitter-image.png` - Twitter card (33.6KB)

**Validation**:

- Verify all 4 images exist in `public/images/`
- Check file sizes are reasonable (hero.jpg should be < 500KB)

---

### Task 4: Create Header Component

**File**: `src/components/Header.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/Header.tsx` lines 1-195

**Implementation**:

```astro
---
import { Image } from 'astro:assets';
import logo from '../../public/images/icon.png';

const links = [
	{ href: '/#pricing', label: 'Pricing' },
	{ href: '/#faq', label: 'FAQ' },
	{ href: 'https://handheld.trakrf.id', label: 'Read Tags' }
];
---

<header class="bg-base-200">
	<nav class="container mx-auto flex items-center justify-between px-8 py-4">
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
			<a href="#signin" class="btn btn-primary">Sign In</a>
		</div>

		<!-- Mobile menu button (stubbed - non-functional in Phase 1) -->
		<div class="flex lg:hidden">
			<button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5">
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6 text-base-content"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
				</svg>
			</button>
		</div>
	</nav>

	<!-- Mobile menu panel (stubbed - hidden in Phase 1, will be functional in Phase 2) -->
	<div class="hidden lg:hidden">
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-base-200 px-8 py-4 sm:max-w-sm sm:ring-1 sm:ring-neutral/10"
		>
			<div class="flex items-center justify-between">
				<a href="/" class="-m-1.5 p-1.5">
					<Image src={logo} alt="TrakRF" class="w-8" />
				</a>
				<button type="button" class="-m-2.5 rounded-md p-2.5">
					<span class="sr-only">Close menu</span>
					<svg
						class="h-6 w-6 text-base-content"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>
			<div class="mt-6 flow-root">
				<div class="flex flex-col items-start gap-y-4">
					{
						links.map((link) => (
							<a href={link.href} class="link-hover link">
								{link.label}
							</a>
						))
					}
					<div class="divider"></div>
					<a href="#signin" class="btn btn-primary w-full">Sign In</a>
				</div>
			</div>
		</div>
	</div>
</header>
```

**Key details**:

- Mobile menu HTML is present but hidden with `class="hidden"`
- Button click handlers stubbed (will add in Phase 2)
- Uses Astro Image component for logo optimization
- Links array matches trakrf-web structure
- "Read Tags" points to handheld.trakrf.id (active link)

**Validation**:

- Component renders without errors
- Desktop nav visible on large screens
- Mobile button visible on small screens (non-functional expected)
- Logo displays correctly

---

### Task 5: Create Hero Component

**File**: `src/components/Hero.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/Hero.tsx` lines 6-48

**Implementation**:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../../public/images/hero.jpg';
---

<section
	class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-16 bg-base-100 px-8 py-8 lg:flex-row lg:gap-20 lg:py-20"
>
	<!-- Text Content -->
	<div
		class="flex flex-col items-center justify-center gap-10 text-center lg:items-start lg:gap-14 lg:text-left"
	>
		<h1 class="text-3xl font-extrabold tracking-tight md:-mb-4 lg:text-5xl">Track Tags Today!</h1>
		<p class="text-lg leading-relaxed opacity-80">
			The RFID tracking solution that will have you tracking all the things all the time in no time
			at all!
		</p>
		<a href="#signin" class="btn btn-primary btn-wide"> Get Started </a>
	</div>

	<!-- Hero Image -->
	<div class="lg:w-full">
		<Image
			src={heroImage}
			alt="RFID tracking technology - computers and electronics"
			class="w-full rounded-lg"
			widths={[400, 800, 1200]}
			sizes="(max-width: 768px) 100vw, 50vw"
		/>
	</div>
</section>
```

**Key details**:

- Exact copy from trakrf-web (lines 25-30)
- Astro Image with responsive widths for optimization
- Button links to #signin (stub)
- Flexbox layout: stacked mobile, side-by-side desktop

**Validation**:

- Hero section renders with correct layout
- Image loads and displays
- Text is legible and styled correctly
- Responsive layout works (mobile stacked, desktop side-by-side)

---

### Task 6: Create Problem Component with Arrow SVG

**File**: `src/components/Problem.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/Problem.tsx` lines 1-69

**Implementation**:

```astro
<section class="bg-neutral text-neutral-content">
	<div class="mx-auto max-w-7xl px-8 py-16 text-center md:py-32">
		<!-- Headline -->
		<h2 class="mx-auto mb-6 max-w-3xl text-3xl font-extrabold tracking-tight md:mb-8 md:text-4xl">
			80% of RFID projects never launch
		</h2>

		<!-- Subheading -->
		<p class="mx-auto mb-12 max-w-xl text-lg leading-relaxed opacity-90 md:mb-20">
			Network, firmware, configuration, middleware, so many details...
		</p>

		<!-- 3-Step Journey -->
		<div class="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
			<!-- Step 1 -->
			<div class="flex w-full flex-col items-center justify-center gap-2 md:w-48">
				<span class="text-4xl">🧑‍💻</span>
				<h3 class="font-bold">12 hours in, still haven't read your first tag</h3>
			</div>

			<!-- Arrow 1 -->
			<svg
				class="w-12 shrink-0 fill-neutral-content opacity-70 max-md:-scale-x-100 md:rotate-90"
				viewBox="0 0 138 138"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
					></path>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
					></path>
				</g>
			</svg>

			<!-- Step 2 -->
			<div class="flex w-full flex-col items-center justify-center gap-2 md:w-48">
				<span class="text-4xl">😮‍💨</span>
				<h3 class="font-bold">No idea which detail you missed</h3>
			</div>

			<!-- Arrow 2 -->
			<svg
				class="w-12 shrink-0 fill-neutral-content opacity-70 max-md:-scale-x-100 md:rotate-90"
				viewBox="0 0 138 138"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M72.9644 5.31431C98.8774 43.8211 83.3812 88.048 54.9567 120.735C54.4696 121.298 54.5274 122.151 55.0896 122.639C55.6518 123.126 56.5051 123.068 56.9922 122.506C86.2147 88.9044 101.84 43.3918 75.2003 3.80657C74.7866 3.18904 73.9486 3.02602 73.3287 3.44222C72.7113 3.85613 72.5484 4.69426 72.9644 5.31431Z"
					></path>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M56.5084 121.007C56.9835 118.685 57.6119 115.777 57.6736 115.445C59.3456 106.446 59.5323 97.67 58.4433 88.5628C58.3558 87.8236 57.6824 87.2948 56.9433 87.3824C56.2042 87.4699 55.6756 88.1435 55.7631 88.8828C56.8219 97.7138 56.6432 106.225 55.0203 114.954C54.926 115.463 53.5093 121.999 53.3221 123.342C53.2427 123.893 53.3688 124.229 53.4061 124.305C53.5887 124.719 53.8782 124.911 54.1287 125.015C54.4123 125.13 54.9267 125.205 55.5376 124.926C56.1758 124.631 57.3434 123.699 57.6571 123.487C62.3995 120.309 67.4155 116.348 72.791 113.634C77.9171 111.045 83.3769 109.588 89.255 111.269C89.9704 111.475 90.7181 111.057 90.9235 110.342C91.1288 109.626 90.7117 108.878 89.9963 108.673C83.424 106.794 77.3049 108.33 71.5763 111.223C66.2328 113.922 61.2322 117.814 56.5084 121.007Z"
					></path>
				</g>
			</svg>

			<!-- Step 3 -->
			<div class="flex w-full flex-col items-center justify-center gap-2 md:w-48">
				<span class="text-4xl">😔</span>
				<h3 class="font-bold">Quit project</h3>
			</div>
		</div>
	</div>
</section>
```

**Key details**:

- Exact copy from trakrf-web (lines 46-65)
- Arrow SVG embedded inline (from lines 1-23)
- Responsive arrow rotation: flipped on mobile, rotated 90° on desktop
- Emojis preserved exactly as in original
- Background uses DaisyUI `bg-neutral` and `text-neutral-content`

**Validation**:

- Section renders with neutral background
- All 3 steps display with emojis
- Arrows render between steps
- Responsive layout works (vertical mobile, horizontal desktop)

---

### Task 7: Create Footer Component

**File**: `src/components/Footer.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/Footer.tsx` lines 1-118

**Implementation**:

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
				<p class="mt-3 text-sm text-base-content/80">RFID right now: read tags today!</p>
				<p class="mt-3 text-sm text-base-content/60">
					Copyright © {currentYear} - All rights reserved
				</p>
			</div>

			<!-- Links Columns -->
			<div
				class="-mb-10 mt-10 flex flex-grow flex-wrap justify-center text-center md:mt-0 md:pl-20 md:text-left"
			>
				<!-- Column 1: Links -->
				<div class="w-full px-4 md:w-1/2 lg:w-1/3">
					<div
						class="footer-title mb-3 text-sm font-semibold tracking-widest text-base-content md:text-left"
					>
						LINKS
					</div>
					<div class="mb-10 flex flex-col items-center justify-center gap-2 text-sm md:items-start">
						<a
							href="mailto:support@trakrf.id"
							target="_blank"
							class="link-hover link"
							aria-label="Contact Support"
						>
							Support
						</a>
						<a href="/#pricing" class="link-hover link"> Pricing </a>
					</div>
				</div>

				<!-- Column 2: Legal -->
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

**Key details**:

- Dynamic year using JavaScript `new Date().getFullYear()`
- Support email: `support@trakrf.id`
- Links: Pricing (hash anchor), Legal pages (actual routes)
- Logo with Astro Image optimization
- Responsive layout: centered mobile, left-aligned desktop

**Validation**:

- Footer renders at bottom of page
- Current year displays correctly
- All links navigate properly
- Logo displays
- Responsive layout works

---

### Task 8: Create Homepage Layout with All Components

**File**: `src/pages/index.astro`
**Action**: REPLACE (delete Hello World version)
**Pattern**: Compose all Phase 1 components

**Implementation**:

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Problem from '../components/Problem.astro';
import Footer from '../components/Footer.astro';

const title = 'TrakRF - Track Tags Today!';
const description = 'RFID right now: read tags today!';
---

<!doctype html>
<html lang="en" data-theme="light">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>{title}</title>
		<meta name="description" content={description} />

		<!-- OpenGraph -->
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content="/images/opengraph-image.png" />
		<meta property="og:type" content="website" />

		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content="/images/twitter-image.png" />
	</head>
	<body>
		<Header />
		<main>
			<Hero />
			<Problem />
		</main>
		<Footer />
	</body>
</html>
```

**Key details**:

- Imports global.css at top
- All 4 Phase 1 components included
- Metadata for SEO and social sharing
- DaisyUI theme set to "light"
- Semantic HTML structure (header, main, footer)

**Validation**:

- Page builds without errors
- All components render in correct order
- Metadata appears in page source
- No console errors in browser
- Visual appearance matches trakrf-web homepage (minus interactive sections)

---

## Phase 2 Outline: Interactive Components

**Not implemented in this plan - separate spec/build cycle**

**Scope**:

1. Install Alpine.js or implement vanilla JS solution
2. Create FeaturesAccordion component with expand/collapse
3. Create FAQ component with accordion functionality
4. Create Pricing component with stubbed checkout buttons ($97, $297, Call)
5. Create CTA component with background image
6. Add mobile menu toggle functionality to Header
7. Add smooth scroll JavaScript for hash links
8. Update homepage to include all 7 sections

**Estimated**: 7 subtasks
**Complexity**: 6/10

---

## Phase 3 Outline: Multi-Page Structure & Content Cleanup

**Not implemented in this plan - separate spec/build cycle**

**Scope**:

1. Create blog index page listing 3 posts
2. Create blog post detail page with slug routing
3. Create 3 static blog post pages
4. Create Privacy Policy page with shipfa.st → trakrf.id cleanup
5. Create Terms of Service page with shipfa.st → trakrf.id cleanup
6. Run find/replace for all shipfa.st references → trakrf.id
7. Run find/replace for marc@shipfa.st → admin@trakrf.id
8. Final Lighthouse performance audit

**Estimated**: 6 subtasks
**Complexity**: 4/10

---

## Risk Assessment

**Risk**: Tailwind animations don't work after migration
**Mitigation**: Test shimmer animation on a button immediately after config update. Animations are standard CSS, should transfer cleanly.

**Risk**: Astro Image component fails to optimize large hero image
**Mitigation**: Download hero image first, verify file size < 500KB. Astro Image handles large images well, but can fall back to standard `<img>` if needed.

**Risk**: DaisyUI classes don't render correctly
**Mitigation**: Already configured in astro-setup. Verify with simple button test before building complex components.

**Risk**: Logo import path issues
**Mitigation**: Use Astro's asset imports (`import logo from '../../public/images/icon.png'`) which are type-safe and verified at build time.

**Risk**: Mobile menu HTML structure incomplete
**Mitigation**: Copy exact HTML from trakrf-web Header.tsx lines 125-190. Stub is intentionally non-functional until Phase 2.

## Integration Points

**Styling**:

- Tailwind config extends with 5 custom animations
- Global CSS adds 2 custom classes (`.btn-gradient`, `.btn` override)
- DaisyUI theme remains "light" (already configured)

**Assets**:

- Images in `public/images/` accessible via `/images/` URL path
- Astro Image component uses image imports for optimization
- Logo used in Header and Footer components

**Pages**:

- Homepage at `/` (index.astro)
- Phase 2/3 will add blog and legal pages

**Components**:

- All Phase 1 components are standalone (no shared state)
- Header and Footer used on all pages (will need Layout component in Phase 2/3)

## VALIDATION GATES (MANDATORY)

**CRITICAL**: These are not suggestions - they are GATES that block progress.

After EVERY code change, use commands from `spec/stack.md`:

- **Gate 1**: Syntax & Style → `pnpm lint`
- **Gate 2**: Type Safety → `pnpm typecheck`
- **Gate 3**: Unit Tests → `echo "✅ No tests to run (marketing site)"`
- **Gate 4**: Build Success → `pnpm build`

**Enforcement Rules**:

- If ANY gate fails → Fix immediately
- Re-run validation after fix
- Loop until ALL gates pass
- After 3 failed attempts → Stop and ask for help

**Do not proceed to next task until current task passes all gates.**

## Validation Sequence

**After each task (1-8)**:

```bash
pnpm lint
pnpm typecheck
```

**After Task 3 (images downloaded)**:

```bash
ls -lh public/images/
# Verify all 4 images present and reasonable sizes
```

**After Task 8 (homepage complete)**:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm preview  # Manual check: visit http://localhost:4321
```

**Visual validation checklist**:

- [ ] Header displays with logo and desktop nav
- [ ] Hero section shows headline, text, and image side-by-side
- [ ] Problem section shows 3 steps with arrows between them
- [ ] Footer displays with logo, links, and copyright
- [ ] Responsive layout works (test mobile and desktop widths)
- [ ] No console errors in browser DevTools

## Plan Quality Assessment

**Complexity Score**: 5/10 (MEDIUM-LOW - Phase 1 only)

**File Count**: 7 files to create, 1 file to modify (8 file operations)
**Subsystems**: 1 (Frontend/UI)
**Task Estimate**: 8 subtasks (Phase 1)
**Dependencies**: 0 new packages (using existing Astro + Tailwind + DaisyUI)

**Confidence Score**: 9/10 (HIGH)

**Confidence Factors**:
✅ Clear requirements from spec
✅ Exact source code extracted with line numbers from trakrf-web
✅ All clarifying questions answered (4/4)
✅ Similar Astro patterns used in Hello World page (Astro setup completed)
✅ Tailwind + DaisyUI already configured and working
✅ No complex state management or interactivity in Phase 1
✅ All assets located and accessible
✅ Astro Image component is well-documented and mature
✅ Phase split reduces scope to manageable size

**Assessment**: Very high confidence for Phase 1. This is primarily static component translation with well-understood patterns. The main complexity is in accurate copy extraction and styling preservation, both of which have clear source references.

**Estimated one-pass success probability**: 90%

**Reasoning**: Phase 1 is straightforward static component migration with proven patterns. The 10% risk accounts for potential Tailwind custom animation quirks or Astro Image optimization edge cases, but these are easily debuggable. All source code is extracted and referenced, reducing guesswork to near zero. The split into phases eliminates interactivity complexity, making this a clean "render static content" task that Astro excels at.
