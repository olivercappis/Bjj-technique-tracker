# Milestones

## v1.0 MVP (Shipped: 2026-02-19)

**Phases completed:** 3 phases, 8 plans, 17 tasks
**Timeline:** 3 days (2026-02-17 → 2026-02-19)
**Lines of code:** +2,050 TypeScript/TSX across 23 source files
**Git range:** feat(01-01) `7476c77` → docs(phase-03) `fb23a17`

**Delivered:** Complete game plan visualization tool with bipartite flowchart, multi-plan management, interactive node details, and PNG export.

**Key accomplishments:**
1. Bipartite graph architecture — positions and techniques as separate, color-coded nodes with submission glow endpoints
2. Sweep/transition chaining — techniques with `resultingPositionId` create forward edges making the game plan a true "flow" chart
3. Full plan management UI — create, rename, delete, duplicate, switch between named game plans with gi/no-gi/competition tags
4. Interactive flowchart — hover path highlighting, edge tooltips, click-to-detail sheets for techniques and positions
5. Click-to-detail panels — technique detail sheet (steps, tips, difficulty) and position browser sheet with Add to Plan
6. PNG export — one-click 1920x1080 flowchart export with no UI chrome via html-to-image@1.11.11

---

