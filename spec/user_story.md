# User Story: Modern Interactive Resume Website

## Primary Persona
- **Name:** Hiring Manager / Technical Lead
- **Goal:** Rapidly assess candidate's relevance, depth of experience, and differentiators within 2–3 minutes.
- **Motivations:** Efficiency, clarity, credibility signals, ability to drill deeper only if promising.
- **Pain Points:** Overloaded resumes, lack of narrative, difficulty mapping experience to role needs.

## Secondary Personas
1. **Recruiter / Sourcer** – Needs quick headline + artifacts to pitch internally.
2. **Networking Contact / Industry Peer** – Looking for areas of overlap or collaboration potential.
3. **Conference / Event Organizer** – Verifying credibility & topic alignment for speaking.
4. **Automated Screening (SEO / AI Agents)** – Consuming structured metadata for parsing (future enhancement).

## Problem Statement
Traditional PDF resumes are static and fail to communicate cross-disciplinary context or impact narrative. The site should act as an interactive, structured, credibility-forward professional profile emphasizing mining innovation, data-driven decision-making, and strategic execution.

## Current State (As-Is)
- Single-page React + Tailwind application.
- Hero section with headshot, bio, calls-to-action (CV download, meeting link, LinkedIn).
- Current role highlighted with sticky layout (desktop) and supporting past roles.
- Recent section lists a subset of entries sorted by date.
- Modal for detailed entry description on click.
- Basic image assets organized by domain (experience, education, headshot).
- No routing, no dynamic data loading, all entries hard-coded in `App.tsx`.
- No analytics, SEO metadata, structured schema, accessibility review, or performance optimization beyond default Vite/Tailwind baseline.

## Desired Future State (To-Be)
An extensible, componentized professional portfolio with:
- Structured content model (Experience, Education, Projects, Publications, Speaking, Contact, Metadata).
- Portable data layer (JSON/YAML/Markdown) decoupled from presentation.
- Semantic, accessible layout with progressive enhancement.
- Optimized images and responsive loading patterns.
- Shareable deep links (e.g., /experience/innovating-critical-minerals) via client routing.
- Expandable timeline + filtered views (e.g., Industry vs Research).
- Downloadable tailored resumes (generated PDFs) per focus area.
- Light/dark theme + print stylesheet.
- Analytics (privacy-preserving) and basic event tracking.
- Deployment pipeline (CI) with automated quality gates.

## High-Level User Stories
1. As a hiring manager, I want to quickly scan a candidate's core narrative so I can decide if deeper evaluation is warranted.
2. As a recruiter, I want a one-click artifact (PDF / link) that aligns candidate experience to role criteria.
3. As a peer, I want to identify domains of overlap for collaboration.
4. As a conference organizer, I want to validate credibility in specific topic areas.
5. As an AI agent (future), I want structured JSON-LD to extract skills and experience.

## Detailed User Stories & Acceptance Criteria
### Story 1: View Core Professional Narrative
- **Given** I land on the homepage
- **When** the hero loads
- **Then** I see name, role positioning statement, and 2–3 key differentiators.
- **And** I can choose a next action (Connect / Schedule / Download CV).

### Story 2: Explore Experience Detail
- **Given** I see a current or past role tile
- **When** I click it
- **Then** a modal or route displays full description, impact metrics, tags, and links to artifacts.
- **And** I can navigate back without page reload.

### Story 3: Filter Content by Domain
- **Given** multiple experience domains (Industry, Academia, Project)
- **When** I select a filter
- **Then** only matching entries appear with smooth animated layout transitions.

### Story 4: Deep Link to Specific Entry
- **Given** I receive a shared URL like /experience/shaping-copper-future
- **When** I open it
- **Then** the page focuses that entry (open state) and proper meta tags are set.

### Story 5: Download Tailored Resume
- **Given** I'm viewing the site
- **When** I select a track (e.g., Strategy / Technical / Research)
- **Then** I can download a generated PDF with curated sections.

### Story 6: Accessible Interaction
- **Given** I navigate via keyboard
- **When** I tab through interactive elements
- **Then** focus order is logical, modals are trapped, and escape closes overlays.

### Story 7: Mobile Performance
- **Given** I load the site on 3G
- **When** initial content renders
- **Then** Largest Contentful Paint < 2.5s and total JS < 150KB (compressed) for initial route.

## Content Model (Initial Draft)
```
Entry {
  id: string
  slug: string
  title: string
  organization?: string
  roleType: 'Industry' | 'Academia' | 'Project' | 'Publication' | 'Speaking'
  startDate: string
  endDate?: string
  isCurrent?: boolean
  summary: string
  impact: string[] // bullet list
  skills: string[]
  tags: string[]
  media?: { type: 'image' | 'video'; src: string; alt: string }[]
  links?: { label: string; url: string }[]
}
```

## Gaps Identified
- Hard-coded data; no separation of concerns.
- No unit/component tests.
- Missing responsive refinements (e.g., performance on low-end devices not validated).
- No accessibility semantics (roles, aria attributes, focus management for modal lacking).
- No SEO (title dynamic, meta description, OpenGraph, structured data).
- No analytics or error monitoring.
- No deployment documentation.

## Success Metrics
- Time-on-page for hiring manager < 180s with ≥ 2 interaction events.
- PDF downloads per unique visitor ≥ 15% (once implemented).
- Lighthouse performance ≥ 90 mobile.
- Accessibility score ≥ 95.

## Open Questions
- Should publications / patents be included?
- Preferred analytics platform? (Plausible / Umami / self-hosted?)
- How personalized should resume variants be? Manual config vs rule-based tagging.
- Need CMS/editor or is flat-file acceptable for now?

## Out of Scope (Initial Milestone)
- Blog engine.
- Authenticated dashboard.
- CMS integration.
- Server-side rendering (may consider later with Next.js if needed for SEO).

---
Generated: 2025-09-13
