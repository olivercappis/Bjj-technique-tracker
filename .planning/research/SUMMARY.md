# Project Research Summary

**Project:** BJJ Technique Tracker - Game Plan Flowchart Enhancement
**Domain:** Interactive technique flowchart visualization for Brazilian Jiu-Jitsu
**Researched:** 2026-02-16
**Confidence:** MEDIUM to HIGH

## Executive Summary

This project enhances an existing BJJ technique tracker with interactive game plan flowcharts using React Flow. The research reveals a critical architectural flaw: the current implementation embeds techniques inside position nodes instead of representing them as separate nodes in the flow. This undermines the primary value proposition of flowchart visualization - users need to see the explicit chain "Closed Guard → Scissor Sweep → Mount" not "Closed Guard (contains: scissor sweep, armbar, triangle...)".

The recommended approach is to rework the graph builder to create **separate position nodes (states) and technique nodes (transitions)** with explicit edges showing technique chains to resulting positions. This follows the established pattern for state transition diagrams and leverages React Flow's strengths. The existing stack (React Flow 12, Dagre layout, Zustand state management) is sound and requires no new dependencies - all necessary tools are already installed.

Key risks center on cyclic graph handling (BJJ naturally has position cycles unlike typical flowcharts) and performance optimization for custom React components. Dagre's limitations with cyclic graphs may require migration to ELK or cycle-breaking strategies. Strict memoization patterns are critical to prevent infinite re-render loops with 50+ nodes. Position persistence must coexist with auto-layout without fighting user customizations.

## Key Findings

### Recommended Stack

All core technologies are already installed and appropriate. No new dependencies needed for MVP.

**Core technologies:**
- **@xyflow/react 12.x**: Interactive flowchart rendering with custom nodes/edges — modern, well-maintained, sufficient APIs for all requirements
- **@dagrejs/dagre 2.x**: Hierarchical layout algorithm — adequate for initial implementation, may need ELK upgrade if cyclic graphs prove problematic
- **Zustand 5.x**: State management with localStorage persistence — perfect fit for React Flow integration, already proven in codebase
- **Radix UI / shadcn**: Multi-plan management UI components — Command palette, Sheet, Dialog already installed
- **CVA + Tailwind**: Type-based color coding and node styling — enables semantic visual distinction without additional libraries
- **Motion 12.x**: Node entrance animations — already installed, use sparingly to avoid distraction

**Key insight from STACK.md:** The existing technology choices are solid. The challenge is implementation patterns, not library selection. Consider ELK (elkjs) only if Dagre proves insufficient for handling position cycles in BJJ flowcharts.

### Expected Features

**Must have (table stakes):**
- Separate position and technique nodes (architectural rework required)
- Visual distinction by technique type (color-coded edges/nodes)
- Submissions styled as terminal endpoints
- Sweep/transition chaining to resulting positions
- Multi-plan UI (create, switch, rename, delete)
- Remove techniques from plans
- Click node to view technique details
- Drag-to-rearrange with position persistence
- Pan/zoom canvas navigation
- Auto-layout on initial render

**Should have (competitive differentiators):**
- Mini-map for large graphs (already implemented)
- Technique count badges on position nodes
- Export graph as image
- Hover edge to preview technique
- Empty state guidance for new users
- Multiple entry points (forest graph) — natural for BJJ
- Highlighting connected subgraphs on hover

**Defer (v2+):**
- Version history / undo (complex state management)
- Collapse/expand position nodes (requires React Flow parent-child architecture)
- Shortest path highlighting (advanced feature, unclear demand)
- Custom node colors (personalization, low priority)
- Social/sharing features (requires auth milestone)
- In-app technique creation (quality control concerns)

**Critical insight from FEATURES.md:** The separation of technique nodes from position nodes is the **primary competitive advantage** over existing BJJ apps and generic mind-mapping tools. This must be prioritized in Phase 1.

### Architecture Approach

The architecture follows unidirectional data flow: User actions update Zustand store → Graph builder transforms techniqueIds to nodes/edges → React Flow renders via custom components → User interactions persist back to store.

**Major components:**
1. **Zustand Store** (game-plan-store.ts) — Source of truth for game plans, techniqueIds, and user-customized node positions. Persists to localStorage.
2. **Graph Builder** (game-plan-graph.ts) — Pure transformation function converting techniqueIds array into React Flow graph structure. Currently flawed (embeds techniques in position nodes).
3. **FlowchartView** — React Flow container managing layout application (Dagre), position persistence, and node/edge type registration.
4. **Custom Nodes/Edges** — PositionNode, TechniqueNode (to be built), TechniqueEdge components with CVA-based type styling.

**Key pattern:** Graph structure is **derived state** (computed via useMemo from techniqueIds), never stored directly. Only techniqueIds (source data) and nodePositions (UI customizations) live in the store. This prevents sync issues and ensures single source of truth.

**Critical architectural change needed:** Rework `buildGamePlanGraph()` to produce:
- Position nodes: `{ id: "pos:closed-guard", type: "position", data: {position, category} }`
- Technique nodes: `{ id: "tech:scissor-sweep", type: "technique", data: {technique} }`
- Edges: `[{source: "pos:closed-guard", target: "tech:scissor-sweep"}, {source: "tech:scissor-sweep", target: "pos:mount"}]`

### Critical Pitfalls

1. **Infinite re-render loops from non-memoized node/edge arrays** — Creating new node/edge arrays on every render causes React Flow to constantly reset. Prevention: Always wrap graph building in useMemo with stable dependencies. Store node positions externally, not inline objects.

2. **Layout algorithm fighting user-dragged positions** — Dagre overwrites user customizations when graph data changes. Prevention: Track which nodes have been manually positioned, only auto-layout new nodes. Alternative: disable automatic re-layout entirely, offer manual "Reset Layout" button.

3. **Performance collapse with custom React components** — Complex custom nodes re-render excessively with 50+ nodes. Prevention: Memoize all custom node components with React.memo, pre-compute node data instead of calculating in render, avoid per-node store subscriptions.

4. **Cyclic graph rendering with Dagre** — BJJ has inherent cycles (Guard → Sweep → Mount → Escape → Guard). Dagre is designed for DAGs and may crash or produce overlapping nodes. Prevention: Research ELK for cycle-aware layouts, implement cycle detection and back-edge marking, or use force-directed layout for cyclic subgraphs.

5. **State management race conditions** — React Flow internal state vs Zustand store can desync. Prevention: Choose either fully controlled (Zustand as source of truth) or hybrid with explicit sync on drag end only. Never mix controlled/uncontrolled modes.

**BJJ-specific warning from PITFALLS.md:** Position cycles are fundamental to BJJ, not edge cases. Don't treat them as errors. Design graph structure to embrace them from the start.

## Implications for Roadmap

Based on research, suggested phase structure prioritizes the architectural rework before UI enhancements.

### Phase 1: Core Graph Architecture Rework
**Rationale:** The current graph builder embeds techniques in position nodes, undermining flowchart visualization value. Must fix architecture before building features on broken foundation. All research points to this as critical path blocker.

**Delivers:**
- Separate position and technique nodes in graph structure
- TechniqueNode custom component
- Simplified PositionNode (removes embedded technique lists)
- Edges showing position → technique → resulting position flow
- Type-based color coding (CVA variants for technique types)
- Submission endpoint styling (terminal nodes)

**Addresses:**
- Must-have features: Separate nodes, visual type distinction, submission endpoints, sweep chaining
- ARCHITECTURE.md recommendation: Rework graph builder pattern
- PITFALLS.md: Establish memoization early to prevent re-render loops

**Avoids:**
- Building multi-plan UI on flawed graph structure
- Rewriting features after architecture change
- Performance issues from unoptimized custom nodes

**Research flags:** Standard React Flow patterns, no deep research needed. However, test with cyclic graphs early to validate Dagre vs ELK decision.

### Phase 2: Multi-Plan Management & Persistence
**Rationale:** With core graph structure fixed, enable users to create and organize multiple game plans. Store foundation already exists, needs UI layer.

**Delivers:**
- Plan switcher UI (Command palette for quick switch)
- Plan management sidebar (Sheet with create/rename/delete)
- Plan list with metadata (created date, technique count)
- Keyboard shortcuts for plan switching
- Empty state guidance

**Uses:**
- Radix UI Command, Sheet, Dialog components (already installed)
- Zustand store CRUD operations (already implemented)

**Implements:**
- PlanManagement component (ARCHITECTURE.md component 4)

**Addresses:**
- Must-have feature: Multiple game plans
- FEATURES.md table stakes: Plan CRUD operations

**Avoids:**
- PITFALLS.md: Position persistence already implemented, ensure works across plan switches

**Research flags:** Standard UI patterns, no research needed.

### Phase 3: Enhanced Interactivity & Visualization
**Rationale:** Core functionality complete. Add quality-of-life features that improve usability and differentiate from competitors.

**Delivers:**
- Click node to view technique details (modal or side panel)
- Hover edge to preview technique (tooltip)
- Technique count badges on position nodes
- Highlight connected subgraphs on hover
- Remove technique from plan (delete button)
- Export graph as image (share functionality)

**Addresses:**
- Must-have: Click for details, remove techniques
- Should-have differentiators: Edge preview, connection highlighting, export
- FEATURES.md competitive features

**Avoids:**
- PITFALLS.md: Ensure event listeners cleaned up properly
- Performance degradation from excessive hover effects

**Research flags:** Export functionality may need brief research on React Flow screenshot API or html2canvas integration.

### Phase 4: Layout & Customization Polish
**Rationale:** Advanced features that enhance power user experience without blocking basic functionality.

**Delivers:**
- Fit view / zoom controls optimization
- Layout parameter tuning (node spacing, edge routing)
- Manual position override persistence refinement
- Duplicate game plan feature
- Game plan tags/labels for organization
- Dark mode edge/node styling refinement

**Addresses:**
- Should-have features: Duplicate plan, tags
- FEATURES.md deferred but valuable features

**Avoids:**
- PITFALLS.md #2: Finalize layout vs manual positioning strategy
- PITFALLS.md #6: Proper viewport handling on load

**Research flags:** None, polish and refinement phase.

### Future (Deferred Beyond Initial Milestone)
- Version history / undo (requires state snapshots)
- Collapse/expand nodes (requires React Flow architecture change)
- Mobile optimization (touch gestures, responsive layout)
- ELK migration if Dagre proves insufficient for cyclic graphs

### Phase Ordering Rationale

**Why Phase 1 first:** Architecture foundation must be correct before building features. Research consistently points to separate nodes as critical for value proposition. Attempting multi-plan UI or enhancements before fixing graph structure risks building on broken foundation requiring rewrites.

**Why Phase 2 before Phase 3:** Multi-plan management is table stakes (users expect multiple game plans for different scenarios). Interactive enhancements are polish. Users can work around missing tooltips, but cannot use product effectively with single plan limit.

**Why Phase 4 deferred:** Layout tuning and polish can iterate post-launch based on real usage patterns. Don't over-optimize prematurely.

**Dependency chain:**
- Phase 1 creates TechniqueNode component → Phase 3 interactions depend on this
- Phase 1 fixes graph structure → Phase 2 multi-plan UI displays these graphs
- Phase 2 creates plan switching → Phase 4 duplicate/tags enhance this

**Pitfall mitigation:**
- Phase 1 addresses PITFALLS #1, #3 (memoization, performance)
- Phase 2 tests PITFALLS #5 (state sync across plan switches)
- Phase 3 addresses PITFALLS #6, #10 (viewport, mobile if needed)
- Phase 4 finalizes PITFALLS #2 (layout vs manual positioning)

### Research Flags

**Phases needing deeper research:**
- **Phase 3 Export:** Brief investigation of React Flow's built-in screenshot API vs html2canvas library. Check bundle size impact.
- **Cyclic graph handling (if Dagre fails):** Migration to ELK may be needed during Phase 1 if testing reveals layout failures with BJJ position cycles. Decision point after initial Dagre implementation.

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** React Flow custom node patterns are well-documented
- **Phase 2:** Radix UI components have established usage patterns
- **Phase 4:** Refinement based on existing implementation

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing dependencies verified in codebase, no new libraries needed for MVP |
| Features | MEDIUM-HIGH | Feature research based on training data analysis of BJJ/flowchart apps, table stakes validated against existing codebase |
| Architecture | HIGH | Direct codebase analysis reveals current structure and required changes, React Flow patterns well-established |
| Pitfalls | MEDIUM-HIGH | Core pitfalls (re-renders, state sync) are well-documented React Flow issues; cyclic graph handling needs validation |

**Overall confidence:** MEDIUM-HIGH

Research is grounded in actual codebase analysis (high confidence) combined with training data about React Flow patterns (medium confidence due to lack of 2026 documentation access). The architectural recommendations are sound based on established patterns.

### Gaps to Address

**Cyclic graph layout verification:** Dagre is designed for DAGs. BJJ game plans inherently have cycles (sweeps that return to earlier positions). Testing during Phase 1 may reveal need for ELK migration. Strategy:
- Build Phase 1 with Dagre
- Test with realistic cyclic game plans (10+ techniques including sweeps)
- If layout fails (overlapping nodes, crashes), migrate to ELK before Phase 2
- Have ELK migration plan ready as contingency

**Mobile/touch experience:** Research unable to verify React Flow 12's current touch gesture capabilities. PITFALLS.md flags this as potential issue. Strategy:
- Design Phase 1-3 with desktop-first approach
- Test on tablet during Phase 3
- If touch UX poor, Phase 4 includes mobile optimization or accept desktop-only scope

**Version numbers:** Research conducted without web access, cannot verify latest 2026 package versions. Strategy:
- Current package.json shows @xyflow/react@12.10.0, @dagrejs/dagre@2.0.4, zustand@5.x
- These versions verified working in existing codebase
- No version upgrades recommended during roadmap execution
- Validate changelog only if bugs encountered

**Performance at scale:** Unknown if target users will create 50+ technique game plans or stay under 20. Strategy:
- Build Phase 1 with memoization best practices
- Test with 50-node graphs during Phase 2
- Phase 3 adds monitoring/profiling if performance issues emerge
- ELK migration or virtualization only if needed

## Sources

### Primary (HIGH confidence)
- **Codebase analysis:** Direct examination of existing implementation at C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/
  - src/stores/game-plan-store.ts (Zustand implementation)
  - src/lib/game-plan-graph.ts (current graph builder logic)
  - src/components/game-plan/* (React Flow integration)
  - package.json (installed dependencies)
- **Existing code patterns:** React Flow 12, Zustand 5, Radix UI usage already validated in working codebase

### Secondary (MEDIUM confidence)
- **Training data (Jan 2025):** React Flow documentation patterns, Dagre vs ELK comparisons, React optimization best practices
- **Domain analysis:** BJJ app landscape (BJJ Fanatics, Grappler's Guide, Digitsu) and flowchart tools (Miro, Lucidchart) from training data
- **Zustand + React Flow integration patterns** from community examples in training data

### Tertiary (LOW confidence - requires validation)
- **2026 package versions:** Cannot verify latest releases without web access
- **ELK library status:** Training data from 2025, may have updates in 2026
- **React Flow 12 specific features:** EdgeLabelRenderer, custom node APIs assumed stable but not verified against 2026 docs

### Verification recommended
- React Flow official docs (reactflow.dev) for current v12 API
- ELK library (Eclipse Layout Kernel) if cyclic graph layout becomes necessary
- Performance benchmarks for Dagre vs ELK with 50-100 node graphs

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
*Next step: Requirements definition using this summary as foundation*
