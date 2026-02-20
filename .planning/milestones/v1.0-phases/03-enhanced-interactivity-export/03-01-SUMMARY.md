---
phase: 03-enhanced-interactivity-export
plan: 01
subsystem: ui
tags: [react-flow, flowchart, hover, tooltip, xyflow, opacity, useCallback]

# Dependency graph
requires:
  - phase: 01-graph-architecture-rework
    provides: bipartite graph with PositionFlowNode/TechniqueFlowNode, FlowchartView component
  - phase: 02-plan-management-ui
    provides: active plan selection, technique removal, plan store

provides:
  - LabeledEdge component: custom edge with hover-activated tooltip via EdgeLabelRenderer
  - Edge data extension: techniqueName/techniqueType on technique->position edges only
  - FlowchartView hover handlers: node hover dims unconnected nodes/edges; edge hover dims non-endpoint nodes

affects: [03-02, 03-03, export-phase]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - EdgeLabelRenderer for rendering tooltips attached to edges in React Flow
    - edgeTypes constant outside component (same pattern as nodeTypes) for stable reference
    - useCallback wrapping ALL hover handlers to prevent render loop (critical for setNodes/setEdges in event handlers)
    - opacity-based dimming via style spread: 0.2 for non-connected nodes, 0.15 for non-connected edges
    - String() cast for unknown data fields from EdgeProps (React Flow EdgeProps.data is typed as Record<string, unknown>)

key-files:
  created:
    - src/components/game-plan/labeled-edge.tsx
  modified:
    - src/lib/game-plan-graph.ts
    - src/components/game-plan/flowchart-view.tsx

key-decisions:
  - "LabeledEdge uses useState for isHovered + interactionWidth=20 for a wider hit area on thin edges"
  - "edgeTypes registered as default edge type — all edges use LabeledEdge, conditional tooltip logic inside component"
  - "String() cast used instead of as string cast for EdgeProps data fields — avoids TS2322 (unknown not assignable to ReactNode)"
  - "onEdgeMouseLeave reuses same reset logic as onNodeMouseLeave (full opacity restoration, animated: false)"

patterns-established:
  - "Custom edge components: BaseEdge + conditional EdgeLabelRenderer, useState for local hover, interactionWidth for hit area"
  - "Hover highlighting pattern: build connected Set from getIncomers/getOutgoers, then map setNodes/setEdges with opacity"

# Metrics
duration: 8min
completed: 2026-02-19
---

# Phase 3 Plan 01: Hover Path Highlighting and Edge Tooltips Summary

**React Flow hover highlighting via getIncomers/getOutgoers opacity dimming (0.2/0.15) with LabeledEdge tooltip on technique->position edges using EdgeLabelRenderer**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-02-19T00:00:00Z
- **Completed:** 2026-02-19T00:08:00Z
- **Tasks:** 2
- **Files modified:** 3 (1 created, 2 modified)

## Accomplishments

- Created LabeledEdge component: BaseEdge with 20px interaction width, useState hover, conditional EdgeLabelRenderer tooltip showing technique name and type
- Extended game-plan-graph.ts edge type to include optional data field; populated techniqueName/techniqueType on technique->position edges only
- Wired four hover handlers (onNodeMouseEnter/Leave, onEdgeMouseEnter/Leave) into FlowchartView — all wrapped in useCallback to prevent render loops
- Registered LabeledEdge as default edge type via edgeTypes constant outside component

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend edge data in graph builder and create LabeledEdge component** - `070eefe` (feat)
2. **Task 2: Wire hover highlighting and edge types into FlowchartView** - `13d04b2` (feat)

## Files Created/Modified

- `src/components/game-plan/labeled-edge.tsx` - Custom edge component with hover tooltip via EdgeLabelRenderer
- `src/lib/game-plan-graph.ts` - Edge type extended with optional data; technique->position edges get techniqueName/techniqueType
- `src/components/game-plan/flowchart-view.tsx` - edgeTypes, setEdges, four hover handlers, and edge data spread through initialEdges

## Decisions Made

- LabeledEdge uses `interactionWidth={20}` to expand the hover hit area on thin SVG edges
- `edgeTypes = { default: LabeledEdge }` makes all edges go through LabeledEdge; the component conditionally shows tooltip only when `data?.techniqueName` is present — so position->technique edges (no data) get no tooltip
- Used `String()` cast instead of `as string` for React Flow's `data` field (`EdgeProps.data` is `Record<string, unknown>`) to avoid TypeScript error TS2322 (unknown not assignable to ReactNode)
- `onEdgeMouseLeave` has the same reset logic as `onNodeMouseLeave` — aliasing was not done to keep types explicit (`NodeMouseHandler` vs `EdgeMouseHandler`)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript TS2322 error on EdgeProps data field**
- **Found during:** Task 1 (LabeledEdge component creation)
- **Issue:** `data.techniqueName as string` and `data.techniqueType && (...)` failed type-check because `EdgeProps.data` values are `unknown`, not assignable to ReactNode
- **Fix:** Changed to `String(data.techniqueName)` and `data.techniqueType != null && (...) { String(data.techniqueType) }` to avoid the type error
- **Files modified:** src/components/game-plan/labeled-edge.tsx
- **Verification:** `npx tsc --noEmit` passes with zero errors
- **Committed in:** 070eefe (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - type error bug)
**Impact on plan:** Necessary correctness fix — plan's original cast syntax incompatible with @xyflow/react EdgeProps type signature. No scope change.

## Issues Encountered

- React Flow's `EdgeProps.data` is typed as `Record<string, unknown>` — values are `unknown`, not directly renderable as JSX children. Required `String()` conversion instead of `as string` type assertions.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Hover highlighting and edge tooltips fully implemented and type-safe
- LabeledEdge pattern established for future custom edge variants
- Ready for 03-02 (export functionality) — FlowchartView is stable

---
*Phase: 03-enhanced-interactivity-export*
*Completed: 2026-02-19*

## Self-Check: PASSED

- FOUND: src/components/game-plan/labeled-edge.tsx
- FOUND: src/lib/game-plan-graph.ts
- FOUND: src/components/game-plan/flowchart-view.tsx
- FOUND: .planning/phases/03-enhanced-interactivity-export/03-01-SUMMARY.md
- COMMIT 070eefe: feat(03-01): extend edge data in graph builder and create LabeledEdge component
- COMMIT 13d04b2: feat(03-01): wire hover highlighting and edge types into FlowchartView
