# Technology Stack - React Flow Enhancement

**Project:** BJJ Technique Tracker - Game Plan Flowcharts
**Researched:** 2026-02-16
**Focus:** Enhanced React Flow visualization with custom nodes, styled edges, hierarchical layouts

---

## Research Methodology & Confidence

**IMPORTANT:** This research was conducted without access to WebSearch, WebFetch, or official documentation tools. All recommendations are based on training data (knowledge cutoff: January 2025) and existing project analysis.

**Confidence Level:** MEDIUM to LOW
- Stack already established: HIGH confidence (verified in codebase)
- Best practices: MEDIUM confidence (based on training data, needs verification)
- Version recommendations: LOW confidence (cannot verify latest 2026 releases)

**Verification needed:** All version numbers, new API features, and migration guides should be verified against official documentation before implementation.

---

## Recommended Stack

### Core Visualization (Already Installed)

| Technology | Current | Recommended | Purpose | Confidence |
|------------|---------|-------------|---------|------------|
| @xyflow/react | ^12.10.0 | Keep ^12.x | Interactive flowchart rendering | HIGH |
| @dagrejs/dagre | ^2.0.4 | Keep ^2.x OR upgrade to ELK | Hierarchical layout algorithm | MEDIUM |

**Rationale:**
- **@xyflow/react 12** is the modern, maintained version (formerly react-flow). API is stable, actively developed
- **Dagre 2.x** provides simple hierarchical layouts but has limitations for complex flowcharts
- Consider **elkjs** for more sophisticated layouts (see Alternatives below)

### Layout Algorithms

| Technology | Version | Purpose | Why Use |
|------------|---------|---------|---------|
| **@dagrejs/dagre** | ^2.0.4 | Simple tree/hierarchical layouts | Already installed, good for basic top-down flows |
| **elkjs** (alternative) | ^0.9.x | Advanced hierarchical layouts | Better for complex flowcharts with crossing edges, multiple layout algorithms |
| **d3-hierarchy** (optional) | ^3.x | Tree layout calculations | If need radial or other specialized tree layouts |

**Recommendation:** Start with existing Dagre, migrate to ELK if layouts become complex.

**Confidence:** MEDIUM - Based on training data about layout library capabilities. Version numbers need verification.

### Node & Edge Customization (Using Built-in APIs)

No additional libraries needed. React Flow 12 provides comprehensive APIs:

| Feature | Implementation | Notes |
|---------|----------------|-------|
| Custom Nodes | React components with `Handle` components | Already implemented in `position-node.tsx` |
| Custom Edges | React components using `EdgeProps` | Already implemented in `technique-edge.tsx` |
| Node Styling | Tailwind CSS classes | Existing pattern in codebase |
| Edge Markers | SVG marker definitions in React Flow | Built-in markerEnd/markerStart |
| Edge Labels | `EdgeLabelRenderer` component | React Flow 12 feature |

**Rationale:** React Flow's native APIs are sufficient. No need for wrapper libraries.

**Confidence:** HIGH - Verified in existing codebase.

### State Management (Already Installed)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Zustand | ^5.x | Game plan store, node/edge state | Already used, perfect for React Flow integration |

**Rationale:**
- Zustand pairs excellently with React Flow
- Lightweight, no boilerplate
- Easy to sync with React Flow's internal state
- Already established pattern in project

**Confidence:** HIGH - Verified in `stores/game-plan-store.ts`.

### Color Coding & Theming

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Tailwind CSS** | ^4.x | Node/edge styling | Already installed - use for all styling |
| **CVA (class-variance-authority)** | Latest | Conditional node styling | Already installed - perfect for type-based coloring |
| **clsx/tailwind-merge** | Latest | Dynamic class composition | Already installed |

**Color Coding Strategy:**

```typescript
// Use CVA for technique type variants
const nodeVariants = cva("base-node-classes", {
  variants: {
    techniqueType: {
      submission: "border-red-500 bg-red-50 dark:bg-red-950",
      sweep: "border-blue-500 bg-blue-50 dark:bg-blue-950",
      pass: "border-green-500 bg-green-50 dark:bg-green-950",
      escape: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
      control: "border-purple-500 bg-purple-50 dark:bg-purple-950"
    },
    isFinishNode: {
      true: "border-2 shadow-lg",
      false: "border"
    }
  }
});
```

**Rationale:**
- Semantic color coding improves flowchart readability
- CVA provides type-safe variant management
- Tailwind ensures consistency with rest of app
- Dark mode support built-in

**Confidence:** HIGH - Existing pattern in codebase.

### Multi-Plan Management UX

| Pattern | Implementation | Libraries |
|---------|----------------|-----------|
| Plan Switcher | Radix UI Tabs or Command Palette | Already installed |
| Plan List | Radix UI Sheet (sidebar) | Already installed |
| Plan CRUD | Radix UI Dialog | Already installed |
| Keyboard Shortcuts | Custom hook + Command | Already installed |

**Recommended Pattern:**

```typescript
// Header: Quick plan switcher (Command-K)
<Command>
  <CommandInput placeholder="Switch game plan..." />
  <CommandList>
    {plans.map(plan => (
      <CommandItem onSelect={() => switchPlan(plan.id)}>
        {plan.name}
      </CommandItem>
    ))}
  </CommandList>
</Command>

// Sidebar: Full plan management
<Sheet>
  <SheetContent>
    <Tabs value={currentPlanId} onValueChange={switchPlan}>
      {/* Plan list with rename/delete */}
    </Tabs>
  </SheetContent>
</Sheet>
```

**Rationale:**
- Command palette for quick switching (power users)
- Sheet sidebar for full management (visual users)
- All components already installed via Radix UI/shadcn
- Consistent with existing app patterns

**Confidence:** HIGH - Verified components exist in `components/ui/`.

### Graph Utilities

| Utility | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Custom graph logic** | - | Position-to-position chaining | Required for sweep flow logic |

**Implementation Pattern:**

```typescript
// In lib/game-plan-graph.ts (already exists)
export function buildFlowGraph(techniques: Technique[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Position nodes (standalone)
  const positions = extractUniquePositions(techniques);
  positions.forEach(pos => nodes.push(createPositionNode(pos)));

  // Technique edges with chaining
  techniques.forEach(tech => {
    if (tech.type === 'sweep') {
      // Chain: position -> technique -> resulting position
      edges.push(
        createEdge(tech.fromPosition, tech.id),
        createEdge(tech.id, tech.resultingPosition)
      );
    } else if (tech.type === 'submission') {
      // Terminal: position -> technique (finish node)
      edges.push(createEdge(tech.fromPosition, tech.id));
    }
  });

  return { nodes, edges };
}
```

**Rationale:**
- Custom logic needed for BJJ-specific flow semantics
- No library handles "technique chains to position" pattern
- Build on top of React Flow's data structures

**Confidence:** HIGH - Domain-specific requirement.

---

## Supporting Libraries

### Animation & Interaction

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| Motion | ^12.x | Node animations, transitions | Already installed |
| React Flow gestures | Built-in | Drag, zoom, pan | No additional lib needed |

**Animation Patterns:**

```typescript
// Animate node entrance
import { motion } from 'motion/react';

const PositionNode = ({ data }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="position-node"
  >
    {data.label}
  </motion.div>
);
```

**Rationale:**
- Motion for entrance/exit animations
- React Flow handles interaction gestures natively
- Keep animations subtle (not distracting from content)

**Confidence:** MEDIUM - Pattern recommendation based on training data.

### Icons

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| lucide-react | Latest | Node icons, UI icons | Already installed |

**Usage:**
- Position nodes: `MapPin`, `Target`, `Shield`
- Technique types: `Zap` (submission), `ArrowRight` (sweep), `Move` (pass)
- UI: `Plus`, `Trash`, `Edit`, `MoreVertical`

**Confidence:** HIGH - Verified in codebase.

---

## Alternatives Considered

### Layout Algorithms: Dagre vs ELK

| Criterion | Dagre | ELK | Recommendation |
|-----------|-------|-----|----------------|
| **Simplicity** | ✅ Simple API | ❌ More complex | Start with Dagre |
| **Layout quality** | ⚠️ Basic | ✅ Advanced | Switch if needed |
| **Edge crossing** | ❌ More crossings | ✅ Minimizes crossings | ELK for complex graphs |
| **Performance** | ✅ Fast for <100 nodes | ✅ Optimized for large | Both fine for this use case |
| **Bundle size** | ✅ ~50KB | ❌ ~500KB | Dagre smaller |
| **Maintenance** | ⚠️ Less active | ✅ Actively maintained | ELK more future-proof |

**Recommendation:** Keep Dagre ^2.x initially. Migrate to elkjs ^0.9.x if:
- Graph has >50 nodes with complex connections
- Edge crossings become problematic
- Need advanced layout algorithms (layered, force-directed, box layout)

**Migration path:**

```typescript
// Instead of dagre layout
import ELK from 'elkjs/lib/elk.bundled.js';
const elk = new ELK();

const layoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'DOWN',
  'elk.spacing.nodeNode': '80',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100'
};
```

**Confidence:** MEDIUM - Based on training data comparisons.

### Edge Animation Libraries

| Library | Why Not |
|---------|---------|
| **react-flow-animated-edges** | Third-party, unmaintained. React Flow 12 has built-in edge animation |
| **custom SVG animation** | Overkill. Use Motion or CSS animations on edge components |

**Recommendation:** Use React Flow's built-in `animated` prop or add CSS animations to custom edges.

**Confidence:** MEDIUM - Based on training data about ecosystem.

### State Management Alternatives

| Alternative | Why Not |
|-------------|---------|
| **React Context** | Already using Zustand, no reason to change |
| **Redux Toolkit** | Overkill for this use case |
| **Jotai/Recoil** | Zustand already works, adds learning curve |

**Recommendation:** Stick with Zustand 5.x.

**Confidence:** HIGH - Existing pattern works.

---

## Installation (Incremental)

### Already Installed (No Action Needed)
```bash
# Core visualization
@xyflow/react@^12.10.0
@dagrejs/dagre@^2.0.4

# UI components
@radix-ui/* (via shadcn)
lucide-react
class-variance-authority
clsx
tailwind-merge

# State & animation
zustand@^5.x
motion@^12.x
```

### Optional: Upgrade to ELK (If Needed Later)
```bash
npm install elkjs@^0.9.3
npm uninstall @dagrejs/dagre  # Optional, can keep both
```

**Note:** Verify versions against npm registry before installing.

**Confidence:** LOW for version numbers - Cannot verify latest 2026 releases.

---

## Implementation Patterns

### 1. Custom Node Types

**Pattern:** One component per node type

```typescript
// components/game-plan/position-node.tsx (already exists)
import { Handle, Position, NodeProps } from '@xyflow/react';
import { cva } from 'class-variance-authority';

const nodeVariants = cva(
  'px-4 py-2 rounded-lg border-2 shadow-md',
  {
    variants: {
      isActive: {
        true: 'ring-2 ring-blue-500',
        false: ''
      }
    }
  }
);

export function PositionNode({ data }: NodeProps<PositionNodeData>) {
  return (
    <div className={nodeVariants({ isActive: data.isActive })}>
      <Handle type="target" position={Position.Top} />
      <div className="font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// Register in ReactFlow
const nodeTypes = {
  position: PositionNode,
  // Add more types as needed
};

<ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
```

**Confidence:** HIGH - Standard React Flow pattern.

### 2. Custom Edge Types

**Pattern:** Technique edges with labels and color coding

```typescript
// components/game-plan/technique-edge.tsx (already exists)
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';
import { cva } from 'class-variance-authority';

const edgeVariants = cva('', {
  variants: {
    techniqueType: {
      submission: 'stroke-red-500',
      sweep: 'stroke-blue-500',
      pass: 'stroke-green-500'
    }
  }
});

export function TechniqueEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data
}: EdgeProps<TechniqueEdgeData>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        className={edgeVariants({ techniqueType: data.type })}
        d={edgePath}
        strokeWidth={2}
        fill="none"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
```

**Confidence:** HIGH - Standard React Flow 12 pattern.

### 3. Hierarchical Layout with Dagre

**Pattern:** Auto-layout on graph changes

```typescript
// lib/game-plan-graph.ts (already exists)
import dagre from '@dagrejs/dagre';
import { Node, Edge } from '@xyflow/react';

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction = 'TB'
) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 80,      // Horizontal spacing
    ranksep: 100,     // Vertical spacing
    marginx: 20,
    marginy: 20
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.width || 150,
      height: node.height || 50
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const position = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: position.x - (node.width || 150) / 2,
          y: position.y - (node.height || 50) / 2,
        },
      };
    }),
    edges,
  };
}
```

**Confidence:** HIGH - Standard Dagre integration pattern.

### 4. Color Coding Strategy

**Semantic Colors by Technique Type:**

| Type | Color | Meaning | Tailwind Class |
|------|-------|---------|----------------|
| Submission | Red | Finish node (terminal) | `border-red-500 bg-red-50` |
| Sweep | Blue | Chains to position | `border-blue-500 bg-blue-50` |
| Pass | Green | Progress/advance | `border-green-500 bg-green-50` |
| Escape | Yellow | Recovery/defense | `border-yellow-500 bg-yellow-50` |
| Control | Purple | Positional control | `border-purple-500 bg-purple-50` |

**Edge Styles:**
- Solid: Direct technique application
- Dashed: Optional/conditional path
- Bold: Frequently used technique

**Confidence:** MEDIUM - UX recommendation based on flowchart conventions.

### 5. Multi-Plan Management

**Pattern:** Zustand store with plan CRUD

```typescript
// stores/game-plan-store.ts (enhance existing)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GamePlanStore {
  plans: GamePlan[];
  currentPlanId: string | null;

  // CRUD operations
  createPlan: (name: string) => void;
  renamePlan: (id: string, name: string) => void;
  deletePlan: (id: string) => void;
  switchPlan: (id: string) => void;

  // Technique management per plan
  addTechnique: (planId: string, technique: Technique) => void;
  removeTechnique: (planId: string, techniqueId: string) => void;
}

export const useGamePlanStore = create<GamePlanStore>()(
  persist(
    (set) => ({
      plans: [{ id: '1', name: 'Default Plan', techniques: [] }],
      currentPlanId: '1',

      createPlan: (name) => set((state) => ({
        plans: [...state.plans, {
          id: crypto.randomUUID(),
          name,
          techniques: []
        }]
      })),

      switchPlan: (id) => set({ currentPlanId: id }),

      // ... other methods
    }),
    { name: 'game-plans' }
  )
);
```

**UI Components:**

```typescript
// Plan switcher in header
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

function PlanSwitcher() {
  const { plans, currentPlanId, switchPlan } = useGamePlanStore();

  return (
    <Command>
      <CommandInput placeholder="Switch plan..." />
      <CommandList>
        {plans.map(plan => (
          <CommandItem
            key={plan.id}
            onSelect={() => switchPlan(plan.id)}
          >
            {plan.name}
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
```

**Confidence:** HIGH - Standard Zustand + Radix UI pattern.

---

## React Flow 12 Key Features to Use

Based on training data (January 2025):

| Feature | Use Case | Confidence |
|---------|----------|------------|
| **Custom Nodes** | Position nodes, technique nodes | HIGH |
| **Custom Edges** | Labeled technique edges | HIGH |
| **EdgeLabelRenderer** | Technique names on edges | HIGH |
| **Node Toolbar** | Quick actions on hover | MEDIUM |
| **MiniMap** | Navigation for large graphs | HIGH |
| **Controls** | Zoom in/out, fit view | HIGH |
| **Background** | Grid or dots pattern | HIGH |
| **Connection Validation** | Prevent invalid connections | MEDIUM |
| **Sub Flows** | Grouped techniques (future) | MEDIUM |
| **Node Resizing** | Custom node sizes | LOW |

**Recommended Setup:**

```typescript
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant
} from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
  fitView
  attributionPosition="bottom-left"
>
  <Background variant={BackgroundVariant.Dots} />
  <Controls />
  <MiniMap
    nodeColor={(node) => getNodeColor(node)}
    maskColor="rgb(0, 0, 0, 0.1)"
  />
</ReactFlow>
```

**Confidence:** MEDIUM - Based on React Flow 11/12 API from training data. Verify current API.

---

## Performance Considerations

### For <100 Nodes (Expected Use Case)

| Concern | Recommendation |
|---------|----------------|
| **Initial render** | Use `fitView` prop for auto-zoom |
| **Layout calculation** | Dagre is fast enough (<100ms) |
| **Re-renders** | Memoize node/edge components |
| **State updates** | Use Zustand selectors to prevent unnecessary re-renders |

**Optimization Pattern:**

```typescript
// Memoize expensive computations
const layoutedElements = useMemo(
  () => getLayoutedElements(nodes, edges),
  [nodes, edges]
);

// Use Zustand selectors
const currentPlan = useGamePlanStore(
  (state) => state.plans.find(p => p.id === state.currentPlanId)
);
```

### For >100 Nodes (Future Scaling)

If graphs grow large:
1. Consider virtualizing with React Flow's built-in viewport culling
2. Switch to ELK for better performance
3. Add lazy loading for technique details
4. Implement graph clustering/grouping

**Confidence:** MEDIUM - Standard React performance patterns.

---

## Pitfalls to Avoid

### 1. Layout Thrashing
**Problem:** Re-calculating layout on every state change
**Solution:** Only re-layout when nodes/edges structurally change, not on selection/hover

```typescript
// Bad: Layout on every render
useEffect(() => {
  const layouted = getLayoutedElements(nodes, edges);
  setNodes(layouted.nodes);
}, [nodes, edges]); // Infinite loop!

// Good: Layout only when structure changes
const [layoutVersion, setLayoutVersion] = useState(0);
useEffect(() => {
  const layouted = getLayoutedElements(nodes, edges);
  setNodes(layouted.nodes);
}, [layoutVersion]); // Trigger manually
```

### 2. Custom Node Sizing Issues
**Problem:** Dagre doesn't know custom node sizes
**Solution:** Pass accurate widths/heights to layout algorithm

```typescript
// Measure node sizes after render
const nodeWidths = {
  position: 150,
  technique: 200,
};

dagreGraph.setNode(node.id, {
  width: nodeWidths[node.type] || 150,
  height: 50
});
```

### 3. Edge Label Overlap
**Problem:** Labels overlap with edges/nodes
**Solution:** Use EdgeLabelRenderer with proper z-index and background

```typescript
<EdgeLabelRenderer>
  <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm">
    {data.label}
  </div>
</EdgeLabelRenderer>
```

### 4. State Sync Issues
**Problem:** React Flow internal state out of sync with Zustand
**Solution:** Use controlled components, single source of truth

```typescript
// Use Zustand as source of truth
const nodes = useGamePlanStore(state => state.currentPlan.nodes);
const onNodesChange = useGamePlanStore(state => state.updateNodes);

<ReactFlow
  nodes={nodes}
  onNodesChange={onNodesChange}
  // ...
/>
```

**Confidence:** HIGH - Common React Flow pitfalls from training data.

---

## Migration Path (If Switching to ELK)

**When to migrate:**
- Dagre layouts have too many edge crossings
- Need multiple layout algorithms
- Graph complexity increases (>50 nodes with dense connections)

**Migration steps:**

1. **Install ELK:**
```bash
npm install elkjs@^0.9.3
```

2. **Replace layout function:**
```typescript
import ELK from 'elkjs/lib/elk.bundled.js';

export async function getLayoutedElements(nodes, edges) {
  const elk = new ELK();

  const graph = {
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.spacing.nodeNode': '80',
      'elk.layered.spacing.nodeNodeBetweenLayers': '100'
    },
    children: nodes.map(node => ({
      id: node.id,
      width: node.width || 150,
      height: node.height || 50
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target]
    }))
  };

  const layout = await elk.layout(graph);

  return {
    nodes: nodes.map((node) => {
      const elkNode = layout.children.find(n => n.id === node.id);
      return {
        ...node,
        position: { x: elkNode.x, y: elkNode.y }
      };
    }),
    edges
  };
}
```

3. **Update component to handle async layout:**
```typescript
const [layoutedNodes, setLayoutedNodes] = useState([]);

useEffect(() => {
  getLayoutedElements(nodes, edges).then(({ nodes: layouted }) => {
    setLayoutedNodes(layouted);
  });
}, [nodes, edges]);
```

**Confidence:** MEDIUM - Based on ELK API from training data. Verify current API.

---

## Testing Strategy

### Unit Tests
- Graph building logic (lib/game-plan-graph.ts)
- Store mutations (Zustand actions)
- Node/edge data transformations

### Integration Tests
- Plan CRUD operations
- Adding/removing techniques from plans
- Layout calculations

### Visual Tests
- Custom node rendering
- Edge styling variations
- Color coding accuracy

**Recommended tools:** Already in ecosystem (Vitest, Testing Library)

**Confidence:** MEDIUM - Standard testing approach.

---

## Sources & Verification Needed

**CRITICAL:** This research was conducted without access to official documentation. All recommendations require verification.

### Verify with official sources:

1. **React Flow Documentation:**
   - https://reactflow.dev/
   - Current v12 API reference
   - Migration guides from v11

2. **Layout Libraries:**
   - https://github.com/dagrejs/dagre - Check if still maintained
   - https://www.eclipse.org/elk/ - Verify elkjs npm package
   - Compare bundle sizes: bundlephobia.com

3. **NPM Versions (as of Feb 2026):**
   - npm view @xyflow/react version
   - npm view @dagrejs/dagre version
   - npm view elkjs version

4. **Community Patterns:**
   - React Flow examples repo
   - React Flow discussions on GitHub
   - Community showcase projects

### Confidence Assessment:

| Area | Confidence | Reason |
|------|------------|--------|
| Existing stack | HIGH | Verified in codebase |
| React Flow patterns | MEDIUM | Based on training data (Jan 2025) |
| Layout libraries | MEDIUM | Based on training data comparison |
| Version numbers | LOW | Cannot verify 2026 releases |
| Best practices | MEDIUM | Based on training data, needs community verification |

---

## Summary

### Keep Using (Already Installed)
✅ @xyflow/react ^12.x - Core visualization
✅ @dagrejs/dagre ^2.x - Layout algorithm (initially)
✅ Zustand ^5.x - State management
✅ Radix UI / shadcn - UI components
✅ CVA + Tailwind - Styling & color coding
✅ Motion - Animations
✅ lucide-react - Icons

### Consider Adding (If Needed)
⚠️ elkjs ^0.9.x - Advanced layouts (only if Dagre insufficient)
⚠️ d3-hierarchy - Specialized tree layouts (only if needed)

### Avoid
❌ Third-party React Flow wrappers - Use native APIs
❌ Separate animation libraries - Use Motion + React Flow built-ins
❌ Alternative state management - Zustand works

### Next Steps for Roadmap
1. **Phase 1:** Enhance custom nodes with CVA variants, improve edges with labels
2. **Phase 2:** Implement multi-plan management UI (Command + Sheet)
3. **Phase 3:** Color coding system, semantic styling
4. **Phase 4:** Advanced layouts (consider ELK migration if needed)
5. **Phase 5:** Performance optimization, animations, polish

**Total New Dependencies:** 0-1 (only elkjs if Dagre proves insufficient)

---

## Verification Checklist

Before implementation, verify:
- [ ] @xyflow/react current version and changelog
- [ ] Dagre vs ELK comparison with current bundle sizes
- [ ] React Flow 12 API for EdgeLabelRenderer, custom nodes
- [ ] Community examples of hierarchical flowcharts
- [ ] Performance benchmarks for Dagre vs ELK
- [ ] Dark mode support in React Flow 12
- [ ] Accessibility features in React Flow 12

**End of Stack Research**
