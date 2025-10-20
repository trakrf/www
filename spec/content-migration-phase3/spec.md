# Feature: TrakRF-Web Content Migration to Astro - Phase 3: Blog & Legal Pages

## Metadata

**Type**: feature
**Depends On**: content-migration-phase2 (completed - PR #4)

## Outcome

Complete the TrakRF marketing site by adding blog pages (3 posts + index) and legal pages (Privacy Policy, Terms of Service) with proper content cleanup and multi-page routing validation.

## User Story

As a visitor to trakrf.id
I want to read blog posts and access legal information
So that I can learn more about TrakRF and understand the terms of service

## Context

**Current State (Phase 2 Complete)**:
- ✅ Complete homepage with 7 sections (all interactive)
- ✅ Alpine.js interactivity (accordions, mobile menu, smooth scroll)
- ✅ Optimized images and build pipeline
- ✅ 0 validation errors, production-ready

**Desired State (Phase 3)**:
- Complete multi-page structure with blog and legal pages
- Blog index listing 3 sample posts
- 3 individual blog post pages with proper routing
- Privacy Policy and Terms of Service pages
- All shipfa.st template references cleaned up
- Footer links active (currently some are stubbed)

**Scope**: Add 5 new pages (blog index, 3 blog posts, 2 legal pages) and validate Astro's multi-page routing works correctly.

**Quality Bar**: Content migrated as-is from trakrf-web, template references cleaned up, multi-page navigation functional.

## Technical Requirements

### Phase Status

**Phase 1 (COMPLETE ✅)**: Static foundation - Header, Hero, Problem, Footer
**Phase 2 (COMPLETE ✅)**: Interactive components - FeaturesAccordion, Pricing, FAQ, CTA
**Phase 3 (THIS PR)**: Multi-page structure - Blog (4 pages) + Legal (2 pages)

### Blog Pages (4 pages total)

#### 1. Blog Index Page

**File**: `src/pages/blog/index.astro`
**Source**: `/home/mike/trakrf-web/app/blog/page.tsx`

**Requirements**:
- List 3 blog posts with title, excerpt, date, author
- Each post links to `/blog/[slug]`
- Use consistent layout with Header and Footer
- Responsive card grid (1 column mobile, 2-3 columns desktop)
- SEO metadata for blog index

**Content**:
- Page title: "Blog - TrakRF"
- Heading: "Latest from TrakRF" (or similar from source)
- 3 posts: "Introducing Supabase", "Introducing Stripe", "Introducing Mailgun" (or actual posts from trakrf-web)

#### 2. Individual Blog Post Pages (3 posts)

**Files**:
- `src/pages/blog/introducing-supabase.astro`
- `src/pages/blog/introducing-stripe.astro`
- `src/pages/blog/introducing-mailgun.astro`

**Source**: `/home/mike/trakrf-web/app/blog/[article]/page.tsx` (and individual article directories)

**Requirements**:
- Full blog post content with title, date, author, body
- Header image (if available)
- Consistent layout with Header and Footer
- Back to blog index link
- SEO metadata for each post (title, description, OG image)

**Content Migration**:
- Copy HTML/text content exactly as-is
- Download header images to `public/images/blog/[slug]/`
- Author avatar to `public/images/authors/`
- Apply content cleanup (see below)

**Simplification**:
- **NO MDX**: Convert to simple Astro pages with inline HTML
- **NO complex routing**: Static file-based routing only
- Keep it simple - just migrated content in Astro templates

### Legal Pages (2 pages)

#### 3. Privacy Policy Page

**File**: `src/pages/privacy-policy.astro`
**Source**: `/home/mike/trakrf-web/app/privacy-policy/page.tsx`

**Requirements**:
- Full privacy policy text
- Consistent layout with Header and Footer
- Table of contents (if present in source)
- Last updated date
- SEO metadata

**Content Cleanup** (CRITICAL):
- Replace ALL `shipfa.st` → `trakrf.id`
- Replace `marc@shipfa.st` → `support@trakrf.id`
- Replace company name references appropriately
- Update contact information

#### 4. Terms of Service Page

**File**: `src/pages/tos.astro`
**Source**: `/home/mike/trakrf-web/app/tos/page.tsx`

**Requirements**:
- Full terms of service text
- Consistent layout with Header and Footer
- Numbered sections (if present in source)
- Last updated date
- SEO metadata

**Content Cleanup** (CRITICAL):
- Same replacements as Privacy Policy
- Ensure pricing references match current ($97 Starter, $297 Advanced)
- Update all contact/support information

### Content Cleanup Requirements

**MANDATORY find/replace across ALL blog and legal content**:

| Find | Replace | Context |
|------|---------|---------|
| `shipfa.st` | `trakrf.id` | Domain references |
| `ShipFast` | `TrakRF` | Product name |
| `marc` | `TrakRF Team` | Author references (blog) |
| `marc@shipfa.st` | `support@trakrf.id` | Email addresses |
| `Marc Lou` | `TrakRF Team` | Author name |
| Template pricing | Actual pricing | If mentioned in legal |

**Manual review needed**:
- Any hardcoded URLs
- Social media links
- Support/contact information
- Company legal entity name (if different from product)

### Image Asset Migration

**Blog Images** (download to `public/images/blog/`):
- `/home/mike/trakrf-web/public/blog/introducing-supabase/header.png` (if exists)
- Any other blog post header images

**Author Images** (download to `public/images/authors/`):
- `/home/mike/trakrf-web/app/blog/_assets/images/authors/marc.png` → `trakrf-team.png`
- Use Astro Image component for optimization

**Legal Pages**:
- No images expected (text-only pages)

### Navigation Updates

**Update Footer** (`src/components/Footer.astro`):
- Activate blog link: `/blog`
- Activate privacy policy link: `/privacy-policy`
- Activate terms of service link: `/tos`
- Verify all links are no longer stubs

**Update Header** (if blog link exists):
- Add blog link to main nav (optional, check source)

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
const title = "Introducing Supabase - TrakRF Blog";
const description = "Learn how we integrated Supabase...";
const ogImage = "/images/blog/introducing-supabase/header.png";
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
- [ ] Blog index page accessible at `/blog`
- [ ] 3 blog posts accessible at `/blog/[slug]`
- [ ] Privacy policy accessible at `/privacy-policy`
- [ ] Terms of service accessible at `/tos`
- [ ] All pages use consistent Header/Footer
- [ ] Navigation between pages works smoothly

### Content Accuracy
- [ ] No `shipfa.st` references remain in content
- [ ] No `marc` or `marc@shipfa.st` references remain
- [ ] All emails use `trakrf.id` domain
- [ ] Company/product name is `TrakRF` throughout
- [ ] Author attribution is `TrakRF Team` (blog posts)

### Visual Parity
- [ ] Blog index matches trakrf-web styling
- [ ] Blog posts match trakrf-web layout
- [ ] Legal pages match trakrf-web formatting
- [ ] Header images display correctly (blog)
- [ ] Responsive design works (mobile, tablet, desktop)

### SEO & Metadata
- [ ] Each page has unique title and description
- [ ] OpenGraph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] Canonical URLs set correctly
- [ ] No broken meta tags or duplicate content

### Build & Performance
- [ ] `pnpm build` completes successfully
- [ ] All 6 pages generated in dist/
- [ ] No console errors in browser
- [ ] Images optimized by Astro
- [ ] Page load times reasonable

### Code Quality
- [ ] All validation gates pass (lint, typecheck, build)
- [ ] No hardcoded localhost URLs
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] No console.log statements

### Navigation & Links
- [ ] Footer blog link works
- [ ] Footer privacy/TOS links work
- [ ] Blog index → post links work
- [ ] Blog post → back to index works
- [ ] Header links work from all pages

## Success Metrics

**Phase 3 Targets**:
- [ ] **Multi-page structure complete** - 6 pages total (blog index, 3 posts, 2 legal)
- [ ] **Content cleanup complete** - 0 shipfa.st references, all TrakRF branding
- [ ] **Routing validated** - All navigation works, no broken links
- [ ] **SEO optimized** - All pages have proper metadata
- [ ] **Visual parity** - Matches trakrf-web appearance

**Phase 3 Success Rate**: 100% of multi-page deliverables

**Overall Project Status**:
- ✅ Phase 1: Static foundation (4 components) - COMPLETE
- ✅ Phase 2: Interactive components (4 components + JS) - COMPLETE
- 🎯 Phase 3: Multi-page structure (6 pages) - THIS PR

## Constraints

- **No improvements**: Copy content exactly as-is, don't edit or enhance
- **No MDX complexity**: Keep blog posts as simple Astro pages
- **No backend**: All static pages, no dynamic routing
- **No comments**: No blog post comments or interactions
- **MVP quality**: Functional and content-accurate, not pixel-perfect

## References

- **Source codebase**: `/home/mike/trakrf-web/`
- **Blog directory**: `/home/mike/trakrf-web/app/blog/`
- **Legal pages**: `/home/mike/trakrf-web/app/privacy-policy/`, `/app/tos/`
- **Astro Pages**: https://docs.astro.build/en/core-concepts/astro-pages/
- **Astro Routing**: https://docs.astro.build/en/core-concepts/routing/
- **Original spec**: Git history `7e92803:spec/content-migration/spec.md`

## Notes

**Phase 3 Focus**: This phase completes the full content migration with multi-page structure. The goal is to validate Astro's routing works correctly and clean up all template references for a production-ready marketing site.

**Content Source**: The trakrf-web codebase contains shipfa.st template blog posts and legal pages. We're migrating those as-is but cleaning up all template references (shipfa.st → trakrf.id).

**Simplification Strategy**: Unlike the original Next.js site which may use complex MDX or dynamic routing, we're keeping this simple with static file-based Astro pages. Each blog post is a separate .astro file.

**Post-Phase 3**: After this phase, the marketing site will be 100% complete with homepage, blog, and legal pages. Future work might include:
- Actual blog content (replace template posts)
- Blog pagination (if many posts)
- Blog categories/tags
- Search functionality
- Newsletter signup

**Deployment Ready**: After Phase 3 ships, the site is fully production-ready and can be deployed to Cloudflare Pages.
