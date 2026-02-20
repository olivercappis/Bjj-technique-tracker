# Domain Pitfalls: React Flow Interactive Graph Visualizations

**Domain:** React Flow / Interactive Flowchart UIs
**Researched:** 2026-02-16
**Confidence:** MEDIUM (based on training data, official docs not accessible)

## Critical Pitfalls

Mistakes that cause rewrites, major performance issues, or broken user experience.

### Pitfall 1: Infinite Re-render Loops from Non-Memoized Node/Edge Arrays

**What goes wrong:** Creating new node/edge arrays on every render causes React Flow to constantly re-initialize, triggering layout recalculation and losing interactive state (zoom, pan, selections).

**Why it happens:**
- Building nodes/edges inside component body without `useMemo`
- Inline object creation in node data (`data: { label: 'foo' }`)
- Non-stable node position objects
- Transform functions that create new arrays instead of returning stable references

**Consequences:**
- Graph constantly resets to initial position
- User drag operations get lost immediately
- Layout algorithm runs on every keystroke/state change
- Severe performance degradation (10+ nodes becomes unusable)
- Edge animations stutter or restart constantly

**Prevention:**
```typescript
// BAD - creates new array every render
const nodes = techniques.map(t => ({
  id: t.id,
  position: { x: 0, y: 0 }, // new object!
  data: { technique: t } // new object!
}));

// GOOD - memoized with stable references
const nodes = useMemo(() =>
  techniques.map(t => ({
    id: t.id,
    position: nodePositions.get(t.id) ?? { x: 0, y: 0 },
    data: { technique: t }
  })),
  [techniques, nodePositions] // only when these change
);
```

Store node positions in external state (Zustand store) rather than recreating them.

**Detection:**
- Graph "jumps" back to default position after any interaction
- Console shows excessive renders (use React DevTools Profiler)
- Drag operations feel "sticky" or snap back
- `useEffect` with nodes/edges dependency runs constantly

**Phase impact:** Affects MVP/Phase 1 immediately if not addressed.

---

### Pitfall 2: Layout Algorithm Fighting User-Dragged Positions

**What goes wrong:** Auto-layout (Dagre) overwrites user's custom node positions every time graph data changes.

**Why it happens:**
- Running layout algorithm on every render/data change
- Not distinguishing between "initial layout" and "preserve user positions"
- Persisting positions but then overwriting them with layout calculation
- No flag to track "has user customized this graph"

**Consequences:**
- Users drag nodes to organize their view, then lose all work when adding one technique
- Frustrating UX where manual organization is impossible
- Users abandon flowchart view entirely

**Prevention:**
```typescript
// Track which nodes have been manually positioned
const [customizedNodes, setCustomizedNodes] = useState<Set<string>>(new Set());

// Only auto-layout nodes that haven't been customized
const layoutNodes = useMemo(() => {
  const unlayoutedNodes = nodes.filter(n => !customizedNodes.has(n.id));
  const layouted = applyDagreLayout(unlayoutedNodes);

  // Merge: keep custom positions, apply layout to new nodes
  return nodes.map(n =>
    customizedNodes.has(n.id)
      ? n
      : layouted.find(ln => ln.id === n.id) ?? n
  );
}, [nodes, customizedNodes]);

// Mark nodes as customized when dragged
const onNodeDragStop = useCallback((event, node) => {
  setCustomizedNodes(prev => new Set(prev).add(node.id));
  persistNodePosition(node.id, node.position);
}, []);
```

Alternative: Only run layout on "Reset Layout" button, never automatically.

**Detection:**
- User complaints about losing manual organization
- Every edit triggers visible node repositioning
- Persisted positions in store but graph still rearranges

**Phase impact:** Critical for Phase 2 (flowchart customization). Should be prevented in Phase 1 architecture.

---

### Pitfall 3: Performance Collapse with Custom React Components as Nodes

**What goes wrong:** Complex React components in custom nodes re-render excessively, causing lag with 50+ nodes.

**Why it happens:**
- Custom nodes that aren't memoized with `React.memo`
- Node components subscribing to global state individually (N re-renders for 1 state change)
- Heavy computation inside node render (filtering, searching, formatting)
- Not using `nodesDraggable={false}` when nodes shouldn't be draggable
- Creating event handlers inside node component (new function every render)

**Consequences:**
- Smooth dragging becomes janky at 30+ nodes
- Graph becomes unusable at 100+ nodes
- Browser tab freezes during interactions
- Edge rendering slows down (React Flow re-calculates edge paths)

**Prevention:**
```typescript
// Memoize custom nodes
const TechniqueNode = React.memo(({ data }: NodeProps) => {
  // Only re-renders when data changes
  return <div>{data.label}</div>;
});

// Register once, not in component body
const nodeTypes = useMemo(() => ({
  technique: TechniqueNode,
  position: PositionNode
}), []);

// Use in ReactFlow
<ReactFlow nodeTypes={nodeTypes} ... />

// Avoid per-node state subscriptions
// BAD: Every node subscribes to entire store
const allTechniques = useGamePlanStore(state => state.techniques);

// GOOD: Pass only what each node needs via data prop
nodes.map(t => ({
  data: {
    label: t.name,
    type: t.type,
    // pre-computed, not calculated in node
  }
}))
```

**Detection:**
- React DevTools Profiler shows custom nodes rendering 100+ times
- Dragging has visible lag/stutter
- Graph performance degrades linearly with node count
- Browser tab becomes unresponsive

**Phase impact:** Affects Phase 1 MVP if not designed correctly from start. Hard to fix later without node component rewrite.

---

### Pitfall 4: Cyclic Graph Rendering with Dagre (Crashes or Infinite Loops)

**What goes wrong:** Dagre layout algorithm fails or produces unusable layouts with cyclic graphs (sweeps that chain back to earlier positions).

**Why it happens:**
- Dagre is designed for DAGs (Directed Acyclic Graphs)
- BJJ sweep chains create cycles: Guard → Sweep → Mount → Escape → Guard
- Algorithm may crash, infinite loop, or produce overlapping nodes
- No cycle detection before layout calculation

**Consequences:**
- Layout crashes with "cycle detected" error
- Nodes stack on top of each other (all at position 0,0)
- Edges drawn in circular tangles
- Graph becomes visually unusable

**Prevention:**

**Option 1: Cycle-aware layout library**
```typescript
// Use ELK (Eclipse Layout Kernel) instead of Dagre
// ELK supports cyclic graphs with proper cycle detection
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();
elk.layout({
  id: 'root',
  layoutOptions: {
    'elk.algorithm': 'layered',
    'elk.layered.cycleBreaking.strategy': 'GREEDY' // handles cycles
  },
  children: nodes,
  edges: edges
});
```

**Option 2: Cycle detection and breaking**
```typescript
// Detect cycles and mark "back edges" differently
function breakCycles(edges: Edge[]) {
  const visited = new Set();
  const backEdges = new Set();

  // DFS to find back edges
  function dfs(nodeId: string, path: Set<string>) {
    if (path.has(nodeId)) {
      // Cycle detected
      return true;
    }
    // ... mark edge as back edge
  }

  return edges.map(e => ({
    ...e,
    type: backEdges.has(e.id) ? 'back-edge' : 'default'
  }));
}
```

**Option 3: Manual layout for cyclic sections**
- Use Dagre for initial layout
- Detect problematic cycles
- Fall back to force-directed layout (D3-force) for cyclic subgraphs
- Or position cyclic nodes manually with custom logic

**Detection:**
- Layout algorithm throws errors in console
- All nodes render at (0, 0) or very close positions
- Edges overlap in chaotic patterns
- Specific technique chains (sweeps) cause layout failure

**Phase impact:** Critical for Phase 1 - must be addressed before flowchart view is usable. May require library change or architecture shift.

---

### Pitfall 5: State Management Race Conditions Between React Flow and Zustand

**What goes wrong:** Node positions, selections, or graph state get out of sync between React Flow's internal state and Zustand store, causing stale data or lost updates.

**Why it happens:**
- React Flow maintains internal state for nodes/edges
- Zustand store also maintains positions/graph data
- Updates to one don't immediately reflect in the other
- Async updates cause timing issues
- Using uncontrolled mode (React Flow state) + controlled mode (props) simultaneously

**Consequences:**
- User drags node, but position reverts after re-render
- Selections disappear when switching game plans
- Undo/redo breaks because store and UI disagree on state
- Multi-user scenarios fail (if added later)

**Prevention:**

**Choose one source of truth:**

**Option A: Fully controlled (Zustand as source of truth)**
```typescript
const nodes = useGamePlanStore(state => state.nodes);
const edges = useGamePlanStore(state => state.edges);
const updateNodePosition = useGamePlanStore(state => state.updateNodePosition);

<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={(changes) => {
    // Synchronously update store
    changes.forEach(change => {
      if (change.type === 'position' && change.position) {
        updateNodePosition(change.id, change.position);
      }
    });
  }}
/>
```

**Option B: Hybrid with explicit sync**
```typescript
// React Flow manages UI state
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

// Sync to store only on drag end (not during drag)
const onNodeDragStop = useCallback((event, node) => {
  persistNodePosition(node.id, node.position);
}, []);
```

**Detection:**
- Positions in DevTools (Zustand) don't match visual graph
- State updates don't trigger re-renders
- Graph "flickers" between two states
- Console warnings about controlled/uncontrolled mode

**Phase impact:** Architecture decision for Phase 1. Fixing later requires state management refactor.

---

## Moderate Pitfalls

### Pitfall 6: Not Handling Initial Viewport/Fit on Load

**What goes wrong:** Graph loads but is offscreen, requiring users to manually zoom/pan to find content.

**Why it happens:**
- No `fitView()` call on mount
- Initial nodes have positions but viewport not adjusted
- Zoom level defaults to 1, but graph is tiny or huge

**Prevention:**
```typescript
const { fitView } = useReactFlow();

useEffect(() => {
  // Wait for layout to complete
  setTimeout(() => fitView({ padding: 0.2 }), 100);
}, [fitView, gamePlanId]);
```

**Detection:** Users see empty canvas on load, must manually navigate to content.

---

### Pitfall 7: Missing Edge Markers/Labels for Typed Edges

**What goes wrong:** All edges look the same, users can't distinguish sweep vs transition vs escape routes.

**Why it happens:**
- Using default edge type for all connections
- Not defining custom edge types with markers
- Color coding on edges but no semantic meaning

**Prevention:**
```typescript
const edgeTypes = {
  sweep: SweepEdge,
  transition: TransitionEdge,
  submission: SubmissionEdge
};

// Define marker definitions for arrow styles
<ReactFlow
  edgeTypes={edgeTypes}
  defaultEdgeOptions={{
    markerEnd: { type: MarkerType.ArrowClosed }
  }}
>
  <svg>
    <defs>
      <marker id="sweep-arrow" ... />
    </defs>
  </svg>
</ReactFlow>
```

---

### Pitfall 8: Not Preventing Accidental Node Connections

**What goes wrong:** Users accidentally create edges by dragging from handles, creating invalid technique connections.

**Why it happens:**
- `connectOnClick` enabled by default
- No validation in `onConnect` callback
- Users mistake dragging handle for dragging node

**Prevention:**
```typescript
<ReactFlow
  onConnect={(params) => {
    // Validate connection makes sense
    const sourceNode = nodes.find(n => n.id === params.source);
    const targetNode = nodes.find(n => n.id === params.target);

    if (!isValidConnection(sourceNode, targetNode)) {
      return; // Reject connection
    }

    addEdge(params);
  }}
  // Or disable entirely for read-only graphs
  nodesDraggable={true}
  nodesConnectable={false}
  elementsSelectable={true}
/>
```

---

### Pitfall 9: Forgetting to Clean Up Event Listeners

**What goes wrong:** Memory leaks when switching between game plans or unmounting flowchart view.

**Why it happens:**
- React Flow adds listeners for drag, zoom, pan
- Custom event handlers not cleaned up
- Refs to nodes/edges kept alive after unmount

**Prevention:**
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Handle shortcuts
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);

// Or use React Flow's built-in cleanup
<ReactFlow onInit={(instance) => {
  // Instance auto-cleans up on unmount
}} />
```

---

### Pitfall 10: Poor Mobile/Touch Experience

**What goes wrong:** Flowchart is desktop-only, unusable on tablets/phones where BJJ practitioners often reference techniques.

**Why it happens:**
- Default pan/zoom gestures conflict with scroll
- Nodes too small for touch targets
- No pinch-to-zoom
- Overlays/tooltips don't work on touch

**Prevention:**
```typescript
<ReactFlow
  // Enable touch-friendly interactions
  panOnScroll={false}
  panOnDrag={[1, 2]} // Middle/right mouse, or touch
  zoomOnPinch={true}
  zoomOnDoubleClick={true}
  minZoom={0.5}
  maxZoom={2}
  // Larger touch targets
  nodeOrigin={[0.5, 0.5]}
>
```

Design custom nodes with minimum 44px touch targets.

---

## Minor Pitfalls

### Pitfall 11: Not Styling Connection Line Preview

**What goes wrong:** When connecting nodes, the preview line is barely visible.

**Prevention:**
```typescript
<ReactFlow
  connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
  connectionLineType={ConnectionLineType.SmoothStep}
/>
```

---

### Pitfall 12: Missing Loading States During Layout Calculation

**What goes wrong:** Large graphs freeze UI while Dagre calculates layout, no feedback to user.

**Prevention:**
```typescript
const [isLayouting, setIsLayouting] = useState(false);

const performLayout = useCallback(async () => {
  setIsLayouting(true);

  // Run heavy layout in next tick
  await new Promise(resolve => setTimeout(resolve, 0));
  const layoutedNodes = applyDagreLayout(nodes, edges);
  setNodes(layoutedNodes);

  setIsLayouting(false);
}, [nodes, edges]);

{isLayouting && <div>Calculating layout...</div>}
```

---

### Pitfall 13: Not Handling Empty Graph State

**What goes wrong:** Blank canvas with no instructions when game plan has zero techniques.

**Prevention:** Show empty state with "Add your first technique" CTA.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: MVP Flowchart | Infinite re-render loops (#1) | Establish memoization pattern immediately |
| Phase 1: MVP Flowchart | Cyclic graph layout (#4) | Research ELK or cycle-breaking before implementing Dagre |
| Phase 1: MVP Flowchart | Performance with custom nodes (#3) | Profile early, memo pattern from start |
| Phase 2: Customization | Layout fighting user drags (#2) | Track customized nodes from Phase 1 |
| Phase 2: Customization | State sync issues (#5) | Choose controlled vs uncontrolled early |
| Phase 2: Multi-device | Poor touch experience (#10) | Test on tablet during Phase 2 |
| Future: Sharing | State race conditions in multi-user | Will need CRDT or operational transform |

---

## BJJ-Specific Warnings

### Position Cycles Are Fundamental, Not Edge Cases
Unlike typical flowcharts (start → end), BJJ has inherent cycles:
- Guard → Pass → Side Control → Escape → Guard
- Any sweep creates cycle back to earlier position

**Don't treat cycles as errors.** Design graph structure to embrace them.

### Technique Type Affects Edge Rendering
- **Submissions:** Terminal nodes (no outgoing edges except "if failed")
- **Sweeps/Reversals:** Always connect to new position
- **Escapes:** Return to neutral or advantageous position
- **Passes:** Linear progression
- **Entries:** Starting points
- **Transitions:** Lateral movement

Design edge types and markers accordingly.

### Performance Scaling Beyond Initial Estimate
A comprehensive game plan might have:
- 20-30 positions (nodes)
- 50-100 techniques (nodes)
- 150-300 connections (edges)

Test with realistic data volume, not toy examples.

---

## Confidence Assessment

| Area | Level | Notes |
|------|-------|-------|
| Re-render loops | HIGH | Well-documented React Flow issue |
| Layout algorithm issues | HIGH | Dagre limitations are documented |
| Custom node performance | HIGH | Common React optimization patterns |
| Cyclic graph handling | MEDIUM | Based on Dagre docs, ELK not verified |
| State management | MEDIUM | Zustand + React Flow integration patterns from training |
| Touch/mobile | MEDIUM | Standard React Flow features, implementation varies |

**Verification needed:**
- ELK library current status (2026)
- React Flow 12 specific performance improvements
- @xyflow/react breaking changes from older versions
- Zustand 5.x integration patterns

---

## Sources

**Note:** This research is based on training data (knowledge cutoff January 2025). Official verification needed:

- React Flow official docs (https://reactflow.dev/learn)
- React Flow GitHub issues (common pitfalls)
- Dagre layout algorithm documentation
- ELK (Eclipse Layout Kernel) for cyclic graph layouts
- Zustand documentation for React Flow integration

**Confidence level:** MEDIUM overall - core pitfalls are well-established, but specific library versions and 2026 best practices require verification via Context7/official docs.

**Recommendation:** Verify pitfalls #4 (cyclic graphs) and #5 (state management) with official React Flow 12 documentation before implementation.
