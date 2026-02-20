# Architecture Patterns

**Domain:** Interactive Flowchart System for BJJ Game Plans
**Researched:** 2026-02-16
**Confidence:** HIGH (based on existing codebase analysis and React Flow patterns)

## Executive Summary

The architecture integrates React Flow for interactive flowchart visualization with Zustand for state management in a React 19 SPA. The system follows a unidirectional data flow pattern where user selections (technique additions) trigger Zustand store updates, which flow through a graph builder to generate React Flow nodes and edges, then render as custom components with bidirectional position synchronization back to the store.

**Current Problem:** Graph builder places techniques inside position nodes instead of creating separate technique nodes with explicit edges, causing visual clarity issues.

**Recommended Architecture:** Separate position nodes and technique nodes with explicit edges, treating the graph as a directed acyclic graph (DAG) of state transitions where positions are states and techniques are transitions.

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                        │
│  ┌────────────────┐  ┌───────────────┐  ┌────────────────┐     │
│  │ GamePlanPage   │  │ FlowchartView │  │ PlanManagement │     │
│  │ (orchestrator) │→ │ (React Flow)  │  │ (create/switch)│     │
│  └────────────────┘  └───────────────┘  └────────────────┘     │
│           │                  │                    │              │
└───────────┼──────────────────┼────────────────────┼──────────────┘
            │                  │                    │
            ↓                  ↓                    ↓
┌─────────────────────────────────────────────────────────────────┐
│                          State Layer                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         Zustand Store (useGamePlanStore)                 │   │
│  │  - gamePlans: GamePlan[]                                 │   │
│  │  - activeGamePlanId: string | null                       │   │
│  │  - techniqueIds: string[] (per plan)                     │   │
│  │  - nodePositions: Record<string, {x,y}> (per plan)       │   │
│  │  - CRUD operations + position persistence                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
            │
            ↓ techniqueIds[]
┌─────────────────────────────────────────────────────────────────┐
│                      Transformation Layer                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │     Graph Builder (buildGamePlanGraph)                   │   │
│  │  Input:  techniqueIds[]                                  │   │
│  │  Output: { nodes: GamePlanNode[], edges: GamePlanEdge[] }│   │
│  │  Logic:  Derive graph structure from technique metadata │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
            │
            ↓ graph data
┌─────────────────────────────────────────────────────────────────┐
│                      Visualization Layer                         │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────┐     │
│  │ PositionNode  │  │ TechniqueNode│  │ TechniqueEdge    │     │
│  │ (custom node) │  │ (custom node)│  │ (custom edge)    │     │
│  └───────────────┘  └──────────────┘  └──────────────────┘     │
│         │                   │                   │                │
│         └───────────────────┴───────────────────┘                │
│                             │                                    │
│                    ┌────────┴────────┐                          │
│                    │   React Flow    │                          │
│                    │  - Layout (dag) │                          │
│                    │  - Interaction  │                          │
│                    │  - Position sync│                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
            │
            ↓ onNodeDragStop
         (back to Zustand Store for position persistence)
```

### Data Flow Sequence

1. **User Action** → Add/remove technique via `AddToPlanButton`
2. **Store Update** → `useGamePlanStore.addTechnique(id)` updates `techniqueIds[]`
3. **Reactive Computation** → `useMemo(() => buildGamePlanGraph(techniqueIds), [techniqueIds])`
4. **Graph Generation** → `buildGamePlanGraph` produces nodes/edges from technique metadata
5. **Layout Application** → Dagre layout algorithm positions nodes (respecting saved positions)
6. **React Flow Rendering** → Custom components render nodes/edges
7. **User Interaction** → Drag nodes, triggering `onNodeDragStop`
8. **Position Persistence** → `updateNodePositions()` saves to Zustand → localStorage

## Component Boundaries

### 1. State Management Layer (Zustand Store)

**File:** `src/stores/game-plan-store.ts`

| Responsibility | Interface |
|----------------|-----------|
| Multi-plan CRUD | `createGamePlan()`, `deleteGamePlan()`, `renameGamePlan()` |
| Plan activation | `setActiveGamePlan()`, `getActiveGamePlan()` |
| Technique management | `addTechnique()`, `removeTechnique()`, `isTechniqueInActivePlan()` |
| Position persistence | `updateNodePositions()` (stores node positions per plan) |
| Storage | Persists to localStorage via `zustand/middleware/persist` |

**Data Model:**
```typescript
interface GamePlan {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  techniqueIds: string[];               // Core: which techniques selected
  nodePositions?: Record<string, {x,y}>; // UI state: user-dragged positions
}
```

**Communicates with:**
- All presentation components (read state)
- `FlowchartView` (write positions on drag)
- `AddToPlanButton` (write technique selections)
- `PlanManagement` (write plan CRUD)

### 2. Graph Builder (Pure Transformation)

**File:** `src/lib/game-plan-graph.ts`

| Responsibility | Details |
|----------------|---------|
| Derive graph structure | Convert `techniqueIds[]` → nodes/edges using technique metadata |
| Position aggregation | Collect all referenced positions (source + resulting) |
| Edge creation | Create edges from techniques with `resultingPositionId` |
| Technique grouping | Group techniques by source position |

**Current Implementation:**
```typescript
buildGamePlanGraph(techniqueIds: string[]): {
  nodes: GamePlanNode[],  // One node per position
  edges: GamePlanEdge[]   // One edge per transitional technique
}
```

**GamePlanNode includes:**
- `position`: Position metadata
- `category`: PositionCategory metadata
- `techniques`: All techniques from this position (shown in node)
- `submissions`: Filtered submissions (highlighted in node)

**Problem:** Techniques embedded in position nodes instead of being separate nodes.

**Communicates with:**
- `GamePlanPage` (called via useMemo)
- Static data imports (`techniques`, `positions`, `categories` from `@/data`)
- Does NOT communicate with store (pure function)

### 3. Presentation Components

#### GamePlanPage (Orchestrator)

**File:** `src/pages/game-plan.tsx`

| Responsibility | Details |
|----------------|---------|
| Auto-create default plan | useEffect creates "My Game Plan" if none exists |
| Reactive graph building | `useMemo(() => buildGamePlanGraph(techniqueIds), [techniqueIds])` |
| View toggling | Tabs for Flowchart vs List view |
| Empty state | Shows when `techniqueIds.length === 0` |

**Communicates with:**
- `useGamePlanStore` (read active plan, call createGamePlan)
- `buildGamePlanGraph` (transform techniqueIds → graph)
- `FlowchartView` / `ListView` (pass graph data)

#### FlowchartView (React Flow Container)

**File:** `src/components/game-plan/flowchart-view.tsx`

| Responsibility | Details |
|----------------|---------|
| React Flow integration | Manages `nodes`, `edges`, `onNodesChange`, `onEdgesChange` |
| Layout application | Calls `applyDagreLayout()` to position nodes using Dagre |
| Position persistence | Syncs `onNodeDragStop` → `updateNodePositions()` |
| Node/edge type mapping | Registers `nodeTypes` and `edgeTypes` |

**Key Pattern:**
```typescript
const layoutedNodes = useMemo(
  () => applyDagreLayout(initialNodes, initialEdges, activePlan?.nodePositions),
  [initialNodes, initialEdges, activePlan?.nodePositions]
);
```

**Layout Strategy:**
- Dagre auto-layout for new nodes
- Saved positions override auto-layout
- User drags persist to store

**Communicates with:**
- `useGamePlanStore` (read nodePositions, write on drag)
- `PositionNode` / `TechniqueEdge` (render via React Flow)
- `applyDagreLayout` (layout algorithm)

#### PositionNode (Custom React Flow Node)

**File:** `src/components/game-plan/position-node.tsx`

| Responsibility | Details |
|----------------|---------|
| Render position metadata | Category badge, position name |
| Show embedded techniques | Submissions (highlighted), transition count |
| Perspective styling | Color-coded borders (top/bottom/both) |
| React Flow handles | Source/target connection points |

**Current Data Structure:**
```typescript
data: GamePlanNode & { label: string } = {
  position: Position,
  category: PositionCategory,
  techniques: Technique[],      // ALL techniques from this position
  submissions: Technique[],     // Filtered submissions
}
```

**Communicates with:**
- React Flow (via Handle components)
- No direct store access (receives props)

#### TechniqueEdge (Custom React Flow Edge)

**File:** `src/components/game-plan/technique-edge.tsx`

| Responsibility | Details |
|----------------|---------|
| Render technique name | Floating label on edge path |
| Type-based styling | Color-coded by technique type |
| Edge path rendering | Bezier curves via `getBezierPath()` |

**Communicates with:**
- React Flow (BaseEdge, EdgeLabelRenderer)
- No store access (receives props)

### 4. Supporting Components (To Be Built)

#### PlanManagement (Multi-Plan UI)

**Purpose:** UI for creating, switching, renaming, deleting game plans

**Suggested Implementation:**
```typescript
// Dropdown selector showing all plans
<Select value={activeGamePlanId} onChange={setActiveGamePlan}>
  {gamePlans.map(plan => <option key={plan.id}>{plan.name}</option>)}
</Select>

// Create new plan button
<Button onClick={() => createGamePlan("New Plan")}>+ New Plan</Button>

// Delete/rename actions (context menu or inline buttons)
```

**Communicates with:**
- `useGamePlanStore` (all CRUD operations)

#### AddToPlanButton (Technique Selection)

**File:** `src/components/game-plan/add-to-plan-button.tsx` (exists)

**Communicates with:**
- `useGamePlanStore` (`addTechnique`, `removeTechnique`, `isTechniqueInActivePlan`)
- Shown on technique detail pages

## Patterns to Follow

### Pattern 1: Unidirectional Data Flow

**What:** State changes flow in one direction: User Action → Store → Graph Builder → React Flow

**When:** Always. Avoid bidirectional bindings or imperative updates.

**Example:**
```typescript
// GOOD: User adds technique → Store updates → Graph rebuilds
<Button onClick={() => addTechnique(techniqueId)}>Add</Button>

const { nodes, edges } = useMemo(
  () => buildGamePlanGraph(techniqueIds),
  [techniqueIds]  // React to store changes
);

// BAD: Direct manipulation of React Flow state
setNodes(prev => [...prev, newNode]); // Don't do this
```

**Why:** Ensures graph structure always reflects technique selections. Single source of truth.

### Pattern 2: Separation of Concerns (Pure Graph Builder)

**What:** Graph builder is a pure function with no side effects or store dependencies.

**When:** Always. Graph builder only transforms techniqueIds → graph structure.

**Example:**
```typescript
// GOOD: Pure function
export function buildGamePlanGraph(techniqueIds: string[]): Graph {
  const techniques = techniqueIds.map(id =>
    techniques.find(t => t.id === id)
  );
  // ... derive structure from technique metadata
}

// BAD: Store access inside builder
export function buildGamePlanGraph() {
  const { techniqueIds } = useGamePlanStore();  // Don't do this
}
```

**Why:** Testable, predictable, reusable. Clear boundary between state and transformation.

### Pattern 3: Derived State via useMemo

**What:** Graph structure is derived from techniqueIds, not stored separately.

**When:** Always. Never store nodes/edges in Zustand.

**Example:**
```typescript
// GOOD: Compute on demand
const { nodes, edges } = useMemo(
  () => buildGamePlanGraph(techniqueIds),
  [techniqueIds]
);

// BAD: Store derived state
interface GamePlan {
  techniqueIds: string[];
  nodes: Node[];  // Don't store this
  edges: Edge[];  // Don't store this
}
```

**Why:** Prevents sync issues. TechniqueIds are source of truth, graph is always correct.

### Pattern 4: Position Persistence as UI State

**What:** Node positions are UI state, persisted per plan but not core data.

**When:** Save positions on `onNodeDragStop`, load on initial layout.

**Example:**
```typescript
// Layout respects saved positions
function applyDagreLayout(nodes, edges, savedPositions?) {
  return nodes.map(node => {
    const saved = savedPositions?.[node.id];
    if (saved) return { ...node, position: saved };  // Use saved
    return { ...node, position: calculateDagre() };   // Auto-layout
  });
}

// Persist on drag
const onNodeDragStop = () => {
  const positions = nodes.reduce((acc, n) => ({ ...acc, [n.id]: n.position }), {});
  updateNodePositions(positions);
};
```

**Why:** User customizations preserved, but auto-layout available for new nodes.

### Pattern 5: Custom Node/Edge Components

**What:** React Flow renders via custom components registered in `nodeTypes`/`edgeTypes`.

**When:** Always. Use custom components for domain-specific rendering.

**Example:**
```typescript
const nodeTypes = { position: PositionNode };
const edgeTypes = { technique: TechniqueEdge };

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
/>
```

**Why:** Full control over rendering, styling, interaction. Decouples visualization from React Flow internals.

### Pattern 6: Layout Algorithm Integration

**What:** Use Dagre for automatic hierarchical layout (top-down DAG).

**When:** On initial render and when graph structure changes (new nodes/edges).

**Example:**
```typescript
import dagre from "@dagrejs/dagre";

function applyDagreLayout(nodes, edges, savedPositions?) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "TB", nodesep: 80, ranksep: 120 });

  nodes.forEach(n => g.setNode(n.id, { width: 240, height: 120 }));
  edges.forEach(e => g.setEdge(e.source, e.target));

  dagre.layout(g);

  return nodes.map(node => ({
    ...node,
    position: savedPositions?.[node.id] ?? {
      x: g.node(node.id).x - 120,
      y: g.node(node.id).y - 60
    }
  }));
}
```

**Why:** Auto-arranges complex graphs, reduces manual positioning work.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Storing React Flow State in Zustand

**What goes wrong:** Storing nodes/edges arrays directly in Zustand causes sync issues and duplication.

**Why it happens:** Temptation to "centralize all state" in store.

**Consequences:**
- Nodes/edges can fall out of sync with techniqueIds
- Double source of truth
- Complex update logic

**Prevention:**
```typescript
// GOOD: Only store source data
interface GamePlan {
  techniqueIds: string[];  // Source of truth
  nodePositions?: Record<string, {x,y}>;  // UI-only state
}

// BAD: Storing derived state
interface GamePlan {
  techniqueIds: string[];
  nodes: Node[];  // Derived from techniqueIds, don't store
  edges: Edge[];  // Derived from techniqueIds, don't store
}
```

### Anti-Pattern 2: Techniques Embedded in Position Nodes

**What goes wrong:** Current implementation embeds technique lists inside position nodes, preventing explicit flow visualization.

**Why it happens:** Simpler graph structure (one node per position).

**Consequences:**
- Techniques hidden in node details instead of visible as flow steps
- No visual path showing "from Closed Guard, do X sweep to Mount"
- Loses primary benefit of flowchart visualization

**Prevention:**
Rework graph builder to create:
- Position nodes (states)
- Technique nodes (transitions)
- Edges connecting position → technique → resulting position

```typescript
// GOOD: Explicit technique nodes
{
  nodes: [
    { id: "pos:closed-guard", type: "position", data: {...} },
    { id: "tech:scissor-sweep", type: "technique", data: {...} },
    { id: "pos:mount", type: "position", data: {...} }
  ],
  edges: [
    { source: "pos:closed-guard", target: "tech:scissor-sweep" },
    { source: "tech:scissor-sweep", target: "pos:mount" }
  ]
}

// BAD: Current implementation
{
  nodes: [
    {
      id: "pos:closed-guard",
      data: {
        techniques: [scissorSweep, armbar, ...],  // Hidden in node
      }
    }
  ],
  edges: [
    { source: "pos:closed-guard", target: "pos:mount" }  // Technique not visible
  ]
}
```

### Anti-Pattern 3: Direct DOM Manipulation

**What goes wrong:** Bypassing React Flow's APIs to manipulate SVG/DOM directly.

**Why it happens:** Frustration with React Flow's abstractions.

**Consequences:** Breaks React Flow's internal state, causes rendering bugs.

**Prevention:** Always use React Flow's APIs (`setNodes`, `setEdges`, node/edge components).

### Anti-Pattern 4: Ignoring Layout Algorithm Results

**What goes wrong:** Manually positioning every node instead of using auto-layout.

**Why it happens:** Not understanding Dagre integration.

**Consequences:** Poor initial layouts, manual positioning burden.

**Prevention:** Use Dagre for initial layout, allow user overrides via drag.

### Anti-Pattern 5: Missing Position Persistence

**What goes wrong:** User drags nodes, refreshes page, positions reset.

**Why it happens:** Forgetting to save `onNodeDragStop` to store.

**Consequences:** Frustrating UX, lost customizations.

**Prevention:** Current implementation does this correctly:
```typescript
const onNodeDragStop = useCallback(() => {
  const positions = nodes.reduce((acc, n) => ({ ...acc, [n.id]: n.position }), {});
  updateNodePositions(positions);
}, [nodes, updateNodePositions]);
```

## Recommended Rework: Separate Position and Technique Nodes

### Current Problem

Techniques are embedded inside position nodes, making the flowchart show "position tiles with technique lists" instead of "flow of techniques between positions."

### Proposed Structure

```typescript
// Position nodes (states)
{
  id: "pos:closed-guard",
  type: "position",
  data: {
    position: Position,
    category: PositionCategory,
    // NO techniques array - they're separate nodes
  }
}

// Technique nodes (actions/transitions)
{
  id: "tech:scissor-sweep",
  type: "technique",
  data: {
    technique: Technique,
    // Display: name, type badge, difficulty
  }
}

// Edges connect positions → techniques → resulting positions
[
  { source: "pos:closed-guard", target: "tech:scissor-sweep" },
  { source: "tech:scissor-sweep", target: "pos:mount" }
]
```

### Graph Builder Rework

```typescript
export function buildGamePlanGraph(techniqueIds: string[]): {
  nodes: Array<PositionNode | TechniqueNode>;
  edges: GamePlanEdge[];
} {
  const techniques = techniqueIds.map(id =>
    techniques.find(t => t.id === id)
  ).filter(Boolean);

  const positionNodes: PositionNode[] = [];
  const techniqueNodes: TechniqueNode[] = [];
  const edges: GamePlanEdge[] = [];

  // Collect unique positions
  const positionIds = new Set<string>();
  techniques.forEach(t => {
    positionIds.add(t.positionId);
    if (t.resultingPositionId) {
      positionIds.add(t.resultingPositionId);
    }
  });

  // Create position nodes
  positionIds.forEach(posId => {
    const position = positions.find(p => p.id === posId);
    const category = categories.find(c => c.id === position.categoryId);
    positionNodes.push({
      id: `pos:${posId}`,
      type: "position",
      data: { position, category }
    });
  });

  // Create technique nodes and edges
  techniques.forEach(tech => {
    techniqueNodes.push({
      id: `tech:${tech.id}`,
      type: "technique",
      data: { technique: tech }
    });

    // Edge: position → technique
    edges.push({
      source: `pos:${tech.positionId}`,
      target: `tech:${tech.id}`
    });

    // Edge: technique → resulting position (if not submission)
    if (tech.resultingPositionId) {
      edges.push({
        source: `tech:${tech.id}`,
        target: `pos:${tech.resultingPositionId}`
      });
    }
  });

  return {
    nodes: [...positionNodes, ...techniqueNodes],
    edges
  };
}
```

### Benefits

1. **Visual Clarity**: Flow shows "Closed Guard → Scissor Sweep → Mount" not "Closed Guard (contains: scissor sweep, ...)"
2. **Explicit Paths**: User can see chaining: "Sweep to Mount → Americana → Finish"
3. **Better Layout**: Dagre can properly arrange position → technique → position flow
4. **Scalability**: Many techniques from one position don't overcrowd node

### Implementation Order

1. **Phase 1: Rework Graph Builder** (no UI changes yet)
   - Update `buildGamePlanGraph` to create technique nodes
   - Create edges for position→technique and technique→position
   - Update TypeScript types

2. **Phase 2: Create TechniqueNode Component**
   - Custom node component for technique visualization
   - Smaller than position nodes
   - Show: name, type badge, difficulty

3. **Phase 3: Update PositionNode Component**
   - Remove embedded technique lists
   - Simpler rendering (just position info)
   - Keep perspective color coding

4. **Phase 4: Update Layout Algorithm**
   - Adjust node sizing (technique nodes smaller)
   - Tune layout parameters for position→technique→position flow

5. **Phase 5: Test and Iterate**
   - Verify with complex game plans
   - Adjust spacing, sizing, colors

## Build Order (Dependency Analysis)

### Immediate: Core Data Flow Already Works

1. **Store (DONE)** → Game plan CRUD, technique management, position persistence
2. **Graph Builder (NEEDS REWORK)** → Convert techniqueIds to nodes/edges
3. **React Flow Integration (DONE)** → Flowchart rendering, interaction
4. **Position Node (NEEDS SIMPLIFICATION)** → Remove embedded techniques
5. **Technique Edge (DONE)** → Label edges with technique names

### Next: Missing UI Components

6. **Plan Management UI** (depends on: Store)
   - Dropdown to switch active plan
   - Create new plan button
   - Rename/delete actions

7. **Technique Node Component** (depends on: Graph builder rework)
   - Custom node for technique visualization
   - Must be built after graph builder creates technique nodes

### Future: Enhancements

8. **Advanced Layout Options** (depends on: Core graph working)
   - Horizontal vs vertical layout toggle
   - Manual positioning mode

9. **Export/Import** (depends on: Plan management)
   - Export game plan as JSON
   - Import shared game plans

## Scalability Considerations

| Concern | At 10 techniques | At 50 techniques | At 200 techniques |
|---------|------------------|------------------|-------------------|
| **Graph Rendering** | Instant | <500ms layout | May need virtualization |
| **Store Size** | <1KB localStorage | <10KB localStorage | <50KB localStorage, fine |
| **Layout Performance** | Dagre instant | Dagre <1s | May need layout caching |
| **Component Rendering** | No issues | No issues | React Flow handles well |

### Performance Optimizations

**Not Needed Yet:**
- Virtualization (React Flow handles 100s of nodes)
- Layout caching (Dagre is fast enough)
- Code splitting (bundle size acceptable)

**Future Considerations:**
- If >200 techniques in single plan: implement node virtualization
- If multiple large plans: consider IndexedDB instead of localStorage
- If layout becomes slow: cache layout results in store

## Component Communication Matrix

| Component | Reads From | Writes To | Communication Pattern |
|-----------|------------|-----------|----------------------|
| **GamePlanPage** | useGamePlanStore (active plan, techniqueIds) | useGamePlanStore (createGamePlan) | Subscribe to store, auto-create default |
| **FlowchartView** | useGamePlanStore (nodePositions), props (graphNodes, graphEdges) | useGamePlanStore (updateNodePositions) | Props down, callbacks up, position sync |
| **PositionNode** | Props (data) | None (React Flow handles interaction) | Pure presentation |
| **TechniqueEdge** | Props (data) | None | Pure presentation |
| **buildGamePlanGraph** | Static data imports (techniques, positions, categories) | Returns graph structure | Pure function |
| **PlanManagement** | useGamePlanStore (gamePlans, activeGamePlanId) | useGamePlanStore (all CRUD) | Full store access |
| **AddToPlanButton** | useGamePlanStore (isTechniqueInActivePlan) | useGamePlanStore (add/removeTechnique) | Conditional rendering + mutations |

## Technology Stack Summary

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **State Management** | Zustand | 5.x | Global store with persistence |
| **Persistence** | zustand/middleware/persist | - | localStorage sync |
| **Flowchart** | React Flow (@xyflow/react) | 12.x | Interactive node/edge visualization |
| **Layout** | Dagre (@dagrejs/dagre) | 2.x | Hierarchical graph layout algorithm |
| **Rendering** | React | 19.x | Component framework |
| **Routing** | React Router | 7.x | SPA navigation |
| **Build** | Vite | 7.x | Fast dev server, bundling |
| **Types** | TypeScript | 5.x | Type safety |

## Sources

**Confidence Level: HIGH**

Analysis based on:
1. Direct examination of existing codebase (primary source)
2. React Flow documentation patterns (official docs)
3. Zustand patterns (official docs)
4. Dagre layout algorithm documentation (official)
5. React 19 patterns (official docs)

**Primary Sources (Codebase Analysis):**
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/stores/game-plan-store.ts`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/lib/game-plan-graph.ts`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/pages/game-plan.tsx`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/components/game-plan/flowchart-view.tsx`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/components/game-plan/position-node.tsx`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/components/game-plan/technique-edge.tsx`
- `C:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/package.json`

**Knowledge Base (Training Data - React Flow Patterns):**
- Custom node/edge components pattern (standard React Flow practice)
- Unidirectional data flow with external state management (recommended pattern)
- Layout algorithm integration (Dagre + React Flow is common combination)
- Position persistence pattern (standard UX practice)

**Limitation:** Unable to access web search for 2026-specific React Flow updates, but package.json shows @xyflow/react@12.10.0 which is current as of research date.
