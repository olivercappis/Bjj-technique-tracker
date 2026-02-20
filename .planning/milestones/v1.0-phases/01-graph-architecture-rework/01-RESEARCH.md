# Phase 1: Graph Architecture Rework - Research

**Researched:** 2026-02-17
**Domain:** React Flow (@xyflow/react) graph visualization — node rework, custom node types, Dagre layout, position persistence
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Node visual design
- Position nodes and technique nodes use **different shapes** — positions as rounded rectangles, techniques as pills/capsules (or similar shape contrast)
- Position nodes show **name + small count badge** — position name centered, subtle technique count badge in the corner. Minimal and clean.
- Technique nodes show **name only** — type is conveyed through color, keep the node compact

#### Technique type colors
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

## Summary

This phase reworks the existing game plan flowchart from a position-only graph (where techniques are listed inside position nodes) into a bipartite graph with two visually distinct node types: position nodes and technique nodes. The architecture is already partially built — `@xyflow/react` v12, `@dagrejs/dagre` v2, and Zustand with persist middleware are all installed and wired up. The existing `FlowchartView`, `PositionNode`, `TechniqueEdge`, and `game-plan-graph.ts` files are the direct targets for rework.

The core architectural change is that `buildGamePlanGraph` currently produces only position nodes with techniques embedded as edge labels. The rework must produce two node types: `position` nodes and `technique` nodes, with edges connecting `position → technique` and (for sweeps/transitions) `technique → resulting-position`. Submission technique nodes are terminal — they have no outgoing edge and require distinct visual treatment (thicker border + glow via `box-shadow`).

All infrastructure needed to execute this phase exists in the project. No new dependencies are required. The work is primarily a rework of the graph builder, two new/revised node components, and visual styling decisions.

**Primary recommendation:** Rework `buildGamePlanGraph` to output separate position and technique nodes, create a `TechniqueNode` component alongside the updated `PositionNode`, and update `FlowchartView` to register both node types. Keep Dagre layout and Zustand position persistence unchanged — they already work correctly.

---

## Standard Stack

### Core (already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@xyflow/react` | ^12.10.0 | Interactive graph canvas, node/edge rendering, pan/zoom/drag | De facto standard for React graph UIs; used internally by many visual tools |
| `@dagrejs/dagre` | ^2.0.4 | Auto-layout via directed acyclic graph rank algorithm | Widely used with React Flow; handles complex multi-root DAG layouts |
| `zustand` | ^5.0.11 | Node position persistence across sessions | Already stores `nodePositions: Record<string, {x,y}>` per game plan |
| `tailwindcss` | ^4.1.18 | Node and edge styling | Already in use project-wide |

### No new dependencies needed

All required capabilities are covered by the installed stack. The project does not need to add any new packages for this phase.

---

## Architecture Patterns

### Current Architecture (to be replaced)

```
GamePlan
  └─ buildGamePlanGraph()
       └─ GamePlanNode (position)   ← techniques listed inside
            └─ GamePlanEdge         ← technique name as edge label
```

**Problem:** Techniques are not independent nodes. They cannot have their own shape, color, or handles. Submission nodes cannot be styled as terminals. Technique count badges require listing all techniques, not representing them as nodes.

### New Architecture (target)

```
GamePlan
  └─ buildGamePlanGraph()
       ├─ PositionNode  ──edge──►  TechniqueNode (non-submission)  ──edge──►  PositionNode
       └─ PositionNode  ──edge──►  TechniqueNode (submission)       [no outgoing edge]
```

Each technique in the user's plan becomes its own React Flow node. Positions are standalone nodes that hold a count badge. Sweeps and transitions that have a `resultingPositionId` create a second edge from technique to target position.

### Recommended File Structure

```
src/
├── components/
│   └── game-plan/
│       ├── flowchart-view.tsx      # Updated: registers both node types, new node dimensions
│       ├── position-node.tsx       # Updated: remove embedded techniques, add count badge
│       ├── technique-node.tsx      # NEW: pill/capsule shape, color by type, glow for submissions
│       ├── color-legend.tsx        # NEW: toggleable legend panel
│       ├── list-view.tsx           # Unchanged
│       ├── empty-state.tsx         # Unchanged
│       └── add-to-plan-button.tsx  # Unchanged
├── lib/
│   └── game-plan-graph.ts          # CORE REWORK: output separate position + technique nodes
└── types/
    └── game-plan.ts                # Potentially extend if new node type data is needed
```

### Pattern 1: Bipartite Node ID Scheme

**What:** Use a prefixed ID convention to distinguish position nodes from technique nodes inside React Flow, since both live in the same flat node array.

**When to use:** Any time two domain types share a flat React Flow node list.

```typescript
// Position node ID: use the position ID directly
const positionNodeId = `pos-${positionId}`;

// Technique node ID: prefix with "tech-" to avoid collisions with position IDs
const techniqueNodeId = `tech-${techniqueId}`;

// Edge: position -> technique
{ id: `edge-pos-tech-${techniqueId}`, source: `pos-${positionId}`, target: `tech-${techniqueId}` }

// Edge: technique -> resulting position (sweeps/transitions only)
{ id: `edge-tech-pos-${techniqueId}`, source: `tech-${techniqueId}`, target: `pos-${resultingPositionId}` }
```

**Important:** The existing `nodePositions` in Zustand is `Record<string, {x, y}>` keyed by node ID. After the rework, saved positions for old position-only IDs will no longer match the new prefixed IDs. The rework should use a migration or simply clear saved positions on first load with the new schema. Using `pos-${id}` for positions and `tech-${id}` for techniques is the clean solution.

### Pattern 2: Updated Graph Builder Output

**What:** `buildGamePlanGraph` currently returns `GamePlanNode[]` (positions) and `GamePlanEdge[]` (technique-labeled edges). The rework changes the return type to match React Flow's `Node[]` and `Edge[]` directly, or introduces typed intermediate types.

```typescript
// Source: game-plan-graph.ts — new return signature
export interface PositionFlowNode {
  id: string;                  // "pos-{positionId}"
  type: "position";
  data: {
    positionId: string;
    name: string;
    techniqueCount: number;    // total techniques in plan from this position
  };
}

export interface TechniqueFlowNode {
  id: string;                  // "tech-{techniqueId}"
  type: "technique";
  data: {
    techniqueId: string;
    name: string;
    techniqueType: TechniqueType;
    isSubmission: boolean;     // used to suppress outgoing handle + apply glow
  };
}

export function buildGamePlanGraph(techniqueIds: string[]): {
  positionNodes: PositionFlowNode[];
  techniqueNodes: TechniqueFlowNode[];
  edges: FlowEdge[];
};
```

### Pattern 3: Custom Node Components

**What:** Both node types are standalone memoized React components registered in the `nodeTypes` map in `FlowchartView`.

**Source:** [React Flow Custom Nodes docs](https://reactflow.dev/learn/customization/custom-nodes)

```typescript
// flowchart-view.tsx — defined OUTSIDE component to avoid re-registration on render
const nodeTypes = {
  position: PositionNode,
  technique: TechniqueNode,
};

// CRITICAL: nodeTypes must be defined outside the component or wrapped in useMemo.
// Defining it inline causes React Flow to re-register nodes on every render,
// which breaks drag state and causes visual glitches.
```

```typescript
// position-node.tsx
import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

function PositionNodeComponent({ data }: { data: PositionNodeData }) {
  return (
    <div className="rounded-xl border-2 border-border bg-card px-4 py-3 min-w-[160px] relative">
      <Handle type="target" position={Position.Top} />
      <p className="text-sm font-bold text-foreground text-center">{data.name}</p>
      {/* Count badge — absolute positioned, top-right corner */}
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center
                       rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
        {data.techniqueCount}
      </span>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
export const PositionNode = memo(PositionNodeComponent);
```

```typescript
// technique-node.tsx
function TechniqueNodeComponent({ data }: { data: TechniqueNodeData }) {
  const colorStyle = techniqueColors[data.techniqueType];
  const isSubmission = data.isSubmission;

  return (
    <div
      className="rounded-full px-3 py-1.5 text-xs font-medium border-2 whitespace-nowrap"
      style={colorStyle}  // includes box-shadow glow for submissions
    >
      <Handle type="target" position={Position.Top} />
      {data.name}
      {/* NO source Handle for submissions */}
      {!isSubmission && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
}
export const TechniqueNode = memo(TechniqueNodeComponent);
```

### Pattern 4: Dagre Layout with Two Node Types

**What:** Dagre treats all nodes equally regardless of their visual type. The graph builder passes both position and technique nodes to Dagre with appropriate dimensions.

```typescript
// flowchart-view.tsx — updated applyDagreLayout
const POSITION_NODE_WIDTH = 180;
const POSITION_NODE_HEIGHT = 70;
const TECHNIQUE_NODE_WIDTH = 140;  // pill shape, narrower
const TECHNIQUE_NODE_HEIGHT = 36;

function applyDagreLayout(nodes: Node[], edges: Edge[], savedPositions?: Record<string, {x:number, y:number}>): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 60, ranksep: 80 });

  for (const node of nodes) {
    const isPosition = node.type === "position";
    g.setNode(node.id, {
      width: isPosition ? POSITION_NODE_WIDTH : TECHNIQUE_NODE_WIDTH,
      height: isPosition ? POSITION_NODE_HEIGHT : TECHNIQUE_NODE_HEIGHT,
    });
  }
  // ... rest of layout unchanged
}
```

### Pattern 5: Submission Glow Effect

**What:** Submission nodes get a CSS `box-shadow` glow using inline styles. Tailwind cannot express arbitrary glow colors dynamically, so inline style is the correct approach here.

```typescript
// technique-node.tsx — color definitions
const techniqueColors: Record<TechniqueType, React.CSSProperties> = {
  submission: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",   // red-500/12
    borderColor: "#ef4444",                          // red-500
    color: "#fca5a5",                               // red-300
    borderWidth: "2px",
    boxShadow: "0 0 10px 2px rgba(239, 68, 68, 0.35), 0 0 20px 4px rgba(239, 68, 68, 0.15)",
  },
  sweep: {
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "#3b82f6",
    color: "#93c5fd",
    borderWidth: "2px",
  },
  escape: {
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "#10b981",
    color: "#6ee7b7",
    borderWidth: "2px",
  },
  transition: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "#f59e0b",
    color: "#fcd34d",
    borderWidth: "2px",
  },
  pass: {
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    borderColor: "#8b5cf6",
    color: "#c4b5fd",
    borderWidth: "2px",
  },
  takedown: {
    backgroundColor: "rgba(249, 115, 22, 0.12)",
    borderColor: "#f97316",
    color: "#fdba74",
    borderWidth: "2px",
  },
};
```

**Palette rationale:** These 6 colors (red, blue, emerald, amber, violet, orange) are already used in `technique-edge.tsx` — carry them from edges to nodes for visual consistency. Submissions use red with a double-layered `box-shadow` glow (tight + diffuse) for the terminal emphasis. All use translucent fill + colored border to keep the dark theme readable.

### Pattern 6: Toggleable Color Legend

**What:** A floating panel component, hidden by default, toggled via a button in the canvas UI.

```typescript
// color-legend.tsx
export function ColorLegend({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Panel position="top-right" className="bg-card border border-border rounded-xl p-3 shadow-lg">
      <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
        Technique Types
      </div>
      {Object.entries(legendItems).map(([type, label]) => (
        <div key={type} className="flex items-center gap-2 text-xs mb-1">
          <span className="w-3 h-3 rounded-full" style={{ background: legendColors[type] }} />
          {label}
        </div>
      ))}
    </Panel>
  );
}

// In FlowchartView:
const [legendVisible, setLegendVisible] = useState(false);
// ... inside ReactFlow:
<Panel position="top-left">
  <button onClick={() => setLegendVisible(v => !v)}>Legend</button>
</Panel>
<ColorLegend visible={legendVisible} />
```

**Source:** React Flow `Panel` component is a built-in component from `@xyflow/react` for placing UI elements overlaid on the canvas.

### Anti-Patterns to Avoid

- **Inline `nodeTypes` object:** Defining `nodeTypes = { position: PositionNode }` inside the component body causes React Flow to re-mount nodes on every render. Always define outside the component or memoize.
- **Accessing `nodes` from outside ReactFlowProvider:** React Flow's internal state cannot be accessed outside the `<ReactFlow>` subtree. The existing pattern of using `onNodeDragStop` to read `nodes` from `useNodesState` is correct.
- **Setting node positions before Dagre completes:** Nodes must be initialized with `position: { x: 0, y: 0 }` and then the layout is applied in a `useMemo`. The existing pattern already handles this correctly.
- **Mixing `resultingPositionId` edge creation in position nodes:** The current `buildGamePlanGraph` only creates edges when a technique has `resultingPositionId` AND is not a submission. The new builder must preserve this — submission edges go from position to technique only (terminal).
- **Re-running Dagre on every drag:** Dagre should only run once on initial render (or when techniqueIds change). Saved positions from Zustand bypass Dagre per-node. The existing approach is correct — keep it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Graph layout algorithm | Custom tree positioning | Dagre (`@dagrejs/dagre`) | Multi-root DAG layout with cycle detection is non-trivial; Dagre handles rank assignment, crossing minimization, node separation |
| Pan/zoom/drag canvas | Custom pointer event handlers | React Flow (`@xyflow/react`) | Handles pointer events, touch, pinch-zoom, keyboard shortcuts, accessibility, minimap sync |
| Node drag persistence | Custom localStorage writes | Zustand persist middleware | Already in place; `updateNodePositions` writes on drag stop, rehydrated on mount |
| Edge path calculation | Manual Bezier math | `getBezierPath` from `@xyflow/react` | Already used in `TechniqueEdge`; handles source/target position offsets correctly |
| Canvas UI overlays (legend, controls) | Absolute positioned divs | React Flow `Panel` component | Panel is viewport-aware and doesn't interfere with pan/zoom event propagation |

**Key insight:** The project already has the full stack configured correctly. The rework is purely a data model and component redesign — not a library selection problem.

---

## Common Pitfalls

### Pitfall 1: nodeTypes defined inside the component

**What goes wrong:** React Flow unmounts and remounts every node on each render when `nodeTypes` is a new object reference. This causes flickering, lost drag state, and unnecessary DOM churn.

**Why it happens:** JavaScript object literals create a new reference on every call. If `const nodeTypes = { position: PositionNode }` is inside `FlowchartView`, it's a new object on every render.

**How to avoid:** Define `nodeTypes` and `edgeTypes` as module-level constants (outside any component). The existing code already does this correctly — maintain this pattern when adding `technique` to `nodeTypes`.

**Warning signs:** Nodes briefly disappear then reappear when other state changes, drag handles reset position on unrelated state updates.

### Pitfall 2: Node ID collisions between positions and techniques

**What goes wrong:** If a technique ID happens to equal a position ID (both are strings), React Flow will have two nodes with the same ID, causing silent bugs in edge rendering and position tracking.

**Why it happens:** `positions` and `techniques` are separate data collections but their IDs are generated independently.

**How to avoid:** Always prefix: `pos-${positionId}` and `tech-${techniqueId}`. Update edge source/target references accordingly. Update `updateNodePositions` saves to use the new prefixed IDs.

**Warning signs:** Edges disappear, nodes snap to wrong positions, Zustand persisted positions not applied correctly.

### Pitfall 3: Saved positions breaking after node ID scheme change

**What goes wrong:** Users who have saved custom node positions in localStorage will have their positions keyed by old IDs (unprefixed position IDs). After the rework introduces `pos-${id}` prefixes, their saved positions will not match any node and all positions will fall back to Dagre.

**Why it happens:** `GamePlan.nodePositions` is persisted to localStorage by Zustand. The rework changes the ID scheme.

**How to avoid:** Two options:
1. Increment the Zustand store version from `1` to `2` — this triggers Zustand's persist migration, clearing old position data cleanly. Users get fresh Dagre layout, which is acceptable.
2. Write a migration function in the persist config's `migrate` option that remaps old keys to `pos-${key}`.

**Recommendation:** Increment version to `2`. Migration is low value here since position customizations are cosmetic.

### Pitfall 4: Submission Handle omission breaking Dagre edge registration

**What goes wrong:** Dagre layout is computed from edges passed to it, not from React Flow handles. Dagre only needs the edge list — it does not care about React Flow handle configuration. The Handle component in React Flow controls user interaction (whether a user can drag to create new connections), not whether programmatic edges exist.

**Why it happens:** Confusion between the React Flow interaction layer (handles) and the data layer (edges in the `edges` array).

**How to avoid:** For submission technique nodes, simply omit the `<Handle type="source" ...>` component — this prevents users from dragging new connections from them. But do NOT omit the submission node from the Dagre node list or edge list. The position-to-technique edge still needs to be in both Dagre and React Flow's edges array.

**Warning signs:** Submission nodes float at (0,0) after layout because they were not registered with Dagre.

### Pitfall 5: Technique count badge counting wrong techniques

**What goes wrong:** The count badge on position nodes should show how many techniques from the user's game plan originate from that position — not the total number of techniques that exist for that position in the data.

**Why it happens:** Confusing `techniques.filter(t => t.positionId === posId)` (all techniques) with `selectedTechniques.filter(t => t.positionId === posId)` (plan techniques).

**How to avoid:** Compute `techniqueCount` inside `buildGamePlanGraph` from the `selectedTechniques` array, not from the raw `techniques` data array.

### Pitfall 6: Re-render storm from `getActiveGamePlan()` in render

**What goes wrong:** `getActiveGamePlan()` is a function that reads from Zustand state. The existing `FlowchartView` calls it directly in the render body. If the Zustand store updates frequently (e.g., during drag stop), this can cause repeated re-renders.

**Why it happens:** `getActiveGamePlan` creates a new object reference on each call, making React think state changed even if the plan content is the same.

**How to avoid:** Select specific fields from the store with selectors: `useGamePlanStore(s => s.gamePlans.find(p => p.id === s.activeGamePlanId)?.nodePositions)`. This is a known React Flow + Zustand pattern.

---

## Code Examples

Verified patterns from official sources and existing codebase:

### Dagre Layout Integration (existing working pattern to preserve)

```typescript
// Source: flowchart-view.tsx (existing) — verified against reactflow.dev/examples/layout/dagre
function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  savedPositions?: Record<string, { x: number; y: number }>
): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 80, ranksep: 120 });

  for (const node of nodes) {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const saved = savedPositions?.[node.id];
    if (saved) return { ...node, position: { x: saved.x, y: saved.y } };
    const dagreNode = g.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x - NODE_WIDTH / 2,
        y: dagreNode.y - NODE_HEIGHT / 2,
      },
    };
  });
}
```

### Position Persistence on Drag Stop (existing working pattern to preserve)

```typescript
// Source: flowchart-view.tsx (existing)
const onNodeDragStop = useCallback(() => {
  const positions: Record<string, { x: number; y: number }> = {};
  for (const n of nodes) {
    positions[n.id] = n.position;
  }
  updateNodePositions(positions);
}, [nodes, updateNodePositions]);
```

### Edge Bezier Path (existing working pattern to preserve)

```typescript
// Source: technique-edge.tsx (existing) — verified against reactflow.dev/api-reference
const [edgePath, labelX, labelY] = getBezierPath({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
});
```

### React Flow Panel for Legend Toggle

```typescript
// Source: reactflow.dev/api-reference/components/panel
import { Panel } from "@xyflow/react";

// Inside <ReactFlow>:
<Panel position="top-right">
  <button onClick={() => setLegendVisible(v => !v)}>
    Show Legend
  </button>
</Panel>
```

### Zustand Store Version Increment for Migration

```typescript
// Source: zustand/middleware persist — zustand.docs.pmnd.rs
export const useGamePlanStore = create<GamePlanState>()(
  persist(
    (set, get) => ({ /* ... */ }),
    {
      name: "bjj-game-plans",
      version: 2,  // Increment from 1 → 2 to clear stale nodePositions
    }
  )
);
```

---

## What Already Exists vs. What Needs Building

| Item | Status | Notes |
|------|--------|-------|
| `@xyflow/react` setup | EXISTS — working | `FlowchartView` renders correctly |
| Dagre auto-layout | EXISTS — working | `applyDagreLayout` in `FlowchartView` |
| Position persistence (Zustand) | EXISTS — working | `updateNodePositions` + persist middleware |
| Pan/zoom/drag | EXISTS — working | Standard React Flow props in `FlowchartView` |
| `PositionNode` component | EXISTS — needs rework | Remove embedded techniques list, add count badge, simplify shape |
| `TechniqueNode` component | MISSING — build new | Pill shape, color by type, glow for submissions, no source handle for submissions |
| `buildGamePlanGraph` | EXISTS — needs rework | Must output separate position + technique nodes with prefixed IDs |
| `ColorLegend` component | MISSING — build new | Toggleable panel, uses React Flow `Panel` |
| Updated `nodeTypes` map | MINOR UPDATE | Add `technique: TechniqueNode` entry |
| Dagre dimensions update | MINOR UPDATE | Two dimension sets (position vs technique) |
| Zustand store version bump | MINOR UPDATE | Version 1 → 2 |

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `reactflow` (v9-v10, npm package) | `@xyflow/react` (v12, scoped package) | API changes in v11+; the project is already on the current package name |
| Techniques as edge labels | Techniques as independent nodes | Enables per-technique shape, color, handles, and terminal styling |
| Single node type | `nodeTypes` map with multiple types | Standard React Flow pattern for heterogeneous graphs |

**Deprecated/outdated:**
- `reactflow` npm package: The project correctly uses `@xyflow/react` (the v12+ package name). Do not reference old `reactflow` API docs.
- `dagre` npm package: The project correctly uses `@dagrejs/dagre` (the maintained fork). Do not reference the unmaintained `dagre` package.

---

## Open Questions

1. **Node width variation for technique names**
   - What we know: Technique names vary in length (e.g., "Armbar" vs. "Rear Naked Choke"). Pill shapes with fixed width will truncate long names. Variable widths complicate Dagre layout (Dagre needs fixed node dimensions upfront).
   - What's unclear: Should pill nodes have a fixed max-width with text truncation, or variable width (requiring Dagre to receive the actual rendered width, which is impossible before render)?
   - Recommendation: Use `min-width` with a generous cap (e.g., `min-w-24 max-w-48`), use a fixed Dagre width of 160px as a reasonable average, and allow CSS to handle overflow gracefully with `text-ellipsis`. The occasional layout gap is acceptable.

2. **Multiple techniques from same position to same resulting position**
   - What we know: It's valid for a user to have two sweeps from Guard both going to Mount. This produces two technique nodes both connected to the same source and target position.
   - What's unclear: Dagre may route both edges through the same path, causing visual overlap.
   - Recommendation: Dagre handles parallel edges by default; set `multigraph: true` on the Dagre graph instance if parallel edges cause issues. Bezier curves naturally diverge when source/target handles are offset.

3. **`nodePositions` key migration**
   - What we know: Existing users (if any) have `nodePositions` keyed by raw position IDs. After rework, keys will be `pos-${id}` and `tech-${id}`.
   - Recommendation: Bump Zustand version to 2. Stale position data is cosmetic only.

---

## Sources

### Primary (HIGH confidence)
- `@xyflow/react` v12 — verified by reading `flowchart-view.tsx`, `position-node.tsx`, `technique-edge.tsx` (all use current API correctly: `useNodesState`, `useEdgesState`, `BaseEdge`, `EdgeLabelRenderer`, `getBezierPath`, `MarkerType`)
- `@dagrejs/dagre` v2 — verified by reading `flowchart-view.tsx` (`dagre.graphlib.Graph`, `setGraph`, `layout`, `g.node`)
- `zustand` v5 + persist middleware — verified by reading `game-plan-store.ts` (correct `create` + `persist` pattern with `name` and `version`)
- Project types (`src/types/index.ts`, `src/types/game-plan.ts`) — verified directly

### Secondary (MEDIUM confidence)
- [React Flow Custom Nodes docs](https://reactflow.dev/learn/customization/custom-nodes) — verified via WebSearch result confirming current docs (updated Feb 2026)
- [React Flow Dagre example](https://reactflow.dev/examples/layout/dagre) — fetched directly; confirmed `getLayoutedElements` pattern and static layout limitation
- [React Flow State Management with Zustand](https://reactflow.dev/learn/advanced-use/state-management) — confirmed via WebSearch; Zustand is officially documented as the recommended state management pairing
- [React Flow Common Errors](https://reactflow.dev/learn/troubleshooting/common-errors) — confirmed `ReactFlowProvider` context requirement and re-registration pitfall via WebSearch

### Tertiary (LOW confidence — flag for validation)
- CSS glow via `box-shadow` for submission nodes — confirmed as the standard technique by multiple sources but specific pixel values are judgment calls, not official spec

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified against actual project files; versions confirmed in `package.json`
- Architecture: HIGH — existing code fully read; new architecture derived from requirements against verified React Flow patterns
- Pitfalls: HIGH — most derive from reading actual existing code and identifying the specific delta between current and target state
- Color palette: MEDIUM — values copied from existing `technique-edge.tsx` (already in use); glow values are LOW (judgment)

**Research date:** 2026-02-17
**Valid until:** 2026-03-17 (React Flow releases occasionally, but v12 API is stable; Dagre is stable)
