# TRA-336: Rewrite trakrf.id as Wholesale Platform/Technology Site

**Linear issue:** [TRA-336](https://linear.app/trakrf/issue/TRA-336/rewrite-trakrfid-as-wholesale-platformtechnology-site)
**Branch:** `miks2u/tra-336-rewrite-trakrfid-as-wholesale-platformtechnology-site`
**Date:** 2026-04-17

## Context

TrakRF is wholesale-only. All customer-facing sales flow through channel partners (rfidReady today; Wesco and Camcode as they formalize). trakrf.id is NOT a customer conversion funnel — it is a technology/platform site whose job is to recruit channel partners and support technical due diligence for prospects a partner has already pitched.

The current trakrf.id is a ShipFast-derived template with consumer-pitch components (pricing tiers, "80% of RFID projects fail" problem narrative, "no credit card required" CTAs, refund-policy FAQ). None of that positioning survives the wholesale strategy shift.

## Target audiences

1. **Potential channel partners** — Wesco channel managers, industrial distributors evaluating whether to resell TrakRF
2. **Technical evaluators** — customers doing due diligence after a partner pitch
3. **Developers / integrators** — API and integration evaluation (e.g., TeamCentral-style integrations)

## Success criteria

- Site reflects wholesale/platform positioning — no direct-sale framing anywhere
- rfidReady listed as channel partner with working link to rfidready.net
- Partner intake path exists (primary: Google Calendar booking link; secondary: mailto:partners@trakrf.id)
- Free BLE scanning link to app.trakrf.id works and is positioned as proof point, not trial funnel
- Product screenshots and hardware photos used as visuals — no stock photos, no AI-generated imagery
- No ShipFast template artifacts or placeholder copy remaining
- No pricing page, checkout links, or direct-sale CTAs
- `pnpm lint`, `pnpm typecheck`, `pnpm build` all pass

## Out of scope

Explicitly NOT in this ticket:
- Pricing anywhere on the site (channel partners set their own customer-facing prices)
- Stripe, checkout, or signup flows
- Trial signup optimization
- Customer testimonials or case studies (those live on partner sites)
- Feature comparison matrices
- FAQ section (the existing FAQ is consumer-framed; a partner-oriented FAQ can be a later issue if demand warrants)
- Blog content (the blog stub page remains on disk but is unlinked from the footer — deletion is out of scope)
- New dev dependencies (Alpine.js is already in BaseLayout and is retained)
- Automated tests (the repo has no test framework today; adding one is a separate decision)

## Architecture

Single-page Astro site. `src/pages/index.astro` is rewritten to compose eight new section components. Four ShipFast-derived components are deleted. Hero, Header, and Footer are rewritten in place.

### Component inventory

**Deleted (5):**
- `src/components/Problem.astro` — consumer-failure framing
- `src/components/FeaturesAccordion.astro` — generic feature pitch
- `src/components/Pricing.astro` — no direct-sale model
- `src/components/CTA.astro` — "no credit card required" framing
- `src/components/FAQ.astro` — consumer-framed ("Can I get a refund?"), no replacement in this ticket

**New (6):**
- `src/components/HowItWorks.astro` — architecture overview: handheld Web BLE path + fixed-reader MQTT path, Web Worker for UI responsiveness
- `src/components/FreeBleScanning.astro` — app.trakrf.id free tier as proof point, primary "Try it now" external link
- `src/components/Hardware.astro` — two-tier hardware grid: Supported today + On roadmap
- `src/components/ChannelPartners.astro` — rfidReady card + link to rfidready.net + placeholder for additional partners
- `src/components/BecomePartner.astro` — primary Google Calendar booking link + secondary mailto
- `src/components/TechnicalDetails.astro` — BSL license, self-hosting, API-first, integration-ready

**Rewritten in place (3):**
- `src/components/Hero.astro` — wholesale/platform positioning with "Scanner + TrakRF" composite as hero image
- `src/components/Header.astro` — new nav + external CTA, mobile menu preserved
- `src/components/Footer.astro` — dead links removed, ShipFast artifacts removed, copyright updated

**Unchanged:**
- `src/components/PreviewBanner.astro` — preview-branch indicator (independent concern)
- `src/layouts/BaseLayout.astro` — layout shell, Alpine.js script, meta tags
- `src/pages/privacy-policy.astro`, `src/pages/tos.astro` — legal pages remain linked from footer
- `src/pages/blog/index.astro` — stub page remains on disk but unlinked from footer

### Page composition

`src/pages/index.astro` imports and renders, in order:

1. Hero
2. HowItWorks — `<section id="how-it-works">`
3. FreeBleScanning
4. Hardware — `<section id="hardware">`
5. ChannelPartners — `<section id="partners">`
6. BecomePartner — `<section id="become-partner">`
7. TechnicalDetails

Header and Footer continue to wrap via `BaseLayout.astro`. The existing smooth-scroll script in `index.astro` currently excludes `#signin` and `#checkout` — those exclusions are removed (both anchors are gone); the script keeps only the guard against empty hashes.

## Section designs

### 1. Hero

**Image:** `scanner-trakrf-hero.jpg` (Scanner + TrakRF composite scraped from rfidready.net), right-side on desktop, stacked on mobile. Replaces the existing `public/images/hero.jpg` stock photo.

**Copy:**
- H1: "The RFID implementation layer for channel partners and integrators"
- Sub: "Browser-based asset tracking. Zero install, no middleware, no driver support calls. Handheld BLE and fixed-reader MQTT paths in one platform."
- Primary CTA: "Try the free BLE app" → `https://app.trakrf.id` (external)
- Secondary CTA: "Talk to us about partnering" → anchor `#become-partner`

### 2. How it works

Two-lane architecture overview, no photo. Inline SVG or pure-Tailwind diagram (simple boxes + arrows) showing the two data paths. Total ~120 words across the two lanes.

**Handheld lane:**
- Browser on Bluetooth-capable device → CSL CS108 (or similar BLE reader) via Web BLE
- Reads go directly to the TrakRF web app; Web Worker decodes the tag stream so the UI stays responsive
- No installs, no driver support calls

**Fixed lane:**
- LLRP readers (Impinj Speedway, CSL CS463) → MQTT (direct or via Pi 5 edge relay) → TrakRF web app
- Same UI and data model as the handheld path; same Web Worker architecture

### 3. Free BLE scanning

Screenshot (`app-scan-screen.png`) alongside ~80 words of copy. Frames app.trakrf.id as a **proof point**, not a trial funnel: anyone with a BLE-capable browser and a CS108 can scan right now without an account. Technical evaluators can touch the product in under a minute.

CTA: "Open app.trakrf.id" (external).

### 4. Supported hardware

Two-tier card grid. Each card: name, short spec line, integration path note, optional product photo (scraped or omitted per availability), optional vendor "Spec sheet" link.

**Supported today** (green check badge):
- CSL CS108 — handheld UHF, direct BLE
- CSL CS463 — fixed UHF, direct MQTT
- Impinj Speedway R420 — fixed UHF, via Pi 5 edge relay (already in production on OMH)
- GL-S10 gateway — MQTT bridge for LLRP readers
- Pi 5 edge server — LLRP → MQTT bridge; enables any LLRP reader today

**On roadmap** (clock badge, captioned "Prioritized by partner demand"):
- Impinj R700 — native MQTT, no edge relay needed
- Impinj xArray / later Speedway revisions
- Chainway C72 / C66 — Android handheld, BLE
- TSL 1153 / 2166 — BLE sled
- Zebra RFD8500 / FX9600 — handheld + fixed

The narrative for evaluators: "any LLRP reader works today via Pi 5; the roadmap focuses on readers with direct MQTT so deployments can skip the edge device."

### 5. Channel partners

Intro line: "TrakRF is wholesale-only. Our channel partners handle pricing, implementation services, and support."

rfidReady card (logo if scrapeable, otherwise text-only card) with link to rfidready.net.

Placeholder line: "Additional partners added as agreements finalize."

### 6. Become a partner

Anchor ID `#become-partner`. ~40-word pitch framed for distributors, integrators, and MSPs with industrial/logistics customers.

- Primary button: "Book a 30-min intro call" → `https://calendar.app.google/Hv1Bsm8Mc4wjPaJV8`
- Secondary text line: "Or email [partners@trakrf.id](mailto:partners@trakrf.id)"

Delivery for partners@trakrf.id currently routes via partners@devopstoai.com (trakrf.id is a user alias domain behind devopstoai.com); the site-visible address is partners@trakrf.id.

### 7. Technical details

Four-item grid or two-column list:
- **License:** Business Source License (BSL) with self-hosting rights
- **Self-hosting:** Run the full stack on partner or customer infrastructure
- **API-first:** Every app action is an API call (enables TeamCentral-style integrations)
- **Integration-ready:** MQTT, REST, webhooks

### 8. Footer

Logo + one-line tagline ("The RFID implementation layer").

Three link columns:
- **Platform** — app.trakrf.id (external)
- **Partners** — rfidready.net (external), Become a partner (anchor `#become-partner`)
- **Legal** — Terms of services, Privacy policy

Copyright: `© {currentYear} DevOps To AI LLC dba TrakRF`

Removed from current footer: `/#pricing` link, `/blog` link, "Support" mailto (folded into Become a partner), ShipFast artifacts.

## Navigation (Header)

Desktop:
- Logo (links to `/`)
- How it works (anchor)
- Hardware (anchor)
- Partners (anchor)
- [button] "Try the free app" → `https://app.trakrf.id`

Mobile menu (Alpine.js, preserved from existing Header) mirrors the desktop links with the primary CTA at the bottom.

Removed from current header: Pricing link, FAQ link, Sign In button, `handheld.trakrf.id` "Read Tags" link (superseded by `app.trakrf.id`).

## Image assets

All images live under `public/images/product/`. Sourced by scraping rfidready.net during implementation (`curl` + direct image URLs from the live site). No AI-generated or stock fallbacks.

Target filenames:
- `scanner-trakrf-hero.jpg` — Scanner + TrakRF composite (Hero)
- `cs108-handheld.jpg` — CS108 with mount (Hardware)
- `tag-sample-pack.jpg` — tag sample pack (Hardware)
- `app-home-screen.png` — TrakRF app home screen
- `app-scan-screen.png` — TrakRF app scan screen (FreeBleScanning)
- `app-locate-screen.png` — TrakRF app locate/search screen
- `rfidready-logo.svg` or `.png` — rfidReady logo (ChannelPartners)

**Fallback policy:** if a target image is not findable on rfidready.net during implementation, the affected section uses a text-only card or drops the image. Implementation flags any missing asset so it can be addressed separately. No stock or AI fallbacks.

The existing `public/images/hero.jpg` (stock photo) is removed along with any references.

## Validation

Aligned with `spec/stack.md`:
- `pnpm lint` — Prettier + ESLint, must pass cleanly
- `pnpm typecheck` — Astro TypeScript checker, zero errors
- `pnpm build` — static site builds successfully
- Manual smoke checks:
  - All in-page anchor links scroll to their targets
  - Google Calendar booking link opens in a new tab
  - app.trakrf.id link opens in a new tab
  - mailto:partners@trakrf.id opens the default mail client
  - No broken image references (`<img>` or Astro `<Image>`)
  - Mobile menu opens and closes
  - Preview banner appears when built with `PUBLIC_BRANCH=preview`
  - Footer shows current year and legal links still work

No automated tests added in this ticket.

## Open questions / deferred

- **Partner-oriented FAQ:** not in this ticket. If partner prospects start asking the same questions, add as a follow-on.
- **Additional channel partners (Wesco, Camcode):** not listed until they have signed agreements and live app instances. Adding them is a one-line change inside `ChannelPartners.astro` when the time comes.
- **Image licensing:** all visuals are either TrakRF product screenshots or rfidready.net product photos (our own channel partner's assets). If any image on rfidready.net turns out to be vendor-supplied with restrictive licensing, flag during implementation and fall back to text-only.
- **Impinj R700 hardware dev:** user has an R700 on hand. Direct-MQTT integration is the easiest roadmap item to accelerate; promotion from "on roadmap" to "supported today" is a one-line change in `Hardware.astro`.

## Follow-on work (not in this ticket)

- Delete or properly populate `src/pages/blog/index.astro` — handled in a separate ticket
- Evaluate dropping Alpine.js entirely if mobile menu is the only remaining consumer
- Add automated visual regression or accessibility tests
- Retire the `spec/csw/` workflow infrastructure if the team decides to standardize on superpowers (separate cleanup ticket)
