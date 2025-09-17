# Implementation Backlog & Task Breakdown
Generated: 2025-09-13

## Legend
- Size: S (<2h), M (0.5–1 day), L (1–2 days), XL (multi-day)
- Priority: P0 (critical), P1 (important), P2 (nice-to-have)
- Status: (TODO / WIP / DONE / BLOCKED)

## Phase 0: Baseline Hardening
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 0.1 | Add README with project purpose & run instructions | S | P0 | TODO | Basic onboarding |
| 0.2 | Add `tsconfig` strict options review (enable stricter flags) | S | P1 | TODO | tighten types |
| 0.3 | Convert inline styles (font import, keyframes) into global stylesheet | S | P1 | TODO | Move from `App.tsx` |
| 0.4 | Add ESLint rule adjustments + Prettier (optional) | M | P1 | TODO | Consistency |
| 0.5 | Introduce basic unit test infra (Vitest + React Testing Lib) | M | P0 | TODO | Foundation |

## Phase 1: Data Layer & Componentization
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 1.1 | Extract entries array to `src/data/entries.ts` | S | P0 | TODO | Decouple data |
| 1.2 | Define `Entry` expanded interface with slug/dates | S | P0 | TODO | Reuse |
| 1.3 | Create `ExperienceCard` component | S | P0 | TODO | Reusable tile |
| 1.4 | Create `ExperienceModal` component with accessibility | M | P0 | TODO | Focus trap |
| 1.5 | Create `Hero` component | S | P1 | TODO | Cleaner tree |
| 1.6 | Create `Footer` component | S | P1 | TODO | |
| 1.7 | Add `PageShell` layout wrapper | S | P2 | TODO | Future theming |
| 1.8 | Implement domain filter UI (Industry / Academia / Projects) | M | P1 | TODO | Uses local state |
| 1.9 | Implement slug generation util | S | P0 | TODO | For deep links |

## Phase 2: Routing & Deep Linking
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 2.1 | Add React Router | S | P1 | TODO | Code split pages |
| 2.2 | Route: `/` main listing | S | P1 | TODO | |
| 2.3 | Route: `/experience/:slug` with modal overlay pattern | M | P1 | TODO | Hydrate from data |
| 2.4 | Set document title + meta per route | S | P1 | TODO | Basic SEO |
| 2.5 | 404 fallback route | S | P2 | TODO | |

## Phase 3: Visual & UX Enhancements
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 3.1 | Dark mode toggle (class strategy) | M | P2 | TODO | Prefers-color-scheme fallback |
| 3.2 | Responsive image optimization (srcSet, sizes) | M | P1 | TODO | Core Web Vitals |
| 3.3 | Lazy load non-critical images (IntersectionObserver) | S | P1 | TODO | Performance |
| 3.4 | Animate filter transitions (Framer Motion optional) | M | P2 | TODO | Polish |
| 3.5 | Consolidate buttons into shared component | S | P2 | TODO | Consistency |

## Phase 4: Accessibility & Quality
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 4.1 | Implement modal focus trap & aria roles | S | P0 | TODO | A11y baseline |
| 4.2 | Keyboard navigation test pass (manual script) | S | P0 | TODO | Checklist |
| 4.3 | Add ESLint plugin jsx-a11y | S | P1 | TODO | Automated lint |
| 4.4 | Alt text audit for images | S | P0 | TODO | Provide meaningful descriptions |
| 4.5 | Lighthouse accessibility target ≥95 | M | P1 | TODO | Optimize contrast & semantics |

## Phase 5: Performance & Analytics
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 5.1 | Compress & convert images to WebP/AVIF | M | P1 | TODO | Tooling script |
| 5.2 | Add bundle analyzer (rollup plugin) | S | P2 | TODO | Track size |
| 5.3 | Implement code splitting for modal & heavy libs | M | P1 | TODO | Dynamic import |
| 5.4 | Integrate analytics (Plausible) | S | P1 | TODO | Load after idle |
| 5.5 | Add Web Vitals reporting hook | S | P2 | TODO | Optional |

## Phase 6: Resume & Export Features
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 6.1 | Tag entries by track (Strategy/Technical/Research) | S | P1 | TODO | Data update |
| 6.2 | Filter UI for track-based PDF generation | M | P2 | TODO | UX pattern |
| 6.3 | Print stylesheet (minimal layout) | M | P1 | TODO | Avoid JS PDF first |
| 6.4 | Client-driven PDF export (print API) | S | P1 | TODO | Initial variant |
| 6.5 | (Future) Server-rendered PDF (Node/Puppeteer) | L | P3 | TODO | Requires infra |

## Phase 7: SEO & Structured Data
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 7.1 | Add meta description + OG tags | S | P1 | TODO | Static first |
| 7.2 | Add JSON-LD Person schema | S | P1 | TODO | Inline script |
| 7.3 | Add structured Entry schema (CreativeWork) | M | P2 | TODO | Per route |
| 7.4 | Sitemap.xml generation (if multi-route) | S | P2 | TODO | Build step |

## Phase 8: Deployment & CI/CD
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 8.1 | Choose hosting (Vercel / Netlify) | S | P0 | TODO | Enables previews |
| 8.2 | Add CI workflow (lint + typecheck + build) | M | P0 | TODO | GitHub Actions |
| 8.3 | Deploy main branch automatically | S | P0 | TODO | Continuous delivery |
| 8.4 | Add preview deploys for PRs | S | P1 | TODO | QA convenience |

## Phase 9: Visualization (Optional Enhancement)
| ID | Task | Size | Priority | Status | Notes |
|----|------|------|----------|--------|-------|
| 9.1 | Integrate `react-force-graph-2d` to show skill / domain graph | L | P2 | TODO | Data modeling needed |
| 9.2 | Graph interaction opens related entries | M | P2 | TODO | Cross-link |

## Backlog (Unprioritized Ideas)
- Internationalization (i18n)
- Email obfuscation / contact form with serverless endpoint
- Content version history (git-based)
- MDX for rich entry narratives
- Skill proficiency visualization (radar / bar)
- Search across entries

## Dependencies & Sequencing Notes
- Routing (Phase 2) depends on data extraction (1.1, 1.2).
- SEO structured data depends on routing (2.x) & data model.
- PDF export depends on tagging (6.1) & print stylesheet (6.3).
- Graph visualization relies on enriched skill taxonomy.

## Milestone Grouping Suggestion
| Milestone | Included Tasks |
|-----------|----------------|
| M1 (Core Refactor + Data) | 0.x, 1.x, 4.1, 4.2 |
| M2 (Routing + UX) | 2.x, 3.1, 3.2, 3.3, 4.3, 4.4 |
| M3 (Performance + Analytics) | 5.x, 7.1, 7.2 |
| M4 (Export + SEO Depth) | 6.x, 7.3, 7.4 |
| M5 (Deployment & CI) | 8.x |
| M6 (Enhancements) | 3.4, 5.2, 5.5, 9.x |

## Tracking Template (Optional)
```
| ID | Start | Finish | Owner | Notes |
```

---
This backlog is a living document; adjust priorities based on hiring timelines or strategic focus.
