# Implementation Plan: TrakRF-Web Content Migration - Phase 3

Generated: 2025-10-20
Specification: spec.md

## Understanding

Phase 3 completes the TrakRF marketing site structural migration by adding:
1. **Blog placeholder page** - "Coming Soon" page at `/blog` (not migrating template sample posts)
2. **Privacy Policy page** - Full legal text with critical email cleanup (`marc@trakrf.id` → `support@trakrf.id`)
3. **Terms of Service page** - Full legal text with critical email cleanup (`marc@shipfa.st` → `support@trakrf.id`) and governing law change (France → USA)

This achieves complete closure on the trakrf-web migration by extracting all remaining structural value (routes, navigation, page architecture) without migrating irrelevant template content. After this phase, there's zero reason to revisit the trakrf-web codebase.

**Philosophy**: "Squeeze all the juice" - extract structure, not content.

## Relevant Files

**Reference Patterns** (existing code to follow):

- `src/pages/index.astro` (lines 1-69) - Page structure with Header/Footer, SEO metadata pattern
- `src/components/Header.astro` - Header component to import
- `src/components/Footer.astro` (lines 34-44) - LINKS section where blog link should be added
- `src/styles/global.css` - Global styles already available

**Files to Create**:

- `src/layouts/BaseLayout.astro` - Reusable page layout with Header, Footer, SEO (DRY principle)
- `src/pages/blog/index.astro` - Blog placeholder "Coming Soon" page
- `src/pages/privacy-policy.astro` - Privacy policy with cleaned content
- `src/pages/tos.astro` - Terms of service with cleaned content

**Files to Modify**:

- `src/components/Footer.astro` (lines 34-44) - Add blog link to LINKS section

**Source Files** (reference only, not modified):

- `/home/mike/trakrf-web/app/privacy-policy/page.tsx` (lines 60-104) - Privacy policy content
- `/home/mike/trakrf-web/app/tos/page.tsx` (lines 60-92) - TOS content

## Architecture Impact

- **Subsystems affected**: Pages/Routing (static pages only)
- **New dependencies**: None
- **Breaking changes**: None

## Task Breakdown

### Task 1: Create BaseLayout Component

**File**: `src/layouts/BaseLayout.astro`
**Action**: CREATE
**Pattern**: Reference `src/pages/index.astro` lines 1-39 for HTML structure and SEO metadata

**Implementation**:

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = '/images/opengraph-image.png' } = Astro.props;
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
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- Alpine.js (for Header mobile menu) -->
    <script is:inline defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    <Header />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Validation**:
```bash
pnpm lint
pnpm typecheck
pnpm build
```

### Task 2: Create Blog Placeholder Page

**File**: `src/pages/blog/index.astro`
**Action**: CREATE
**Pattern**: Use BaseLayout.astro with centered content

**Implementation**:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

const title = 'Blog - TrakRF';
const description = 'TrakRF blog coming soon - RFID tracking insights, tutorials, and updates';
---

<BaseLayout title={title} description={description}>
  <div class="flex min-h-screen items-center justify-center">
    <div class="mx-auto max-w-2xl p-8 text-center">
      <h1 class="mb-4 text-4xl font-bold">Blog Coming Soon</h1>
      <p class="mb-8 text-lg opacity-80">
        We're working on great content about RFID tracking, tag management, and more.
        Check back soon!
      </p>
      <a href="/" class="btn btn-primary">Back to Home</a>
    </div>
  </div>
</BaseLayout>
```

**Validation**:
```bash
pnpm lint
pnpm typecheck
pnpm build
# Verify dist/blog/index.html exists
```

### Task 3: Create Privacy Policy Page

**File**: `src/pages/privacy-policy.astro`
**Action**: CREATE
**Source**: `/home/mike/trakrf-web/app/privacy-policy/page.tsx` lines 60-104

**Critical Cleanup** (inline during migration):
- ❌ Line 100: `marc@trakrf.id` → `support@trakrf.id` (CRITICAL)
- ❌ Line 60: Update date from `2023-08-25` to `2025-10-20`
- ❌ Remove ChatGPT comments (lines 5-26 from source - don't migrate)

**Implementation**:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = 'Privacy Policy - TrakRF';
const description = 'Privacy policy for TrakRF - how we collect, use, and protect your information';
---

<BaseLayout title={title} description={description}>
  <div class="mx-auto max-w-3xl px-8 py-24">
    <a href="/" class="btn btn-ghost mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
          clip-rule="evenodd"
        ></path>
      </svg>
      Back
    </a>

    <h1 class="mb-6 text-3xl font-extrabold">Privacy Policy for TrakRF</h1>

    <div class="whitespace-pre-wrap font-sans leading-relaxed">
Last Updated: 2025-10-20

Thank you for visiting TrakRF ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our website located at https://trakrf.id (the "Website").

By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Website.

1. Information We Collect

1.1 Personal Data

We collect the following personal information from you:

Name: We collect your name to personalize your experience and communicate with you effectively.
Email: We collect your email address to send you important information regarding your orders, updates, and communication.
Payment Information: We collect payment details to process your orders securely. However, we do not store your payment information on our servers. Payments are processed by trusted third-party payment processors.

1.2 Non-Personal Data

We may use web cookies and similar technologies to collect non-personal information such as your IP address, browser type, device information, and browsing patterns. This information helps us to enhance your browsing experience, analyze trends, and improve our services.

2. Purpose of Data Collection

We collect and use your personal data for the sole purpose of order processing. This includes processing your orders, sending order confirmations, providing customer support, and keeping you updated about the status of your orders.

3. Data Sharing

We do not share your personal data with any third parties except as required for order processing (e.g., sharing your information with payment processors). We do not sell, trade, or rent your personal information to others.

4. Children's Privacy

TrakRF is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at the email address provided below.

5. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page, and we may notify you via email about significant changes.

6. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:

Email: support@trakrf.id

For all other inquiries, please visit our Contact Us page on the Website.

By using TrakRF, you consent to the terms of this Privacy Policy.
    </div>
  </div>
</BaseLayout>
```

**Validation**:
```bash
pnpm lint
pnpm typecheck
pnpm build
# Verify dist/privacy-policy/index.html exists
# Verify support@trakrf.id appears in content (not marc@)
```

### Task 4: Create Terms of Service Page

**File**: `src/pages/tos.astro`
**Action**: CREATE
**Source**: `/home/mike/trakrf-web/app/tos/page.tsx` lines 60-92

**Critical Cleanup** (inline during migration):
- ❌❌❌ Line 90: `marc@shipfa.st` → `support@trakrf.id` (CRITICAL ERROR)
- ❌ Line 60: Update date from `September 26, 2023` to `October 20, 2025`
- ❌ Line 84: Change `France` → `the United States of America` (governing law)
- ❌ Remove ChatGPT comments (lines 5-26 from source - don't migrate)

**Implementation**:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = 'Terms of Service - TrakRF';
const description = 'Terms of Service for TrakRF - your rights and responsibilities';
---

<BaseLayout title={title} description={description}>
  <div class="mx-auto max-w-3xl px-8 py-24">
    <a href="/" class="btn btn-ghost mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
          clip-rule="evenodd"
        ></path>
      </svg>
      Back
    </a>

    <h1 class="mb-6 text-3xl font-extrabold">Terms and Conditions for TrakRF</h1>

    <div class="whitespace-pre-wrap font-sans leading-relaxed">
Last Updated: October 20, 2025

Welcome to TrakRF!

These Terms of Service ("Terms") govern your use of the TrakRF website at https://trakrf.id ("Website") and the services provided by TrakRF. By using our Website and services, you agree to these Terms.

1. Description of TrakRF

TrakRF is a platform that offers a JavaScript code boilerplate to assist entrepreneurs in launching their startups more efficiently.

2. Ownership and Usage Rights

When you purchase a package from TrakRF, you gain the right to download and use the code provided for creating applications. You own the code you create but do not have the right to resell it. We offer a full refund within 7 days of purchase, as specified in our refund policy.

3. User Data and Privacy

We collect and store user data, including name, email, and payment information, as necessary to provide our services. For details on how we handle your data, please refer to our Privacy Policy at https://trakrf.id/privacy-policy.

4. Non-Personal Data Collection

We use web cookies to collect non-personal data for the purpose of improving our services and user experience.

5. Governing Law

These Terms are governed by the laws of the United States of America.

6. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any changes via email.

For any questions or concerns regarding these Terms of Service, please contact us at support@trakrf.id.

Thank you for using TrakRF!
    </div>
  </div>
</BaseLayout>
```

**Validation**:
```bash
pnpm lint
pnpm typecheck
pnpm build
# Verify dist/tos/index.html exists
# Verify support@trakrf.id appears (not marc@shipfa.st)
# Verify "United States of America" appears (not France)
```

### Task 5: Add Blog Link to Footer

**File**: `src/components/Footer.astro`
**Action**: MODIFY (lines 34-44)
**Pattern**: Add link alongside Support and Pricing

**Implementation**:

Find the LINKS section (lines 34-44) and add blog link:

```astro
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
  <a href="/blog" class="link-hover link"> Blog </a>
</div>
```

**Validation**:
```bash
pnpm lint
pnpm typecheck
pnpm build
# Verify footer has blog link on homepage
```

### Task 6: Test Multi-Page Navigation

**File**: N/A (manual testing)
**Action**: VERIFY

**Test Cases**:

1. Start dev server: `pnpm dev`
2. Navigate to `http://localhost:4321`
3. Test navigation:
   - Click Footer "Blog" link → Should reach `/blog` placeholder
   - Click Footer "Privacy policy" link → Should reach `/privacy-policy`
   - Click Footer "Terms of services" link → Should reach `/tos`
   - From blog page, click "Back to Home" → Should reach `/`
   - From privacy page, click "Back" → Should reach `/`
   - From TOS page, click "Back" → Should reach `/`
4. Verify Header/Footer appear consistently on all pages
5. Verify mobile menu works on all pages (Alpine.js functional)
6. Verify responsive design works (mobile, tablet, desktop)

**Validation**:
```bash
# Dev server should be running without errors
pnpm dev
# Check browser console for errors (should be 0)
```

### Task 7: Final Validation Gates

**File**: N/A (validation commands)
**Action**: RUN ALL GATES

**Validation Sequence**:

```bash
# Gate 1: Lint (syntax & style)
pnpm lint

# Gate 2: Typecheck (type safety)
pnpm typecheck

# Gate 3: Build (production build)
pnpm build

# Gate 4: Verify all pages generated
ls -la dist/
ls -la dist/blog/
ls -la dist/privacy-policy/
ls -la dist/tos/

# Gate 5: Manual content verification
grep -r "marc@" dist/  # Should return 0 results
grep -r "support@trakrf.id" dist/  # Should find in legal pages
grep -r "France" dist/  # Should return 0 results
grep -r "United States of America" dist/  # Should find in TOS
```

**Success Criteria**:
- ✅ All validation gates pass (lint, typecheck, build)
- ✅ 5 HTML files generated: index.html, blog/index.html, privacy-policy/index.html, tos/index.html
- ✅ No `marc@` emails remain in any content
- ✅ All legal pages use `support@trakrf.id`
- ✅ TOS shows USA as governing law (not France)
- ✅ All navigation links functional
- ✅ Multi-page routing works flawlessly

## Risk Assessment

**Risk**: Legal content may contain additional template references not identified in spec
**Mitigation**: Manual grep verification for `shipfa.st`, `marc@`, `France` in Task 7

**Risk**: Mobile menu may not work on new pages (Alpine.js not loaded)
**Mitigation**: BaseLayout includes Alpine.js CDN script (Task 1)

**Risk**: Blog placeholder may look unprofessional or incomplete
**Mitigation**: Clear "Coming Soon" messaging sets expectations (Task 2)

**Risk**: SEO metadata may be incomplete or missing
**Mitigation**: BaseLayout enforces consistent SEO metadata across all pages (Task 1)

## Integration Points

- **Header/Footer**: Used consistently across all pages via BaseLayout
- **Navigation**: Footer gains blog link, all navigation tested in Task 6
- **Routing**: Astro file-based routing automatically handles new pages
- **SEO**: BaseLayout provides consistent OpenGraph/Twitter Card metadata
- **Styling**: Global CSS and DaisyUI already available from Phases 1 & 2

## VALIDATION GATES (MANDATORY)

**CRITICAL**: These are not suggestions - they are GATES that block progress.

After EVERY code change:
```bash
pnpm lint        # Gate 1: Syntax & Style
pnpm typecheck   # Gate 2: Type Safety
pnpm build       # Gate 3: Production Build
```

**Enforcement Rules**:
- If ANY gate fails → Fix immediately
- Re-run validation after fix
- Loop until ALL gates pass
- After 3 failed attempts → Stop and ask for help

**Do not proceed to next task until current task passes all gates.**

## Validation Sequence

After each task (1-5):
```bash
pnpm lint && pnpm typecheck && pnpm build
```

After Task 6 (testing):
```bash
# Manual testing - no automated gates
```

After Task 7 (final validation):
```bash
pnpm lint && pnpm typecheck && pnpm build
grep -r "marc@" dist/  # Should return 0 results
grep -r "shipfa.st" dist/  # Should return 0 results
```

## Plan Quality Assessment

**Complexity Score**: 2/10 (LOW - WELL-SCOPED)

**Confidence Score**: 9/10 (HIGH)

**Confidence Factors**:
- ✅ Clear requirements from spec (blog placeholder, legal pages)
- ✅ Similar patterns found in codebase at `src/pages/index.astro`
- ✅ All clarifying questions answered (BaseLayout, DaisyUI buttons, USA law)
- ✅ Existing Header/Footer components to reuse
- ✅ Source legal content clearly identified with line numbers
- ✅ All critical errors documented and addressed in migration plan
- ✅ No external dependencies or new packages required
- ✅ Straightforward page creation following existing patterns

**Assessment**: High confidence implementation. This is a straightforward page creation task following well-established patterns from Phases 1 & 2. The critical legal content cleanup is clearly documented and will be addressed inline during migration. Risk is minimal - static pages with no interactivity beyond existing Header mobile menu.

**Estimated one-pass success probability**: 95%

**Reasoning**: All patterns exist, all risks identified, clear task breakdown with validation gates. Only minor risk is human error in content cleanup, mitigated by grep verification in Task 7. This completes the structural migration and achieves clean closure on trakrf-web codebase.
