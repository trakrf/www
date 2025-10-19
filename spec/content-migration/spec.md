# Feature: TrakRF-Web Content Migration to Astro

## Metadata

**Type**: feature
**Depends On**: astro-setup (completed)

## Outcome

Complete migration of trakrf-web marketing content (homepage, blog, legal pages) to Astro static site with visual parity and functional interactivity.

## User Story

As a visitor to trakrf.id
I want to see the same marketing content and experience
So that I can learn about TrakRF and navigate to the application

## Context

**Current**: Next.js marketing site at /home/mike/trakrf-web with hardcoded React components
**Desired**: Astro static site with migrated content, preserved styling, and lightweight interactivity
**Scope**: "Lift and shift" MVP - migrate content as-is without improvement or editing
**Quality Bar**: Visual parity, functional interactivity, fast static build

## Technical Requirements

### Content Migration (10 Components)

Migrate all 7 homepage marketing components:

1. **Header** - Navigation with logo, links, mobile menu
   - Source: `/home/mike/trakrf-web/components/Header.tsx` (195 lines)
   - Links: Pricing (#pricing), FAQ (#faq), Read Tags (handheld.trakrf.id), Sign In (#signin stub)
   - Mobile hamburger menu with slide-out nav

2. **Hero** - Main heading with image
   - Source: `/home/mike/trakrf-web/components/Hero.tsx` (48 lines)
   - Copy: "Track Tags Today!" + "The RFID tracking solution..."
   - External Unsplash image (download to public/)

3. **Problem** - Customer pain points section
   - Source: `/home/mike/trakrf-web/components/Problem.tsx` (69 lines)
   - Copy: "80% of RFID projects never launch"
   - Custom Arrow SVG component

4. **FeaturesAccordion** - Interactive feature showcase
   - Source: `/home/mike/trakrf-web/components/FeaturesAccordion.tsx` (248 lines)
   - 4 features with expand/collapse functionality
   - Use vanilla JS or Alpine.js (avoid React dependency)
   - Images/SVG icons for each feature

5. **Pricing** - Pricing tiers display
   - Source: `/home/mike/trakrf-web/components/Pricing.tsx` (107 lines)
   - 3 tiers: Starter ($97), Advanced ($297, featured), Enterprise (Call)
   - **UPDATE PRICING**: Change from shipfa.st template prices to new pricing
   - Stub checkout buttons (no Stripe integration yet)

6. **FAQ** - Frequently asked questions accordion
   - Source: `/home/mike/trakrf-web/components/FAQ.tsx` (119 lines)
   - 3 hardcoded questions
   - Interactive expand/collapse (vanilla JS or Alpine.js)

7. **CTA** - Call-to-action section
   - Source: `/home/mike/trakrf-web/components/CTA.tsx` (31 lines)
   - Background image with overlay
   - "Get Started" button

8. **Footer** - Site footer with links
   - Source: `/home/mike/trakrf-web/components/Footer.tsx` (118 lines)
   - Links: Support email, Pricing, Legal pages
   - Logo + copyright

9. **Blog Pages** - 3 sample blog posts + blog index
   - Source: `/home/mike/trakrf-web/app/blog/` directory
   - Keep as simple static pages (validate multi-page Astro structure)
   - Do NOT migrate complex MDX setup - just static HTML versions

10. **Legal Pages** - Privacy Policy + Terms of Service
    - Source: `/home/mike/trakrf-web/app/privacy-policy/page.tsx`, `/app/tos/page.tsx`
    - Migrate template content with branding updates (see Content Cleanup below)

### Styling Migration

**Tailwind Configuration** (from `/home/mike/trakrf-web/tailwind.config.js`):

- Copy custom animations: opacity, appearFromRight, wiggle, popup, shimmer
- Copy custom gradient: `linear-gradient(60deg, #f79533, #f37055...)`
- Merge with existing `tailwind.config.mjs`
- Preserve all Tailwind classes exactly as-is

**Global CSS** (from `/home/mike/trakrf-web/app/globals.css`):

- Copy `.btn-gradient` class with shimmer animation
- Copy smooth scroll behavior
- Copy button capitalization override
- Merge into Astro global CSS

**DaisyUI**:

- Already configured (light/dark themes)
- Verify all DaisyUI components used: `.btn`, `.badge`, `.hero`, `.link`, `.divider`, `.collapse`

### Image Asset Migration

**Download to `public/images/`**:

1. Hero/CTA Unsplash image: `https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2...`
2. Features accordion image (if used)
3. Local logo: `/home/mike/trakrf-web/app/icon.png`
4. OpenGraph images: `opengraph-image.png`, `twitter-image.png`
5. Blog header: `/home/mike/trakrf-web/public/blog/introducing-supabase/header.png`
6. Author avatar: `/home/mike/trakrf-web/app/blog/_assets/images/authors/marc.png`

**Skip unused**:

- `how-it-works.svg` (appears unused in components)

**Use Astro Image component** for optimization where applicable

### Interactivity Strategy

**Client-side JavaScript needed for**:

- FeaturesAccordion expand/collapse
- FAQ accordion expand/collapse
- Header mobile menu toggle
- Smooth scroll to anchors (#pricing, #faq)
- Scroll-to-pricing button

**Approach**:

- Use **Alpine.js** (lightweight, Tailwind-friendly) OR vanilla JS
- Avoid React/heavy frameworks (defeats Astro static purpose)
- Keep bundle size minimal
- Progressive enhancement (works without JS for basic content)

### Content Cleanup

**Find and replace throughout all migrated content**:

- `shipfa.st` → `trakrf.id`
- `marc` (author/person references) → `TrakRF Team` (or appropriate context)
- `marc@shipfa.st` → `admin@trakrf.id`
- Any other shipfa.st template remnants → TrakRF equivalents

This applies to:

- Legal pages (Privacy Policy, Terms of Service)
- Blog posts (author references, example content)
- Footer links
- Support/contact information
- Any metadata or configuration

### Pricing Updates

**Change from template pricing to production pricing**:

- **Starter**: $97 (was $19 in template)
- **Advanced**: $297 (was $69 in template) - Keep as featured plan
- **Enterprise**: "Call" (unchanged)

Update pricing display in:

- Pricing component
- Any pricing references in copy
- Metadata/configuration if applicable

### Link Stubbing

**Stub these links** (point to placeholders):

- "Sign In" button → `#signin` (no modal, just anchor for now)
- Dashboard links → `#dashboard` (future: app.trakrf.id)
- Checkout buttons → `#checkout` (no Stripe yet)

**Active links**:

- "Read Tags" → `https://handheld.trakrf.id`
- Support email → `mailto:support@trakrf.id`
- Legal pages → `/privacy-policy`, `/tos`
- Blog → `/blog`, `/blog/[slug]`
- Hash anchors → `#pricing`, `#faq` (smooth scroll)

### Page Structure

Create Astro pages:

- `src/pages/index.astro` - Homepage (replaces Hello World)
- `src/pages/blog/index.astro` - Blog listing
- `src/pages/blog/[slug].astro` - Individual blog posts (3 posts)
- `src/pages/privacy-policy.astro` - Privacy policy
- `src/pages/tos.astro` - Terms of service

Create Astro components (in `src/components/`):

- `Header.astro`
- `Hero.astro`
- `Problem.astro`
- `FeaturesAccordion.astro` (with client:load directive if using Alpine)
- `Pricing.astro`
- `FAQ.astro` (with client:load directive if using Alpine)
- `CTA.astro`
- `Footer.astro`

### Configuration Files

**Update `astro.config.mjs`**:

- Verify no changes needed (static output already configured)

**Update `tailwind.config.mjs`**:

- Add custom animations from trakrf-web
- Add custom gradient
- Keep existing DaisyUI setup

**Create `src/styles/global.css`**:

- Import Tailwind directives
- Add custom classes from trakrf-web globals.css

## Validation Criteria

### Visual Parity

- [ ] Homepage renders identically to trakrf-web (side-by-side comparison)
- [ ] All 7 marketing sections present and styled correctly
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Images load and display correctly
- [ ] Fonts, colors, spacing match original

### Functional Parity

- [ ] FeaturesAccordion expands/collapses on click
- [ ] FAQ accordion expands/collapses on click
- [ ] Mobile menu opens/closes
- [ ] Smooth scroll to #pricing and #faq works
- [ ] All links navigate correctly (including stubs)

### Multi-Page Structure

- [ ] Blog index page lists 3 posts
- [ ] Individual blog posts accessible via /blog/[slug]
- [ ] Legal pages accessible at /privacy-policy and /tos
- [ ] Navigation between pages works

### Build & Performance

- [ ] `pnpm build` completes successfully
- [ ] Static output in dist/ contains all pages
- [ ] No console errors in browser
- [ ] Lighthouse score: 90+ performance, 100 accessibility
- [ ] Bundle size reasonable (< 100KB JS for interactivity)

### Code Quality

- [ ] All validation gates pass (lint, typecheck, build)
- [ ] No hardcoded localhost URLs
- [ ] Alt text on all images
- [ ] Semantic HTML structure

### Content Accuracy

- [ ] No shipfa.st references remain in content
- [ ] No "marc" or marc@shipfa.st references remain
- [ ] All emails use trakrf.id domain
- [ ] Pricing shows $97 Starter, $297 Advanced
- [ ] Company/product name is TrakRF throughout

## Success Metrics

- [ ] Visual parity achieved - Homepage looks identical to trakrf-web
- [ ] All interactive elements functional - Accordions, mobile menu, smooth scroll working
- [ ] Multi-page structure validated - Blog (3 posts) and legal pages accessible
- [ ] Performance targets met - Lighthouse 90+ performance, < 100KB JS bundle
- [ ] Clean migration - 0 linting errors, 0 type errors, 0 console errors

## Constraints

- **No improvements**: Copy content exactly as-is, don't edit or enhance
- **Lightweight JS**: Avoid React/Vue, use Alpine.js or vanilla JS only
- **No backend**: All static pages, no API calls, no auth
- **No Stripe**: Stub checkout buttons for now
- **MVP quality**: Functional and visually correct, not pixel-perfect

## References

- **Source codebase**: `/home/mike/trakrf-web/`
- **Components directory**: `/home/mike/trakrf-web/components/`
- **Tailwind config**: `/home/mike/trakrf-web/tailwind.config.js`
- **Global CSS**: `/home/mike/trakrf-web/app/globals.css`
- **Config file**: `/home/mike/trakrf-web/config.ts` (for copy, pricing, metadata)
- **Alpine.js docs**: https://alpinejs.dev (if choosing Alpine for interactivity)
- **Astro Image**: https://docs.astro.build/en/guides/images/

## Notes

This is a "lift and shift" migration - the goal is to get the existing content into Astro with minimal changes. The trakrf-web codebase contains shipfa.st template code that was lightly customized for MVP. We're migrating that MVP as-is to establish the Astro foundation. Content refinement and improvements will come in future specs.
