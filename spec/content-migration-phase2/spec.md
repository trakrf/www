# Feature: TrakRF-Web Content Migration to Astro - Phase 2: Interactive Components

## Metadata

**Type**: feature
**Depends On**: content-migration Phase 1 (completed - PR #3)

## Outcome

Add interactive marketing components to complete the homepage: FeaturesAccordion, Pricing, FAQ, and CTA sections with functional interactivity (accordions, mobile menu, smooth scrolling).

## User Story

As a visitor to trakrf.id
I want to interact with the marketing content (expand features, read FAQs, see pricing)
So that I can learn about TrakRF's capabilities and make informed decisions

## Context

**Current State (Phase 1 Complete)**:

- ✅ Static homepage with 4 components: Header, Hero, Problem, Footer
- ✅ Tailwind config with custom animations
- ✅ Global CSS with .btn-gradient class
- ✅ Optimized image assets (hero, logo, social cards)
- ✅ SEO metadata (OpenGraph, Twitter Card)

**Desired State (Phase 2)**:

- Complete homepage with all 7 sections
- Interactive accordions (Features, FAQ)
- Mobile menu functionality
- Smooth scroll to hash anchors (#pricing, #faq)
- Lightweight JavaScript (Alpine.js or vanilla JS)

**Scope**: Complete the homepage with 4 remaining interactive components. Blog and legal pages deferred to Phase 3.

**Quality Bar**: Visual parity with trakrf-web, functional interactivity, minimal JS bundle (< 100KB)

## Technical Requirements

### Phase Status

**Phase 1 (COMPLETE ✅)**:

1. ✅ **Header** - Navigation with logo, desktop nav (mobile menu HTML stubbed)
2. ✅ **Hero** - Main heading with optimized image
3. ✅ **Problem** - 3-step customer journey with SVG arrows
4. ✅ **Footer** - Site footer with links and copyright

**Phase 2 (THIS PR)**: 4. **FeaturesAccordion** - Interactive feature showcase

- Source: `/home/mike/trakrf-web/components/FeaturesAccordion.tsx` (248 lines)
- 4 features with expand/collapse functionality
- Use vanilla JS or Alpine.js (avoid React dependency)
- Images/SVG icons for each feature
- Progressive enhancement (shows all content if JS disabled)

5. **Pricing** - Pricing tiers display
   - Source: `/home/mike/trakrf-web/components/Pricing.tsx` (107 lines)
   - 3 tiers: Starter ($97), Advanced ($297, featured), Enterprise (Call)
   - Stub checkout buttons (no Stripe integration yet)
   - Responsive card layout

6. **FAQ** - Frequently asked questions accordion
   - Source: `/home/mike/trakrf-web/components/FAQ.tsx` (119 lines)
   - 3 hardcoded questions
   - Interactive expand/collapse (vanilla JS or Alpine.js)
   - Progressive enhancement

7. **CTA** - Call-to-action section
   - Source: `/home/mike/trakrf-web/components/CTA.tsx` (31 lines)
   - Background image with overlay (reuse hero.jpg or download CTA-specific image)
   - "Get Started" button
   - Eye-catching design to drive conversions

**Phase 3 (FUTURE)**:

- Blog Pages (3 sample posts + blog index)
- Legal Pages (Privacy Policy, Terms of Service)
- Content cleanup (shipfa.st → trakrf.id references in blog/legal)

### Interactivity Requirements

**Client-side JavaScript needed for**:

1. FeaturesAccordion expand/collapse
2. FAQ accordion expand/collapse
3. Header mobile menu toggle (enable the stubbed menu from Phase 1)
4. Smooth scroll to anchors (#pricing, #faq)
5. Optional: Scroll-to-pricing button behavior

**Technology Decision**:

- **Option A**: Alpine.js (lightweight, Tailwind-friendly, declarative)
  - Pros: Minimal JS (15KB gzipped), declarative syntax, easy to maintain
  - Cons: New dependency
- **Option B**: Vanilla JS (no dependencies)
  - Pros: Zero dependencies, full control
  - Cons: More code to write, less declarative

**Approach**:

- Keep bundle size minimal (< 100KB total)
- Progressive enhancement (works without JS for basic content)
- Avoid React/Vue/heavy frameworks
- Use Astro's `client:load` or `client:visible` directives appropriately

### Styling Requirements

**Already Complete (Phase 1)**:

- ✅ Tailwind config with 5 custom animations
- ✅ Global CSS with `.btn-gradient` class
- ✅ DaisyUI configured (light/dark themes)

**Phase 2 Additions**:

- Verify accordion transition styles work with chosen JS approach
- Ensure pricing card hover effects preserved
- Maintain responsive design (mobile, tablet, desktop)

### Image Asset Requirements

**Already Downloaded (Phase 1)**:

- ✅ Hero image (hero.jpg - 769KB optimized to 261KB)
- ✅ Logo (icon.png)
- ✅ Social cards (opengraph-image.png, twitter-image.png)

**Phase 2 Assets**:

- CTA background image (may reuse hero.jpg or download new)
- Features accordion icons/images (check if needed from trakrf-web)

**Optional Enhancement**:

- **Social Media Card Redesign**: Current cards are gradient + text (created in Phase 1). If time permits, improve design with:
  - Better brand alignment (colors, typography)
  - Logo placement and sizing
  - Professional layout for social sharing
  - Proper 1200x630px dimensions maintained
  - _Note: This is optional - current cards are functional_

### Component Integration

**Update Homepage (`src/pages/index.astro`)**:

- Import 4 new components (FeaturesAccordion, Pricing, FAQ, CTA)
- Insert in proper order: Header → Hero → Problem → **FeaturesAccordion** → **Pricing** → **FAQ** → **CTA** → Footer
- Ensure proper spacing and section breaks

**Update Header (`src/components/Header.astro`)**:

- Enable mobile menu functionality (currently stubbed)
- Add click handlers for menu open/close
- Test mobile menu on small screens

### Content Requirements

**Pricing Tiers** (from spec - ALREADY CORRECT PRICING):

- **Starter**: $97
- **Advanced**: $297 (featured)
- **Enterprise**: "Call"

**FAQ Content**:

- Migrate 3 questions from trakrf-web/components/FAQ.tsx
- Preserve exact copy (no improvements)

**Features Content**:

- Migrate 4 features from trakrf-web/components/FeaturesAccordion.tsx
- Preserve exact copy, icons, and descriptions

**CTA Copy**:

- Migrate from trakrf-web/components/CTA.tsx
- Preserve exact copy and button text

### Link Behavior

**Stub these links** (point to placeholders):

- "Sign In" button → `#signin` (no modal)
- Checkout buttons → `#checkout` (no Stripe yet)

**Active links**:

- "Read Tags" → `https://handheld.trakrf.id`
- Support email → `mailto:support@trakrf.id`
- Hash anchors → `#pricing`, `#faq` (smooth scroll - IMPLEMENT IN PHASE 2)

**Test smooth scroll**:

- Clicking "Pricing" in header should smooth scroll to #pricing
- Clicking "FAQ" in header should smooth scroll to #faq

## Validation Criteria

### Visual Parity (Phase 2 Scope)

- [ ] Homepage has all 7 sections in correct order
- [ ] FeaturesAccordion matches trakrf-web styling
- [ ] Pricing cards match trakrf-web layout and design
- [ ] FAQ section matches trakrf-web styling
- [ ] CTA section matches trakrf-web background and overlay
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Fonts, colors, spacing match original

### Functional Parity (Phase 2 Scope)

- [ ] FeaturesAccordion expands/collapses on click
- [ ] FAQ accordion expands/collapses on click
- [ ] Mobile menu opens/closes (enable stubbed menu from Phase 1)
- [ ] Smooth scroll to #pricing works
- [ ] Smooth scroll to #faq works
- [ ] All links navigate correctly (including stubs)
- [ ] Progressive enhancement: content visible without JS

### Build & Performance

- [ ] `pnpm build` completes successfully
- [ ] Static output in dist/ contains homepage
- [ ] No console errors in browser
- [ ] JS bundle size < 100KB
- [ ] Lighthouse score: 90+ performance, 100 accessibility
- [ ] Images optimized by Astro

### Code Quality

- [ ] All validation gates pass (lint, typecheck, build)
- [ ] No console.log statements
- [ ] No TODO comments (or marked for Phase 3)
- [ ] Alt text on all images
- [ ] Semantic HTML structure
- [ ] Accessible (keyboard navigation, ARIA labels where needed)

## Success Metrics

**Phase 2 Targets**:

- [ ] **Complete homepage** - All 7 sections present and functional
- [ ] **Interactive elements functional** - Accordions, mobile menu, smooth scroll working
- [ ] **Performance targets met** - Lighthouse 90+, JS bundle < 100KB
- [ ] **Clean migration** - 0 lint errors, 0 type errors, 0 console errors
- [ ] **Visual parity** - Homepage matches trakrf-web appearance

**Phase 2 Success Rate**: 100% of Phase 2 deliverables (4 components + interactivity)

**Overall Project Status**:

- ✅ Phase 1: Static foundation (4 components) - COMPLETE
- 🎯 Phase 2: Interactive components (4 components + JS) - THIS PR
- ⏳ Phase 3: Multi-page structure (blog, legal) - FUTURE

## Constraints

- **No improvements**: Copy content exactly as-is, don't edit or enhance
- **Lightweight JS**: Avoid React/Vue, use Alpine.js or vanilla JS only
- **No backend**: All static pages, no API calls, no auth
- **No Stripe**: Stub checkout buttons for now
- **No blog/legal pages yet**: Deferred to Phase 3
- **MVP quality**: Functional and visually correct, not pixel-perfect

## References

- **Source codebase**: `/home/mike/trakrf-web/`
- **Components directory**: `/home/mike/trakrf-web/components/`
- **Tailwind config**: `/home/mike/trakrf-web/tailwind.config.js`
- **Global CSS**: `/home/mike/trakrf-web/app/globals.css`
- **Alpine.js docs**: https://alpinejs.dev (if choosing Alpine)
- **Astro interactivity**: https://docs.astro.build/en/guides/client-side-scripts/
- **Phase 1 PR**: https://github.com/trakrf/www/pull/3
- **Phase 1 SHIPPED entry**: `spec/SHIPPED.md`

## Notes

**Phase 2 Focus**: This phase completes the homepage with interactive components. The goal is to achieve visual and functional parity with the trakrf-web homepage, making it ready for production deployment.

**Technical Decision Needed**: Choose Alpine.js vs vanilla JS for interactivity. Alpine.js recommended for faster development and cleaner code, but vanilla JS is viable for minimal dependencies.

**Content Preservation**: This is still a "lift and shift" migration. Copy all content exactly from trakrf-web without improvements. The trakrf-web codebase contains shipfa.st template code that was lightly customized for MVP. We're migrating that MVP as-is.

**Phase 3 Preview**: After Phase 2, the homepage will be complete and deployable. Phase 3 will add blog posts and legal pages to complete the full site structure.

**Social Media Cards**: Current gradient cards are functional. Optional improvement task if time permits during implementation.
