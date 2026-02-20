---
phase: 01-graph-architecture-rework
plan: "01"
subsystem: ui
tags: [react-flow, typescript, graph, bipartite, bjj, flowchart]

# Dependency graph
requires: []
provides:
  - Bipartite graph builder producing separate position nodes (pos-) and technique nodes (tech-)
  - PositionFlowNode and TechniqueFlowNode TypeScript interfaces
  - TechniqueNode React component with 6 type-based colors and submission glow
  - PositionNode React component with name + technique count badge
affects:
  - 01-02 (FlowchartView wiring and Dagre layout)
  - game-plan page

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Bipartite graph pattern: positions and techniques as separate node types connected by directed edges
    - Prefixed node IDs: pos-{id} for positions, tech-{id} for techniques to prevent collisions
    - Submissions as terminal nodes: isSubmission=true, no outgoing Handle, no technique->position edge
    - Memoized React Flow custom nodes for render performance

key-files:
  created:
    - src/components/game-plan/technique-node.tsx
  modified:
    - src/lib/game-plan-graph.ts
    - src/components/game-plan/position-node.tsx

key-decisions:
  - "Bipartite graph: techniques are first-class nodes (not embedded in position nodes) enabling type-based styling and sweep chaining"
  - "Submissions have no outgoing Handle and generate no technique->position edge — they are terminal nodes"
  - "Submission nodes get glow via box-shadow for extra visual emphasis per user decision"
  - "Position nodes show only name + count badge (no embedded technique lists) for clean minimal UI"

patterns-established:
  - "Node ID scheme: pos-{positionId} and tech-{techniqueId} — always prefix to prevent ID collisions"
  - "techniqueCount on position nodes counts only plan-selected techniques (not all techniques in data)"
  - "All nodes initialize at x:0,y:0 — layout is applied separately by Dagre in FlowchartView"

# Metrics
duration: 1min
completed: 2026-02-17
---

# Phase 1 Plan 01: Graph Architecture Foundation Summary

**Bipartite React Flow graph with position nodes (rounded rectangles) and technique nodes (colored pills), replacing the old embedded-technique-in-position design**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-17T21:33:15Z
- **Completed:** 2026-02-17T21:34:27Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- `buildGamePlanGraph` now produces flat arrays of `PositionFlowNode` and `TechniqueFlowNode` with prefixed IDs, replacing the old `GamePlanNode` embedding technique lists
- Edges correctly implement: position->technique for all selected techniques, technique->resultingPosition for non-submissions only
- `TechniqueNode` renders as a pill/capsule with 6 distinct type colors matching existing edge colors; submissions get glow and no outgoing handle
- `PositionNode` simplified to rounded rectangle with name and technique count badge (no embedded technique lists or perspective color logic)

## Task Commits

Each task was committed atomically:

1. **Task 1: Rework graph builder to produce bipartite position + technique nodes** - `7476c77` (feat)
2. **Task 2: Create technique node component and rework position node component** - `7c1be8e` (feat)

**Plan metadata:** _(docs commit to follow)_

## Files Created/Modified

- `src/lib/game-plan-graph.ts` - Rewritten: exports `buildGamePlanGraph`, `PositionFlowNode`, `TechniqueFlowNode`; old `GamePlanNode`/`GamePlanEdge` removed
- `src/components/game-plan/technique-node.tsx` - New file: pill-shaped memoized node with 6 type colors and submission glow
- `src/components/game-plan/position-node.tsx` - Reworked: clean rounded rectangle with name + techniqueCount badge; all old technique-list logic removed

## Decisions Made

- Techniques are now first-class nodes (not embedded in positions): this is the core architectural change enabling type-based styling and sweep/transition chaining
- Submission nodes have no outgoing Handle and no technique->resultingPosition edge — submissions are terminal in a BJJ game plan
- Submission nodes use `box-shadow` glow for visual emphasis (user-decided styling)
- Position nodes show only name and count badge — minimal and clean per user decision

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript errors after Task 1 in `flowchart-view.tsx` and `list-view.tsx` are expected downstream consumers referencing old types — they will be fixed in Plan 02.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Graph builder and node components are complete; Plan 02 can wire `TechniqueNode` and `PositionNode` into `FlowchartView` with Dagre layout
- Downstream consumers (`flowchart-view.tsx`, `list-view.tsx`, `game-plan.tsx` page) still reference old `GamePlanNode`/`GamePlanEdge` types and will need updating in Plan 02
- No blockers for Plan 02 execution

---
*Phase: 01-graph-architecture-rework*
*Completed: 2026-02-17*

## Self-Check: PASSED

- FOUND: src/lib/game-plan-graph.ts
- FOUND: src/components/game-plan/technique-node.tsx
- FOUND: src/components/game-plan/position-node.tsx
- FOUND: .planning/phases/01-graph-architecture-rework/01-01-SUMMARY.md
- FOUND commit: 7476c77 (feat: rework graph builder)
- FOUND commit: 7c1be8e (feat: create TechniqueNode and rework PositionNode)
