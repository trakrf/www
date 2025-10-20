# Implementation Plan: TrakRF-Web Content Migration Phase 2 - Interactive Components

Generated: 2025-10-20
Specification: spec.md

## Understanding

This plan implements **Phase 2 of 3** for migrating trakrf-web marketing content to Astro. Phase 2 adds 4 interactive marketing components (FeaturesAccordion, Pricing, FAQ, CTA) and enables interactivity features (mobile menu, accordions, smooth scroll) to complete the homepage.

**Phase 1 Context** (already complete):
- Static components: Header, Hero, Problem, Footer
- Tailwind config with custom animations
- Global CSS with .btn-gradient class
- Optimized image assets

**Phase 2 Goal**: Complete homepage with all 7 sections, full interactivity, ready for production deployment.

**Key Decisions**:
- **Alpine.js** for interactivity (declarative, 15KB, perfect for accordions/toggles)
- **Reuse hero.jpg** for CTA background (already optimized, consistent visual)
- **Inline SVG icons** for Features (converted from React heroicons)
- **Hardcoded content** (no config file - pricing/FAQ/features inline in components)
- **Smooth scroll** via simple vanilla JS in script tag
- **Social media card redesign** as optional final task if time permits

## Relevant Files

### Reference Patterns (existing code to follow):

**Phase 1 Astro Components** (patterns to mirror):
- `src/components/Header.astro` (lines 1-95) - Astro Image usage, DaisyUI classes, responsive layout
- `src/components/Hero.astro` (lines 1-32) - Image optimization with widths/sizes
- `src/components/Problem.astro` (lines 1-76) - Section structure, inline SVG, responsive flexbox
- `src/components/Footer.astro` (lines 1-68) - Dynamic year, link structure

**Source React Components** (copy content/structure from):
- `/home/mike/trakrf-web/components/FeaturesAccordion.tsx` (lines 1-248) - 4 features with SVG icons
- `/home/mike/trakrf-web/components/Pricing.tsx` (lines 1-107) - 3 pricing tiers, featured badge
- `/home/mike/trakrf-web/components/FAQ.tsx` (lines 1-119) - 3 FAQ items, accordion pattern
- `/home/mike/trakrf-web/components/CTA.tsx` (lines 1-31) - Hero section with background image

**Astro Interactivity Patterns** (Alpine.js):
- Alpine.js docs: https://alpinejs.dev/start-here
- Astro client directives: `<script>` tags for Alpine installation
- Progressive enhancement: content visible without JS

### Files to Create:

**Components** (Phase 2):
- `src/components/Pricing.astro` - 3 pricing tiers with cards
- `src/components/CTA.astro` - Call-to-action section with background
- `src/components/FeaturesAccordion.astro` - 4 features with expand/collapse
- `src/components/FAQ.astro` - 3 FAQ items with accordion

**Scripts** (if needed):
- Inline `<script>` tags in components or index.astro for Alpine/smooth scroll

### Files to Modify:

**Homepage Integration**:
- `src/pages/index.astro` - Add 4 new components, Alpine.js import, smooth scroll script

**Mobile Menu Activation**:
- `src/components/Header.astro` (lines 37-93) - Add Alpine.js directives to enable mobile menu

**Dependencies**:
- `package.json` - Add alpinejs package

### Optional Enhancement:

**Social Media Cards** (if time permits):
- `public/images/opengraph-image.png` - Redesign with logo placement
- `public/images/twitter-image.png` - Same design as OG image

## Architecture Impact

**Subsystems affected**: Frontend/UI only

**New dependencies**:
- `alpinejs@^3.14.1` (15KB gzipped, declarative state management)

**Breaking changes**: None (additive only)

## Task Breakdown

### Task 1: Install Alpine.js

**File**: `package.json`
**Action**: MODIFY
**Pattern**: Standard pnpm package install

**Implementation**:
```bash
pnpm add alpinejs@^3.14.1
```

**Validation**:
- Run `pnpm lint` to verify no errors
- Verify package.json updated

---

### Task 2: Create Pricing Component

**File**: `src/components/Pricing.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/Pricing.tsx` + `src/components/Problem.astro` (section structure)

**Implementation**:

Extract from Pricing.tsx:
- 3 pricing tiers (Starter $97, Advanced $297 featured, Enterprise "Call")
- Features list for each tier
- "POPULAR" badge for Advanced tier
- Stub "Get Started" buttons (href="#checkout")

Convert React → Astro:
- Remove ButtonCheckout component, use simple `<a>` tag
- Hardcode pricing data inline (no config import)
- Keep all Tailwind classes exactly as-is
- Use DaisyUI badge component for "POPULAR"

```astro
---
const pricingPlans = [
  {
    name: "Starter",
    price: 97,
    description: "Perfect for small teams getting started with RFID",
    features: [
      { name: "Up to 5 readers" },
      { name: "Up to 1000 tags" },
      { name: "Basic analytics" },
      { name: "Email support" }
    ]
  },
  {
    name: "Advanced",
    price: 297,
    isFeatured: true,
    description: "For growing teams with advanced needs",
    features: [
      { name: "Up to 20 readers" },
      { name: "Unlimited tags" },
      { name: "Advanced analytics & dashboards" },
      { name: "Priority support" },
      { name: "API access" }
    ]
  },
  {
    name: "Enterprise",
    price: "Call",
    description: "Custom solutions for large organizations",
    features: [
      { name: "Unlimited readers" },
      { name: "Unlimited tags" },
      { name: "Custom analytics" },
      { name: "Dedicated support" },
      { name: "Custom integrations" }
    ]
  }
];
---

<section class="bg-base-200 overflow-hidden" id="pricing">
  <div class="py-24 px-8 max-w-5xl mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <p class="font-medium text-primary mb-8">Pricing</p>
      <h2 class="font-bold text-3xl lg:text-5xl tracking-tight">
        Save weeks of complex infrastructure setup and middleware development
      </h2>
    </div>

    <div class="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
      {pricingPlans.map((plan) => (
        <div class="relative w-full max-w-lg">
          {plan.isFeatured && (
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span class="badge text-xs text-primary-content font-semibold border-0 bg-primary">
                POPULAR
              </span>
            </div>
          )}

          {plan.isFeatured && (
            <div class="absolute -inset-[1px] rounded-[9px] bg-primary z-10"></div>
          )}

          <div class="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
            <div class="flex justify-between items-center gap-4">
              <div>
                <p class="text-lg lg:text-xl font-bold">{plan.name}</p>
                {plan.description && (
                  <p class="text-base-content/80 mt-2">{plan.description}</p>
                )}
              </div>
            </div>

            <div class="flex gap-2">
              <p class="text-5xl tracking-tight font-extrabold">
                {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
              </p>
              {typeof plan.price === 'number' && (
                <div class="flex flex-col justify-end mb-[4px]">
                  <p class="text-xs text-base-content/60 uppercase font-semibold">USD</p>
                </div>
              )}
            </div>

            <ul class="space-y-2.5 leading-relaxed text-base flex-1">
              {plan.features.map((feature) => (
                <li class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>

            <div class="space-y-2">
              <a href="#checkout" class="btn btn-primary w-full">Get Started</a>
              <p class="flex items-center justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">
                Try it for free for 14 days. No credit card required.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Validation**:
- Run `pnpm lint` to verify syntax
- Run `pnpm typecheck` to verify no type errors
- Visual check: 3 cards side-by-side on desktop, stacked on mobile

---

### Task 3: Create CTA Component

**File**: `src/components/CTA.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/CTA.tsx` + `src/components/Hero.astro` (Image usage)

**Implementation**:

Reuse hero.jpg as background (already optimized):
- Use CSS background-image instead of Next.js Image fill
- Add overlay with opacity
- Center content with DaisyUI hero classes
- Stub "Get Started" button

```astro
<section class="relative hero overflow-hidden min-h-screen">
  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url('/images/hero.jpg')"
  ></div>
  <div class="relative hero-overlay bg-neutral bg-opacity-70"></div>
  <div class="relative hero-content text-center text-neutral-content p-8">
    <div class="flex flex-col items-center max-w-xl p-8 md:p-0">
      <h2 class="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
        Manage and configure your RFID hardware, integrate RFID data into your apps
      </h2>
      <p class="text-lg opacity-80 mb-12 md:mb-16">
        Don't waste time figuring out how to get RFID data into your apps. We've got you covered.
      </p>
      <a href="#pricing" class="btn btn-primary btn-wide">
        Get Started
      </a>
    </div>
  </div>
</section>
```

**Validation**:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Visual check: Background image displays, overlay works, content centered

---

### Task 4: Create FeaturesAccordion Component with Alpine.js

**File**: `src/components/FeaturesAccordion.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/FeaturesAccordion.tsx` + Alpine.js docs

**Implementation**:

Extract 4 features from FeaturesAccordion.tsx:
1. "Configure Readers and Tags" - radio icon SVG
2. "Read tags" - credit card icon SVG + unsplash image
3. "Integrate with your systems" - user icon SVG
4. "Analyze and visualize" - (get SVG from source, line ~100+)

Use Alpine.js for accordion:
- `x-data="{ selected: 0 }"` for state
- `@click="selected = index"` for toggling
- `:class` for active state styling
- `x-show="selected === index"` for content visibility
- `x-transition` for smooth expand/collapse

```astro
<section class="py-24 px-8 max-w-7xl mx-auto">
  <div class="flex flex-col md:flex-row gap-12">
    <!-- Left side: Feature titles (accordion triggers) -->
    <div
      class="flex flex-col gap-4 basis-1/2"
      x-data="{ selected: 0 }"
    >
      <h2 class="font-bold text-3xl lg:text-4xl tracking-tight mb-4">
        Everything you need to track RFID tags
      </h2>

      <!-- Feature 1 -->
      <button
        @click="selected = 0"
        class="flex items-center gap-4 p-4 rounded-lg transition-colors text-left"
        :class="selected === 0 ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-base-200'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
          />
        </svg>
        <div>
          <p class="font-semibold">Configure Readers and Tags</p>
        </div>
      </button>

      <!-- Feature 2 -->
      <button
        @click="selected = 1"
        class="flex items-center gap-4 p-4 rounded-lg transition-colors text-left"
        :class="selected === 1 ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-base-200'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
        <div>
          <p class="font-semibold">Read tags</p>
        </div>
      </button>

      <!-- Feature 3 -->
      <button
        @click="selected = 2"
        class="flex items-center gap-4 p-4 rounded-lg transition-colors text-left"
        :class="selected === 2 ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-base-200'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div>
          <p class="font-semibold">Integrate with your systems</p>
        </div>
      </button>

      <!-- Feature 4 -->
      <button
        @click="selected = 3"
        class="flex items-center gap-4 p-4 rounded-lg transition-colors text-left"
        :class="selected === 3 ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-base-200'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
        <div>
          <p class="font-semibold">Analyze and visualize</p>
        </div>
      </button>
    </div>

    <!-- Right side: Feature descriptions (accordion content) -->
    <div class="basis-1/2 relative" x-data="{ selected: 0 }">
      <!-- Feature 1 content -->
      <div
        x-show="selected === 0"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-95"
        x-transition:enter-end="opacity-100 transform scale-100"
        class="space-y-4"
      >
        <p class="text-lg leading-relaxed">
          Configure reader settings and tag read configurations, manage capture locations and tracked entities
        </p>
      </div>

      <!-- Feature 2 content -->
      <div
        x-show="selected === 1"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-95"
        x-transition:enter-end="opacity-100 transform scale-100"
        class="space-y-4"
      >
        <p class="text-lg leading-relaxed">
          Capture reads from your readers in real time, parse the captured read data, identify the time, location, and tracked entity, record into a time series datastore
        </p>
        <img
          src="/images/hero.jpg"
          alt="RFID reader"
          class="rounded-lg w-full"
        />
      </div>

      <!-- Feature 3 content -->
      <div
        x-show="selected === 2"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-95"
        x-transition:enter-end="opacity-100 transform scale-100"
        class="space-y-4"
      >
        <p class="text-lg leading-relaxed">
          Stream captured tag read data into your existing operational systems, analytics platforms, and more.
        </p>
      </div>

      <!-- Feature 4 content -->
      <div
        x-show="selected === 3"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 transform scale-95"
        x-transition:enter-end="opacity-100 transform scale-100"
        class="space-y-4"
      >
        <p class="text-lg leading-relaxed">
          Use TrakRF's built-in analytics and visualization tools to build dashboards and reports
        </p>
      </div>
    </div>
  </div>
</section>
```

**Note**: Need to check source for 4th feature icon (line ~100+ in FeaturesAccordion.tsx). Using chart-bar icon as placeholder.

**Validation**:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Visual check: Clicking features toggles content, transitions smooth

---

### Task 5: Create FAQ Component with Alpine.js

**File**: `src/components/FAQ.astro`
**Action**: CREATE
**Pattern**: Reference `/home/mike/trakrf-web/components/FAQ.tsx` + Alpine.js accordion

**Implementation**:

Extract 3 FAQ items from FAQ.tsx:
1. "What do I get exactly?"
2. "Can I get a refund?"
3. "I have another question"

Use Alpine.js for accordion with smooth height transition:
- Each item has its own `x-data="{ open: false }"`
- `@click="open = !open"` to toggle
- `x-show="open"` with `x-collapse` for height animation
- Rotate +/- icon based on open state

```astro
<section class="bg-base-200" id="faq">
  <div class="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
    <div class="flex flex-col text-left basis-1/2">
      <p class="inline-block font-semibold text-primary mb-4">FAQ</p>
      <p class="sm:text-4xl text-3xl font-extrabold text-base-content">
        Frequently Asked Questions
      </p>
    </div>

    <ul class="basis-1/2">
      <!-- FAQ Item 1 -->
      <li x-data="{ open: false }">
        <button
          @click="open = !open"
          class="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
          :aria-expanded="open"
        >
          <span
            class="flex-1 text-base-content"
            :class="{ 'text-primary': open }"
          >
            What do I get exactly?
          </span>
          <svg
            class="flex-shrink-0 w-4 h-4 ml-auto fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center transition duration-200 ease-out"
              :class="{ 'rotate-180': open }"
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center rotate-90 transition duration-200 ease-out"
              :class="{ 'rotate-180 hidden': open }"
            />
          </svg>
        </button>
        <div
          x-show="open"
          x-collapse
          class="pb-5 leading-relaxed opacity-80"
        >
          You get full access to the TrakRF RFID data collection and management tools
        </div>
      </li>

      <!-- FAQ Item 2 -->
      <li x-data="{ open: false }">
        <button
          @click="open = !open"
          class="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
          :aria-expanded="open"
        >
          <span
            class="flex-1 text-base-content"
            :class="{ 'text-primary': open }"
          >
            Can I get a refund?
          </span>
          <svg
            class="flex-shrink-0 w-4 h-4 ml-auto fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center transition duration-200 ease-out"
              :class="{ 'rotate-180': open }"
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center rotate-90 transition duration-200 ease-out"
              :class="{ 'rotate-180 hidden': open }"
            />
          </svg>
        </button>
        <div
          x-show="open"
          x-collapse
          class="pb-5 leading-relaxed opacity-80"
        >
          Yes! You can request a refund within 7 days of your purchase. Reach out by email.
        </div>
      </li>

      <!-- FAQ Item 3 -->
      <li x-data="{ open: false }">
        <button
          @click="open = !open"
          class="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
          :aria-expanded="open"
        >
          <span
            class="flex-1 text-base-content"
            :class="{ 'text-primary': open }"
          >
            I have another question
          </span>
          <svg
            class="flex-shrink-0 w-4 h-4 ml-auto fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center transition duration-200 ease-out"
              :class="{ 'rotate-180': open }"
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              class="transform origin-center rotate-90 transition duration-200 ease-out"
              :class="{ 'rotate-180 hidden': open }"
            />
          </svg>
        </button>
        <div
          x-show="open"
          x-collapse
          class="pb-5 leading-relaxed opacity-80"
        >
          Cool, contact us by email
        </div>
      </li>
    </ul>
  </div>
</section>
```

**Validation**:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Visual check: FAQ items expand/collapse with smooth animation

---

### Task 6: Enable Mobile Menu in Header with Alpine.js

**File**: `src/components/Header.astro`
**Action**: MODIFY
**Pattern**: Add Alpine.js directives to existing stubbed mobile menu (lines 37-93)

**Implementation**:

Add `x-data="{ mobileMenuOpen: false }"` to nav element:
- Menu button: `@click="mobileMenuOpen = true"`
- Mobile menu panel: `x-show="mobileMenuOpen"`
- Close button: `@click="mobileMenuOpen = false"`
- Add `x-transition` for smooth slide-in

Changes:
- Line 13: Add `x-data="{ mobileMenuOpen: false }"` to nav
- Line 39: Add `@click="mobileMenuOpen = true"` to button
- Line 58: Change `class="hidden lg:hidden"` to `x-show="mobileMenuOpen"` with transition
- Line 66: Add `@click="mobileMenuOpen = false"` to close button

```astro
<!-- Line 12-13: Add Alpine state -->
<nav class="container mx-auto flex items-center justify-between px-8 py-4" x-data="{ mobileMenuOpen: false }">

<!-- Line 39: Add click handler to menu button -->
<button
  type="button"
  class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
  @click="mobileMenuOpen = true"
>

<!-- Line 58: Replace hidden class with x-show -->
<div
  x-show="mobileMenuOpen"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 translate-x-full"
  x-transition:enter-end="opacity-100 translate-x-0"
  x-transition:leave="transition ease-in duration-200"
  x-transition:leave-start="opacity-100 translate-x-0"
  x-transition:leave-end="opacity-0 translate-x-full"
  class="lg:hidden"
>

<!-- Line 66: Add click handler to close button -->
<button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
```

**Validation**:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Visual check on mobile: Menu button opens panel, close button closes it

---

### Task 7: Integrate Components into Homepage and Add Alpine.js

**File**: `src/pages/index.astro`
**Action**: MODIFY
**Pattern**: Import new components, add Alpine.js CDN, add smooth scroll

**Implementation**:

Add Alpine.js via CDN in head (simplest approach for Astro):
```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

Import 4 new components:
```astro
import FeaturesAccordion from '../components/FeaturesAccordion.astro';
import Pricing from '../components/Pricing.astro';
import FAQ from '../components/FAQ.astro';
import CTA from '../components/CTA.astro';
```

Add components to main in correct order:
```astro
<main>
  <Hero />
  <Problem />
  <FeaturesAccordion />
  <Pricing />
  <FAQ />
  <CTA />
</main>
```

Add smooth scroll script at end of body:
```html
<script>
  // Smooth scroll to hash anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#signin' || href === '#checkout') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
</script>
```

**Validation**:
- Run `pnpm lint`
- Run `pnpm typecheck`
- Run `pnpm build` - full build test
- Visual check: All 7 sections present, smooth scroll works

---

### Task 8: Optional - Redesign Social Media Cards

**Files**: `public/images/opengraph-image.png`, `public/images/twitter-image.png`
**Action**: MODIFY (optional)
**Pattern**: Improve on Phase 1 gradient cards

**Implementation** (if time permits):

Use ImageMagick to create better branded cards:
- Add logo to card (top-left or centered)
- Better typography hierarchy
- Professional layout with brand colors
- Maintain 1200x630px dimensions

```bash
# Example with logo placement
convert -size 1200x630 \
  gradient:'#5073b8-#1098ad' \
  public/images/icon.png -geometry 200x200+50+50 -composite \
  -font DejaVu-Sans-Bold -pointsize 80 -fill white \
  -gravity center -annotate +0-100 'TrakRF' \
  -font DejaVu-Sans -pointsize 40 -fill 'rgba(255,255,255,0.9)' \
  -gravity center -annotate +0+20 'Track Tags Today!' \
  public/images/opengraph-image.png

cp public/images/opengraph-image.png public/images/twitter-image.png
```

**Validation**:
- Visual check: Cards look professional
- File size reasonable (< 100KB each)
- Dimensions correct (1200x630px)

**Note**: This task is optional. Only do it if all other tasks are complete and time permits.

---

## Risk Assessment

**Risk**: Alpine.js `x-collapse` plugin not available via CDN
**Mitigation**: Alpine.js collapse is built-in to v3.x. If issues, use `x-show` with manual max-height transition styles.

**Risk**: Smooth scroll doesn't work in older browsers
**Mitigation**: Progressive enhancement - script only enhances behavior. Default anchor links still work.

**Risk**: Mobile menu doesn't close when clicking links
**Mitigation**: Add `@click="mobileMenuOpen = false"` to mobile menu links if needed during testing.

**Risk**: Build time increases significantly with Alpine.js
**Mitigation**: Alpine.js is client-side only (loaded via CDN), doesn't affect build time. JS bundle will be ~15KB gzipped.

**Risk**: Features accordion icons missing from source
**Mitigation**: Using heroicons (MIT licensed) as fallback. Source has inline SVGs that can be copied directly.

## Integration Points

**Alpine.js Integration**:
- CDN loaded in `<head>` of index.astro
- Components use `x-data`, `x-show`, `x-transition`, `x-collapse`
- No build config needed (client-side only)

**Component Order**:
Header → Hero → Problem → **FeaturesAccordion** → **Pricing** → **FAQ** → **CTA** → Footer

**Image Assets**:
- Reusing hero.jpg for CTA background (already optimized)
- Reusing hero.jpg for Features image (Feature 2)
- Social cards optionally redesigned

**Smooth Scroll**:
- Vanilla JS in `<script>` tag at end of body
- Targets `a[href^="#"]` links
- Skips stub links (#signin, #checkout)

## VALIDATION GATES (MANDATORY)

**CRITICAL**: These are not suggestions - they are GATES that block progress.

After EVERY code change, use commands from `spec/stack.md`:
- **Gate 1**: Lint → `pnpm lint`
- **Gate 2**: Type Safety → `pnpm typecheck`
- **Gate 3**: Build → `pnpm build` (after Task 7)

**Enforcement Rules**:
- If ANY gate fails → Fix immediately
- Re-run validation after fix
- Loop until ALL gates pass
- After 3 failed attempts → Stop and ask for help

**Do not proceed to next task until current task passes all gates.**

## Validation Sequence

**After each component (Tasks 2-5)**:
```bash
pnpm lint
pnpm typecheck
```

**After integration (Task 7)**:
```bash
pnpm lint
pnpm typecheck
pnpm build
```

**Manual browser testing** (after Task 7):
- Open http://localhost:4321
- Test all accordions (Features, FAQ)
- Test mobile menu on small screen
- Test smooth scroll to #pricing and #faq
- Check all 7 sections present
- Verify no console errors

**Performance check**:
```bash
pnpm build
ls -lh dist/_astro/*.js  # Check JS bundle size < 100KB
```

## Plan Quality Assessment

**Complexity Score**: 6/10 (MEDIUM - AT BOUNDARY)

**File Count**: 4 files to create, 2 files to modify (6 file operations)
**Subsystems**: 1 (Frontend/UI)
**Task Estimate**: 8 subtasks (7 core + 1 optional)
**Dependencies**: 1 new package (alpinejs)
**Pattern Novelty**: Adapting (following Phase 1 patterns + adding interactivity)

**Confidence Score**: 8/10 (HIGH)

**Confidence Factors**:
✅ Clear requirements from spec
✅ Phase 1 patterns established and working (Header, Hero, Problem, Footer)
✅ Source components available with exact copy (/home/mike/trakrf-web/)
✅ Alpine.js is well-documented and simple (15KB, declarative)
✅ All 4 clarifying questions answered
✅ Accordion pattern is straightforward (3 similar components)
✅ Smooth scroll is vanilla JS (simple, well-supported)
⚠️ Alpine.js is new to this project (but v3.x is stable)
⚠️ Need to check Features icon #4 from source (minor)

**Assessment**: High confidence for Phase 2. All components follow similar accordion patterns, Alpine.js simplifies state management, and Phase 1 established solid foundation. The interactivity is straightforward (accordions, menu toggle, smooth scroll). Main complexity is in accurate content migration and ensuring Alpine.js transitions work smoothly.

**Estimated one-pass success probability**: 85%

**Reasoning**: Phase 2 builds on proven Phase 1 patterns with well-understood interactivity patterns. Alpine.js reduces complexity significantly vs vanilla JS. The 15% risk accounts for potential Alpine.js integration quirks (CDN loading, directive syntax) and ensuring accordion transitions match trakrf-web exactly. All components are similar in structure (accordions + pricing cards), reducing implementation variability.

---

## Summary

**Phase 2 delivers**:
- ✅ 4 new interactive components (FeaturesAccordion, Pricing, FAQ, CTA)
- ✅ Enabled mobile menu (from stubbed to functional)
- ✅ Smooth scroll to hash anchors
- ✅ Complete homepage with all 7 sections
- ✅ Alpine.js for declarative interactivity (15KB)
- ✅ Optional social card redesign if time permits

**Ready for production deployment after Phase 2!**

**Phase 3 scope** (future):
- Blog pages (3 posts + index)
- Legal pages (Privacy Policy, Terms of Service)
- Content cleanup (shipfa.st → trakrf.id in blog/legal)
