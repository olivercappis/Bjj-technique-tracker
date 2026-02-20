---
phase: 03-enhanced-interactivity-export
plan: "03"
subsystem: ui
tags: [react, react-flow, html-to-image, png-export, flowchart]

# Dependency graph
requires:
  - phase: 03-02
    provides: TechniqueDetailSheet and PositionBrowserSheet wired to onNodeClick in FlowchartView
provides:
  - ExportButton component using html-to-image toPng with React Flow viewport utilities
  - PNG export of game plan flowchart at 1920x1080 with all nodes and edges, no UI chrome
  - Human verification of all Phase 3 features (INTX-01, INTX-02, INTX-06, INTX-07, EXPRT-01)
affects: []

# Tech tracking
tech-stack:
  added: [html-to-image@1.11.11]
  patterns:
    - ExportButton uses useReactFlow().getNodes() + getNodesBounds + getViewportForBounds for accurate viewport transform
    - filter callback excludes react-flow__minimap, react-flow__controls, react-flow__panel classes from PNG output
    - Panel position="top-right" inside ReactFlow for ExportButton — mirrors Legend Panel position="top-left" pattern

key-files:
  created:
    - src/components/game-plan/export-button.tsx
  modified:
    - src/components/game-plan/flowchart-view.tsx
    - package.json

key-decisions:
  - "html-to-image pinned at exactly 1.11.11 — newer versions have CSS regression and browser freeze bugs"
  - "ExportButton rendered as Panel inside ReactFlow (not outside) — required for useReactFlow() context access"
  - "filter callback uses classList.contains to strip UI overlays — minimap, controls, and all panels excluded from PNG"
  - "IMAGE_WIDTH=1920, IMAGE_HEIGHT=1080 as export constants — produces high-resolution output suitable for sharing"

patterns-established:
  - "Panel component pattern: top-left for Legend, top-right for ExportButton — symmetric placement inside ReactFlow"

# Metrics
duration: 5min
completed: 2026-02-19
---

# Phase 3 Plan 03: Export Button Summary

**PNG export of React Flow game plan flowchart using html-to-image@1.11.11 with viewport transform for accurate 1920x1080 output, plus human verification of all 5 Phase 3 interactivity requirements**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-02-19T19:16:00Z
- **Completed:** 2026-02-19T19:21:31Z
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 3

## Accomplishments
- Installed html-to-image@1.11.11 (exact version, pinned for stability)
- Created ExportButton component with viewport-aware PNG generation excluding UI chrome
- Wired ExportButton as Panel inside FlowchartView alongside existing Legend Panel
- Human verified all 5 Phase 3 requirements: hover highlighting, edge tooltips, technique detail Sheet, position browser Sheet, PNG export

## Task Commits

Each task was committed atomically:

1. **Task 1: Install html-to-image and create ExportButton component** - `aa21818` (feat)
2. **Task 2: Visual verification of all Phase 3 features** - human-verify checkpoint, approved

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/components/game-plan/export-button.tsx` - ExportButton component using toPng with viewport transform and UI filter
- `src/components/game-plan/flowchart-view.tsx` - Added ExportButton Panel at top-right inside ReactFlow
- `package.json` - html-to-image@1.11.11 added as exact dependency

## Decisions Made
- html-to-image pinned at exactly 1.11.11 — newer versions have CSS regression and browser freeze bugs; exactness enforced via package.json
- ExportButton rendered as Panel inside ReactFlow (not a sibling outside) — required for useReactFlow() context access to call getNodes(), getNodesBounds(), getViewportForBounds()
- filter callback uses classList.contains to strip react-flow__minimap, react-flow__controls, and react-flow__panel from the PNG — clean export with no UI chrome
- IMAGE_WIDTH=1920, IMAGE_HEIGHT=1080 constants — produces high-res 1080p output suitable for sharing with training partners

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 3 is fully complete. All 5 Phase 3 requirements verified by human:
- INTX-01: Technique node click opens detail Sheet with name, type, difficulty, description, steps, tips
- INTX-02: Position node click opens browser Sheet with Add to Plan functionality
- INTX-06: Hover highlighting dims unconnected nodes and edges
- INTX-07: Edge tooltip shows technique name and type on technique->position edges only
- EXPRT-01: Export PNG button downloads 1920x1080 flowchart image with no UI chrome

No regressions in Phase 1 (graph architecture) or Phase 2 (plan management) features confirmed during human verification.

The project is now at a complete milestone — all planned phases delivered.

---
*Phase: 03-enhanced-interactivity-export*
*Completed: 2026-02-19*
