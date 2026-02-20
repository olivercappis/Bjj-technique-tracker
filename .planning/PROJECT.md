# BJJ Technique Tracker

## What This Is

A web app that breaks down major BJJ positions and their techniques (submissions, sweeps, escapes, transitions, passes, takedowns), letting users browse a technique library and build personalized game plans visualized as interactive flowcharts. The flowchart uses a bipartite graph where positions and techniques are separate, color-coded nodes connected by directed edges — sweeps and transitions chain forward to resulting positions, creating a readable visual map of how a practitioner moves between positions and what they attack from each one. Users can manage multiple named game plans with tagging, and export their flowcharts as PNG images.

## Core Value

The game plan flowchart must clearly show how a user's selected techniques connect across positions — positions as nodes, techniques branching off with arrows, sweeps/transitions linking to resulting positions — creating a readable visual map of their jiu-jitsu game.

## Requirements

### Validated

- ✓ Browse technique library by category → position → technique — existing
- ✓ View technique details (description, steps, tips, difficulty, tags) — existing
- ✓ Search across categories, positions, and techniques (Cmd/Ctrl+K) — existing
- ✓ Add/remove techniques to game plan from technique pages — existing
- ✓ Game plan data persists across sessions (localStorage) — existing
- ✓ Basic flowchart rendering with React Flow — existing
- ✓ Responsive layout with dark mode support — existing
- ✓ Positions render as standalone nodes, techniques as separate connected nodes — v1.0
- ✓ Technique nodes color-coded by type (submission, sweep, escape, transition, pass, takedown) — v1.0
- ✓ Submissions styled as distinct "finish" endpoints with no outgoing edges — v1.0
- ✓ Sweeps/transitions chain forward to resulting position nodes — v1.0
- ✓ Chained positions display their techniques — full flow from any entry point — v1.0
- ✓ Multiple entry points: all positions with user-selected techniques appear as roots — v1.0
- ✓ Dagre auto-layout with user drag position persistence — v1.0
- ✓ Pan and zoom on flowchart canvas — v1.0
- ✓ Technique count badges on position nodes — v1.0
- ✓ Create, rename, delete, duplicate game plans via UI — v1.0
- ✓ Switch between multiple named game plans — v1.0
- ✓ Empty state guidance for new plans — v1.0
- ✓ Tag game plans with labels (gi, no-gi, competition) — v1.0
- ✓ Remove techniques from plan via flowchart or list view — v1.0
- ✓ Click technique node to view full details (steps, tips, difficulty) — v1.0
- ✓ Click position node to browse and add techniques — v1.0
- ✓ Hover highlighting dims unconnected paths — v1.0
- ✓ Edge tooltips show technique name and type — v1.0
- ✓ Export flowchart as PNG image (1920x1080) — v1.0

### Active

(None — next milestone requirements TBD via `/gsd:new-milestone`)

### Out of Scope

- User accounts / authentication — future milestone for public launch
- Sharing game plans with other users — requires auth first
- Expanding the technique data library — data additions deferred to focus on visualization
- Mobile native app — web-first, responsive design is sufficient for now
- Video/media content for techniques — text-based for now
- Real-time collaboration on game plans — future consideration
- Collapse/expand position nodes — deferred to v2
- Shortest path highlighting between positions — deferred to v2
- Undo/redo for game plan changes — deferred to v2

## Context

Shipped v1.0 with ~2,050 LOC TypeScript/TSX across 23 source files.
Tech stack: React 19, Vite 7, TypeScript 5.9, Tailwind CSS 4, React Flow 12, Zustand 5, html-to-image 1.11.11.
Static data layer: categories, positions, techniques defined as TypeScript constants in `src/data/`.
All data client-side (localStorage persistence via Zustand).
Bipartite graph builder (`src/lib/game-plan-graph.ts`) produces separate position and technique nodes with directed edges.
Full plan CRUD via `PlanSelector` dropdown in game plan page header.
Human-verified all 20 v1 requirements across 3 verification checkpoints.

## Constraints

- **Tech stack**: Continue with existing React + Vite + Tailwind + React Flow + Zustand stack — no rewrites
- **Data model**: Work with existing static data types; extend if needed but don't break existing structure
- **No backend**: Keep everything client-side until auth milestone (localStorage persistence)
- **Browser support**: Modern browsers with ES2020+ support

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Flowchart rework before data expansion | Visualization is the core value — get it right first, then fill in content | ✓ Good — bipartite graph delivers clear game plan visualization |
| No auth this milestone | Focus on the product's core differentiator (the flowchart) before adding infrastructure | ✓ Good — shipped complete flowchart experience without auth complexity |
| All technique types in flowchart | Users need their complete game — escapes and transitions matter as much as submissions | ✓ Good — 6 technique types with color coding makes game plans comprehensive |
| Sweeps chain to resulting positions | This is what makes it a real "flow" chart — showing how positions connect through techniques | ✓ Good — forward chaining creates readable position-to-position flows |
| Bipartite graph (techniques as first-class nodes) | Enables type-based styling and sweep chaining that embedded-in-position design can't do | ✓ Good — clean separation of concerns, performant React Flow rendering |
| html-to-image pinned at 1.11.11 | Newer versions have CSS regression and browser freeze bugs | ✓ Good — stable PNG export at 1920x1080 |
| Optional tags field (no store migration) | `tags?: PlanTag[]` with `?? []` fallback avoids store version bump | ✓ Good — zero migration friction for existing users |
| Zustand selectors over method calls | Prevents reference equality re-render storms in React Flow components | ✓ Good — smooth flowchart interaction without unnecessary re-renders |

---
*Last updated: 2026-02-19 after v1.0 milestone*
