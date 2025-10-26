# Feature: TrakRF-Web Content Migration to Astro - Phase 3: Blog Placeholder & Legal Pages

## Metadata

**Type**: feature
**Depends On**: content-migration-phase2 (completed - PR #4)

## Outcome

Complete the TrakRF marketing site structure by adding a blog placeholder page and legal pages (Privacy Policy, Terms of Service) with proper content cleanup. Extract all remaining structural value from trakrf-web and achieve complete site architecture closure.

## User Story

As a visitor to trakrf.id
I want to access legal information and see that a blog is planned
So that I can understand the terms of service and know to check back for future content

## Context

**Current State (Phase 2 Complete)**:

- ✅ Complete homepage with 7 sections (all interactive)
- ✅ Alpine.js interactivity (accordions, mobile menu, smooth scroll)
- ✅ Optimized images and build pipeline
- ✅ 0 validation errors, production-ready
- ✅ Footer has legal links but pages don't exist yet

**Desired State (Phase 3)**:

- Complete site structure with all routes from trakrf-web
- Blog placeholder page at `/blog` ("Coming Soon" with Header/Footer)
- Privacy Policy and Terms of Service pages with critical cleanup
- All navigation links functional (no dead links)
- All shipfa.st/marc template references cleaned up
- Zero reason to revisit trakrf-web codebase

**Scope**: Add 3 new pages (blog placeholder, privacy policy, TOS) to complete structural migration and validate multi-page routing.

**Quality Bar**: Clean legal content, functional blog placeholder, all navigation working, complete architectural extraction from source.

**Philosophy**: Extract all structural value from trakrf-web (routes, navigation, page architecture) without migrating template sample content. Blog posts will be added later as original TrakRF content.

## Technical Requirements

### Phase Status

**Phase 1 (COMPLETE ✅)**: Static foundation - Header, Hero, Problem, Footer
**Phase 2 (COMPLETE ✅)**: Interactive components - FeaturesAccordion, Pricing, FAQ, CTA
**Phase 3 (THIS PR)**: Site structure completion - Blog placeholder + Legal pages (3 pages)

### Blog Placeholder Page (1 page)

#### 1. Blog Coming Soon Page

**File**: `src/pages/blog/index.astro`
**Source**: Structure only (no content migration - template samples)

**Requirements**:

- Simple "Coming Soon" page with Header and Footer
- Clear message that blog is planned
- Consistent styling with rest of site
- Call-to-action to check back or subscribe (optional)
- SEO metadata for blog page

**Content** (simple & clean):

```astro
<main class="flex min-h-screen items-center justify-center">
	<div class="mx-auto max-w-2xl p-8 text-center">
		<h1 class="mb-4 text-4xl font-bold">Blog Coming Soon</h1>
		<p class="mb-8 text-lg opacity-80">
			We're working on great content about RFID tracking, tag management, and more. Check back soon!
		</p>
		<a href="/" class="btn btn-primary">Back to Home</a>
	</div>
</main>
```

**Why Placeholder Instead of Sample Posts**:

- ✅ trakrf-web blog posts are ShipFast template samples ("Introducing Supabase to ShipFast")
- ✅ Not relevant to TrakRF (RFID tracking product)
- ✅ Future blog will have original TrakRF content
- ✅ Placeholder reserves route and sets expectations
- ✅ Avoids migrating irrelevant template content

**What This Achieves**:

- ✅ `/blog` route exists and works
- ✅ Footer blog link functional (no dead link)
- ✅ Professional "under construction" message
- ✅ Multi-page routing validated
- ✅ Blog infrastructure ready for real content

### Legal Pages (2 pages)

#### 2. Privacy Policy Page

**File**: `src/pages/privacy-policy.astro`
**Source**: `/home/mike/trakrf-web/app/privacy-policy/page.tsx`

**Requirements**:

- Full privacy policy text
- Consistent layout with Header and Footer
- Table of contents (if present in source)
- Last updated date
- SEO metadata

**Content Cleanup** (CRITICAL - Found in Source Audit):

- Replace ALL `shipfa.st` → `trakrf.id`
- ❌❌❌ Line 100: `marc@trakrf.id` → `support@trakrf.id` (CRITICAL ERROR IN SOURCE)
- Remove ChatGPT prompt comments (lines 5-26)
- Update "Last Updated" date to actual migration date
- Verify all contact information

#### 3. Terms of Service Page

**File**: `src/pages/tos.astro`
**Source**: `/home/mike/trakrf-web/app/tos/page.tsx`

**Requirements**:

- Full terms of service text
- Consistent layout with Header and Footer
- Numbered sections (if present in source)
- Last updated date
- SEO metadata

**Content Cleanup** (CRITICAL - Found in Source Audit):

- ❌❌❌ Line 90: `marc@shipfa.st` → `support@trakrf.id` (CRITICAL ERROR IN SOURCE - NOT FIXED!)
- Replace ALL `shipfa.st` → `trakrf.id`
- Remove ChatGPT prompt comments (lines 5-26)
- Update "Last Updated" date to actual migration date
- Ensure pricing references match current ($97 Starter, $297 Advanced)
- Update all contact/support information
- Fix "Governing Law: France" if incorrect for TrakRF

### Content Cleanup Requirements (Legal Pages Only)

**CRITICAL ISSUES FOUND IN SOURCE AUDIT** (must fix):

| Line  | File                    | Find             | Replace             | Priority        |
| ----- | ----------------------- | ---------------- | ------------------- | --------------- |
| 90    | tos/page.tsx            | `marc@shipfa.st` | `support@trakrf.id` | ❌❌❌ CRITICAL |
| 100   | privacy-policy/page.tsx | `marc@trakrf.id` | `support@trakrf.id` | ❌❌ HIGH       |
| 5-26  | Both                    | ChatGPT comments | (delete)            | ⚠️ MEDIUM       |
| 60,25 | Both                    | Old dates        | Current date        | ⚠️ MEDIUM       |

**MANDATORY find/replace across legal content**:

| Find             | Replace             | Context                  |
| ---------------- | ------------------- | ------------------------ |
| `shipfa.st`      | `trakrf.id`         | Domain references        |
| `ShipFast`       | `TrakRF`            | Product name             |
| `marc@shipfa.st` | `support@trakrf.id` | Email (TOS line 90)      |
| `marc@trakrf.id` | `support@trakrf.id` | Email (Privacy line 100) |

**Manual review needed**:

- "Governing Law: France" (may not apply to TrakRF)
- Company legal entity name
- Refund policy (7 days mentioned)
- Boilerplate language accuracy

### Image Asset Migration

**No images needed for Phase 3**:

- Blog placeholder: No images
- Legal pages: Text-only pages
- All homepage images already migrated (Phases 1 & 2)

### Navigation Updates

**Footer Already Has Links** (`src/components/Footer.astro`):

- ✅ Blog link: Currently missing - **ADD IT**: `/blog`
- ✅ Privacy policy link: Already present (line 56) - `/privacy-policy`
- ✅ Terms of service link: Already present (line 55) - `/tos`

**Action Required**:

- Add blog link to Footer LINKS section (alongside Support and Pricing)
- No header nav changes needed (blog not in main nav on trakrf-web)

### Page Layout & Structure

**Create Layout Component** (optional but recommended):
`src/layouts/BaseLayout.astro`

**Purpose**: DRY principle for common page structure
**Includes**: Header, Footer, SEO metadata, global styles
**Used by**: All blog and legal pages

**Alternative**: Copy Header/Footer imports to each page (simpler, fewer abstractions)

### SEO Metadata

**Each page needs**:

- `<title>` tag (unique per page)
- `<meta name="description">` (unique per page)
- OpenGraph tags (og:title, og:description, og:image)
- Twitter Card tags
- Canonical URL

**Example** (Blog Post):

```astro
---
const title = 'Introducing Supabase - TrakRF Blog';
const description = 'Learn how we integrated Supabase...';
const ogImage = '/images/blog/introducing-supabase/header.png';
---

<head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<!-- etc -->
</head>
```

### Routing Validation

**Test multi-page navigation**:

- Homepage → Blog index
- Blog index → Individual post
- Blog post → Back to blog
- Footer → Privacy Policy
- Footer → Terms of Service
- All pages → Header links work

**URL structure**:

- `/` - Homepage
- `/blog` - Blog index
- `/blog/introducing-supabase` - Blog post
- `/privacy-policy` - Privacy policy
- `/tos` - Terms of service

## Validation Criteria

### Multi-Page Structure

- [ ] Blog placeholder page accessible at `/blog`
- [ ] Privacy policy accessible at `/privacy-policy`
- [ ] Terms of service accessible at `/tos`
- [ ] All pages use consistent Header/Footer
- [ ] Navigation between pages works smoothly
- [ ] Blog placeholder has clear "Coming Soon" message

### Content Accuracy (Legal Pages)

- [ ] CRITICAL: TOS line 90 fixed (`marc@shipfa.st` → `support@trakrf.id`)
- [ ] CRITICAL: Privacy line 100 fixed (`marc@trakrf.id` → `support@trakrf.id`)
- [ ] No `shipfa.st` references remain
- [ ] All emails use `support@trakrf.id`
- [ ] Company/product name is `TrakRF` throughout
- [ ] ChatGPT prompt comments removed
- [ ] "Last Updated" dates current

### Visual Parity

- [ ] Blog placeholder looks professional and clean
- [ ] Legal pages match trakrf-web formatting
- [ ] Consistent Header/Footer across all pages
- [ ] Responsive design works (mobile, tablet, desktop)

### SEO & Metadata

- [ ] Each page has unique title and description
- [ ] OpenGraph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] Canonical URLs set correctly
- [ ] No broken meta tags or duplicate content

### Build & Performance

- [ ] `pnpm build` completes successfully
- [ ] All 3 new pages generated in dist/ (blog, privacy-policy, tos)
- [ ] No console errors in browser
- [ ] Page load times reasonable
- [ ] Static site remains lightweight

### Code Quality

- [ ] All validation gates pass (lint, typecheck, build)
- [ ] No hardcoded localhost URLs
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] No console.log statements

### Navigation & Links

- [ ] Footer blog link added and works
- [ ] Footer privacy/TOS links work
- [ ] Blog placeholder "Back to Home" button works
- [ ] Legal pages "Back" button works
- [ ] All navigation tested from every page

## Success Metrics

**Phase 3 Targets**:

- [ ] **Site structure complete** - All routes from trakrf-web exist (homepage, blog, legal)
- [ ] **Content cleanup complete** - Critical fixes (marc@ emails), 0 shipfa.st references
- [ ] **Navigation complete** - All footer/header links functional, no dead links
- [ ] **Routing validated** - Multi-page navigation works flawlessly
- [ ] **Structural extraction complete** - Zero reason to revisit trakrf-web codebase

**Phase 3 Success Rate**: 100% of structural migration objectives

**Overall Project Status**:

- ✅ Phase 1: Static foundation (4 components) - COMPLETE
- ✅ Phase 2: Interactive components (4 components + JS) - COMPLETE
- 🎯 Phase 3: Site structure completion (3 pages: blog placeholder + legal) - THIS PR

**Migration Completion**:

- ✅ 8/8 homepage components migrated
- ✅ All navigation routes established
- ✅ All legal requirements met
- ✅ Site architecture 100% extracted from trakrf-web
- 🎯 Ready for original content creation (future blog posts)

## Constraints

- **No sample content migration**: Blog posts are ShipFast templates, not TrakRF content
- **Placeholder only**: Blog route exists but no sample posts
- **Legal cleanup critical**: Must fix marc@ email errors in source
- **No backend**: All static pages, no dynamic routing
- **Structural focus**: Extract architecture, not template content
- **Clean break**: After Phase 3, never need to reference trakrf-web again

## References

- **Source codebase**: `/home/mike/trakrf-web/`
- **Blog directory**: `/home/mike/trakrf-web/app/blog/`
- **Legal pages**: `/home/mike/trakrf-web/app/privacy-policy/`, `/app/tos/`
- **Astro Pages**: https://docs.astro.build/en/core-concepts/astro-pages/
- **Astro Routing**: https://docs.astro.build/en/core-concepts/routing/
- **Original spec**: Git history `7e92803:spec/content-migration/spec.md`

## Notes

**Phase 3 Focus**: This phase completes the structural migration by extracting all remaining architectural value from trakrf-web. The goal is to establish all routes, fix critical legal content errors, and achieve complete closure on the migration project.

**Why Blog Placeholder Instead of Sample Posts**:

- trakrf-web blog contains ShipFast template samples ("Introducing Supabase to ShipFast")
- Not relevant to TrakRF's RFID tracking product
- Future blog will feature original TrakRF content (tutorials, case studies, updates)
- Placeholder reserves route and sets professional expectations
- Avoids wasted effort migrating irrelevant template content

**Critical Legal Cleanup**:

- Source code has `marc@shipfa.st` still present in TOS (line 90) - MUST FIX
- Source code has `marc@trakrf.id` in Privacy (line 100) - should be `support@`
- These are production-blocking errors that must be corrected

**The "Squeeze All the Juice" Principle**:

- ✅ Extract: Site architecture (routes, navigation, page structure)
- ✅ Extract: Legal page structure and layout
- ✅ Extract: Multi-page routing patterns
- ❌ Leave behind: Template sample content (blog posts about ShipFast integrations)
- ❌ Leave behind: Sample blog authors/categories/images

**Post-Phase 3 Completeness**:
After this phase ships:

- ✅ Every meaningful route from trakrf-web exists in new site
- ✅ All navigation links functional
- ✅ Legal pages production-ready with cleaned content
- ✅ Blog infrastructure ready for real content
- ✅ Zero structural debt
- ✅ **trakrf-web can be archived - migration complete**

Future work is purely additive (new TrakRF blog posts), not rework.

**Deployment Ready**: After Phase 3 ships, the marketing site is 100% structurally complete and production-ready. Blog posts can be added incrementally without touching site structure.
