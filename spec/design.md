# Design & Architecture Overview

Generated: 2025-09-13

## 1. System Overview
A single-page client-rendered React + Vite + Tailwind CSS application serving as an interactive resume / professional portfolio. Current implementation is monolithic inside `App.tsx` with static data and minimal styling abstractions.

## 2. Technology Stack (Current)
- **Runtime:** Browser (ESM) via Vite dev server & production build
- **Framework:** React 18 (CSR only)
- **Language:** TypeScript (baseline types; limited interfaces)
- **Styling:** Tailwind CSS + ad hoc in-file `<style>` block for animation
- **Icons:** `lucide-react`
- **State:** Local component state via `useState`
- **Bundler:** Vite 5
- **Assets:** Static images in `public/images` (no optimization pipeline)

## 3. Component Structure (Current)
Single monolithic component `App` handling:
- Data definition (entries array)
- Layout sections (Hero, Current Role, Past Roles, Recent, Footer)
- UI logic (modal open/close, scroll tracking placeholder)
- Image rendering
- Domain filtering variable present but unused (`bentoFilter`)

### Issues
- Violates separation of concerns
- Harder to test / extend
- No reuse of card/modal patterns

## 4. Proposed Component Decomposition
```
src/
  components/
    layout/
      PageShell.tsx
      Section.tsx
      Grid.tsx
    hero/Hero.tsx
    experience/
      ExperienceCurrent.tsx
      ExperienceList.tsx
      ExperienceCard.tsx
      ExperienceModal.tsx
      ExperienceFilter.tsx
    recent/RecentList.tsx
    footer/Footer.tsx
    ui/
      Modal.tsx
      Button.tsx
      Avatar.tsx
  data/
    entries.json (or .ts exporting typed array)
  hooks/
    useEntries.ts
    useModal.ts
  lib/
    formatDate.ts
    analytics.ts
```

## 5. Data Model (Next Iteration)
See `user_story.md` content model. Introduce `slug`, structured dates, impact bullets. Source-of-truth stored as JSON or TS module; potential later markdown frontmatter per entry.

## 6. Routing Strategy
Short term: Remain single page with hash-based deep links (#experience/slug).
Mid term: Introduce React Router for clean paths `/experience/:slug` enabling shareable modal routes.
Long term (optional): Migrate to Next.js for SSR + SEO if organic search becomes priority.

## 7. State Management
Local state remains sufficient for MVP. If derived filters + search + view preferences become complex, introduce lightweight library (Zustand) or React Context modules.

## 8. Styling System
- Keep Tailwind for utility velocity.
- Extract repeated className groups into semantic components (e.g., `Card`, `Tile`, `ActionButton`).
- Move custom font import & keyframes to `index.css` or a `globals.css` for consistency.
- Add dark mode using Tailwind `dark:` variant with `class` strategy.

## 9. Accessibility Considerations
- Modal: focus trap, aria-modal, role="dialog", escape handling, restore focus origin.
- Images: Provide descriptive alt text; avoid empty alt except purely decorative.
- Color contrast validation (ensure >= 4.5:1 for text).
- Keyboard order: Ensure interactive elements precede content when semantically appropriate.

## 10. Performance Considerations
Current risk: Unoptimized images & all entries loaded eagerly.
Improvements:
- Use modern formats (AVIF/WebP) w/ fallbacks.
- Implement responsive `<img srcSet>`.
- Code split modal + optional sections.
- Preload headshot & hero fonts; lazy load below-the-fold experience images.
- Target initial JS bundle < 120KB gzipped.

## 11. SEO & Metadata Plan
- Dynamic `<title>` and `<meta name=description>` per route.
- OpenGraph + Twitter cards for main + entry pages.
- JSON-LD `Person` + `CreativeWork` schema for entries.
- Canonical URL tags.

## 12. Analytics & Telemetry
Phase 1: Lightweight privacy analytics (Plausible/Umami script loaded after idle).
Capture events:
- CTA clicks (Download CV, Schedule, Connect)
- Entry open
- Filter applied

Phase 2: Add performance logging (web vitals) and funnel for PDF generation.

## 13. Build & Deployment
Current: Manual (not documented). Proposed:
- GitHub Actions workflow: install -> lint -> typecheck -> build -> upload artifact -> deploy (e.g., Netlify / Vercel / S3+CloudFront).
- Cache pnpm / npm dependencies.
- Add `eslint --max-warnings=0` and `tsc --noEmit` gates.

## 14. Testing Strategy
- Unit: date formatting, slug generation.
- Component: ExperienceCard rendering & modal open/close.
- Accessibility snapshot using Storybook + axe (future).
- Visual regression (optional later: Chromatic / Percy).

## 15. Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Monolithic component growth | Maintainability decline | Early refactor into slices |
| Hard-coded content | Update friction | Externalize to data module |
| Image payload bloat | Performance | Optimize & lazy load |
| SEO underperformance | Discoverability | Add metadata + SSR option |
| A11y gaps | Usability / compliance | Integrate linting + audits |
| Modal focus issues | Keyboard trap | Implement focus management |

## 16. Future Enhancements
- Resume variant generator (tag-driven selection -> PDF via Puppeteer server or client print stylesheet).
- Graph visualization (using existing `react-force-graph-2d`) to map skills / domains network.
- CMS integration (Contentlayer + MDX or headless CMS) if content scale grows.
- Internationalization (i18n) for multilingual presentation.

## 17. Non-Functional Targets
- Build time < 5s on modern laptop.
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 100, SEO ≥ 90.
- Bundle size (initial route): < 150KB gzip JS; < 300KB images loaded.

## 18. Open Decisions
- Choose hosting provider (Vercel recommended for simplicity + preview URLs).
- Decide on future SSR migration path early to avoid tight coupling.
- Determine analytics platform respecting privacy requirements.

---
This document will evolve alongside implementation milestones.
