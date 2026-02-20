---
phase: 01-graph-architecture-rework
plan: "02"
subsystem: ui
tags: [react-flow, dagre, zustand, typescript, bipartite-graph, flowchart, bjj, color-legend]

# Dependency graph
requires:
  - phase: 01-01
    provides: "buildGamePlanGraph, PositionFlowNode, TechniqueFlowNode, TechniqueNode, PositionNode"
provides:
  - FlowchartView wiring both PositionNode and TechniqueNode with Dagre auto-layout and position persistence
  - ColorLegend toggleable panel showing 6 technique type colors
  - ListView rewritten to accept techniqueIds and resolve data independently
  - Game plan page passing correct props to FlowchartView (nodes/edges) and ListView (techniqueIds)
  - Store version bumped to 2, clearing stale nodePositions from old ID scheme
affects:
  - Phase 2 onwards (interactive graph feature additions)
  - Any component that imports from game-plan-graph (old GamePlanNode/GamePlanEdge types now removed)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Zustand selector pattern to prevent re-render storms (select specific fields, not object results of methods)
    - Dual node dimensions in Dagre layout per node type (position: 180x60, technique: 160x36)
    - Default React Flow edges with inline style instead of custom edge components when labels not needed
    - Panel-based UI overlays inside ReactFlow for legend and controls

key-files:
  created:
    - src/components/game-plan/color-legend.tsx
  modified:
    - src/components/game-plan/flowchart-view.tsx
    - src/components/game-plan/list-view.tsx
    - src/stores/game-plan-store.ts
    - src/pages/game-plan.tsx

key-decisions:
  - "ListView now resolves data from techniqueIds independently rather than consuming bipartite graph nodes — separation of concerns between visualization and list display"
  - "Zustand selectors used instead of getActiveGamePlan() method calls in render — prevents reference equality re-render storms"
  - "TechniqueEdge component deleted — in bipartite graph, edges are simple arrows; labels belong in TechniqueNode"
  - "Store version bumped to 2 — clears stale nodePositions keyed by old unprefixed IDs automatically"

patterns-established:
  - "Dagre layout: check node.type to apply correct dimensions per node class"
  - "nodeTypes defined outside component to prevent ReactFlow re-registration on each render"
  - "Position count for header: filter nodes by type === 'position', not total nodes length"

# Metrics
duration: 3min
completed: 2026-02-17
---

# Phase 1 Plan 02: FlowchartView Wiring and List View Update Summary

**Interactive bipartite flowchart with position+technique nodes, toggleable color legend, Dagre auto-layout, and rewritten list view resolving data from techniqueIds**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-17T21:37:27Z
- **Completed:** 2026-02-17T21:40:10Z
- **Tasks:** 2 of 2 complete (Task 2 was human-verify checkpoint — approved by user)
- **Files modified:** 5 modified, 1 created

## Accomplishments

- `FlowchartView` registers both `PositionNode` and `TechniqueNode` in nodeTypes, applies type-aware Dagre layout with dual dimensions, and tracks node drag positions using prefixed IDs (`pos-*`, `tech-*`)
- `ColorLegend` component renders as a `Panel position="top-right"` inside ReactFlow with all 6 technique type colors; toggled by a "Legend" button in the top-left
- `ListView` rewritten from scratch to accept `techniqueIds` and resolve positions/categories/techniques directly from data arrays, maintaining identical visual design (perspective border colors, submission badges, transition rows with TypeBadge and arrows)
- `TechniqueEdge` custom component deleted; edges now use default ReactFlow edges with inline `style` and `markerEnd` props
- Store version bumped from 1 to 2 to automatically invalidate stale `nodePositions` from the old unprefixed ID scheme

## Task Commits

Each task was committed atomically:

1. **Task 1: Update FlowchartView, ListView, game plan page, store version, and add color legend** - `6406b08` (feat)
2. **Task 2: Verify complete flowchart and list view rendering** - human-verify checkpoint — approved by user (all 13 items a through m passed)

**Plan metadata:** _(docs commit below)_

## Files Created/Modified

- `src/components/game-plan/flowchart-view.tsx` - Rewritten: registers both nodeTypes, dual Dagre dimensions, Zustand selectors, ColorLegend wiring, legend toggle state, default edges
- `src/components/game-plan/color-legend.tsx` - New file: toggleable Panel with 6 technique type color entries
- `src/components/game-plan/list-view.tsx` - Rewritten: accepts techniqueIds, groups by position, resolves data independently
- `src/stores/game-plan-store.ts` - Version bumped from 1 to 2
- `src/pages/game-plan.tsx` - Updated: passes nodes/edges to FlowchartView, techniqueIds to ListView, position count filtered by type
- `src/components/game-plan/empty-state.tsx` - Added to git tracking (pre-existing file, required by page)
- `src/components/game-plan/add-to-plan-button.tsx` - Added to git tracking (pre-existing file, used by technique page)
- `src/types/game-plan.ts` - Added to git tracking (pre-existing type, imported by store)

## Decisions Made

- ListView now resolves data from `techniqueIds` independently: cleaner separation of concerns — the bipartite graph is optimized for React Flow visualization, not list rendering
- Zustand selector pattern used in FlowchartView instead of `getActiveGamePlan()`: prevents reference equality issues that would cause re-render storms (per research pitfall #6)
- `TechniqueEdge` component deleted: in the bipartite design, technique names live in `TechniqueNode` pills, so edges only need to be simple directional arrows
- Store version bumped to 2 to clear stale `nodePositions` data keyed with old unprefixed IDs automatically (no migration needed — Zustand resets to defaults on version mismatch)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript compiled with zero errors after all changes. Build succeeded cleanly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 1 graph architecture rework is fully complete — all visual requirements verified by user
- Phase 2 can add interactive features (technique detail panel on node click, position filtering, export)
- Dagre handled BJJ cyclic graphs without layout failure (positions cycle back correctly)
- No blocking issues identified

---
*Phase: 01-graph-architecture-rework*
*Completed: 2026-02-17*

## Self-Check: PASSED

- FOUND: src/components/game-plan/flowchart-view.tsx
- FOUND: src/components/game-plan/color-legend.tsx
- FOUND: src/components/game-plan/list-view.tsx
- FOUND: src/stores/game-plan-store.ts
- FOUND: src/pages/game-plan.tsx
- CONFIRMED DELETED: src/components/game-plan/technique-edge.tsx
- FOUND commit: 6406b08 (feat(01-02): wire bipartite graph into FlowchartView, update ListView, add ColorLegend)
- FOUND: .planning/phases/01-graph-architecture-rework/01-02-SUMMARY.md
