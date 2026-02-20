# Phase 1: Graph Architecture Rework - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Rework the game plan flowchart so positions and techniques are separate, visually distinct nodes. Positions chain through sweeps and transitions to show how a user's BJJ game flows. Pan, zoom, drag-to-customize layout, and technique count badges are in scope. Multi-plan management and detail views are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Node visual design
- Position nodes and technique nodes use **different shapes** — positions as rounded rectangles, techniques as pills/capsules (or similar shape contrast)
- Position nodes show **name + small count badge** — position name centered, subtle technique count badge in the corner. Minimal and clean.
- Technique nodes show **name only** — type is conveyed through color, keep the node compact

### Technique type colors
- **Color palette: Claude's discretion** — pick a palette that balances readability and aesthetics across the 6 technique types (submissions, sweeps, escapes, transitions, passes, takedowns)
- **Submission nodes get extra visual emphasis** — thicker border, slight glow, or icon to make them feel like terminal endpoints. They should stand out beyond just their color.
- **Color application: Claude's discretion** — choose between background fill, border accent, or whatever approach reads best with the node shapes
- **Color legend: toggleable** — hidden by default, shown via a button. Keeps the canvas clean while remaining accessible.

### Claude's Discretion
- Specific color palette selection for 6 technique types
- How technique type color is applied to nodes (fill vs border accent vs other)
- Exact node dimensions, spacing, and typography
- Loading skeleton design
- Error state handling
- Graph layout direction and arrangement
- Connection/edge styling (arrow types, thickness, curves)

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-graph-architecture-rework*
*Context gathered: 2026-02-16*
