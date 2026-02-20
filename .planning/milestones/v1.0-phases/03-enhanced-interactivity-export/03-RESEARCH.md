# Phase 3: Enhanced Interactivity & Export - Research

**Researched:** 2026-02-18
**Domain:** React Flow (@xyflow/react) interactivity APIs, HTML-to-image export, Radix UI panels
**Confidence:** HIGH (core APIs verified via official docs and WebFetch)

## Summary

Phase 3 adds three distinct capability layers on top of the existing `FlowchartView` and node components: (1) click-to-detail panels for technique and position nodes, (2) hover-based path highlighting and edge tooltips, and (3) PNG export. All three capabilities are achievable entirely within the existing stack — no new framework dependencies are needed except a single HTML-to-image library for export.

The interactivity work is the most architecturally significant. It requires lifting hover state into `FlowchartView` (or a sibling hook) and threading it down to both nodes and edges via `setNodes`/`setEdges` style updates. The existing `Sheet` component (already in `src/components/ui/sheet.tsx`) is the correct UI primitive for the technique/position detail panel — it slides in from the right without obscuring the flowchart, unlike a centered Dialog. The edge tooltip for INTX-07 is best implemented with a custom edge component using `EdgeLabelRenderer` from `@xyflow/react`, which avoids the SVG plane entirely and renders a styled HTML div at the midpoint.

The export story (EXPRT-01) has a known complication: `html-to-image` versions above 1.11.11 have a documented CSS parsing regression, and the latest versions (1.11.13+) have separate browser-specific freeze bugs in Chrome 138+ and Firefox 126+. The official React Flow download-image example explicitly pins `html-to-image@1.11.11`. This project must install it at that exact version.

**Primary recommendation:** Implement click-to-detail via `onNodeClick` on the parent `<ReactFlow>` component routing to a `Sheet` panel; implement hover highlight via `onNodeMouseEnter`/`onNodeMouseLeave` using `setNodes`/`setEdges` to inject `opacity` style overrides; implement edge tooltip with a custom edge component using `EdgeLabelRenderer`; implement export with `html-to-image@1.11.11` pinned exactly.

## Standard Stack

### Core (all already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@xyflow/react` | ^12.10.0 | React Flow graph, all interaction hooks/events | Already in use; provides all needed APIs |
| `radix-ui` | ^1.4.3 | Sheet/Dialog primitives | Already installed; `Sheet` is ideal for detail panels |
| `lucide-react` | ^0.564.0 | Icons for detail panels | Already in use throughout app |

### New Dependency Required
| Library | Version | Purpose | Why This Version |
|---------|---------|---------|-----------------|
| `html-to-image` | `1.11.11` (exact) | DOM-to-PNG conversion for export | Must be pinned — 1.11.12+ has CSS regression; official React Flow example pins this exact version |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `html-to-image` | `dom-to-image-more` | Less widely used, no React Flow official endorsement |
| `html-to-image` | `html2canvas` | Heavier, worse SVG support; community prefers html-to-image |
| `Sheet` for detail panel | Centered `Dialog` | Dialog occludes the flowchart; Sheet slides in from right, keeping graph visible |
| Custom edge for tooltip | `onEdgeMouseEnter` + Zustand state + Portal | EdgeLabelRenderer is cleaner, colocated with edge, no global state needed |

**Installation:**
```bash
npm install html-to-image@1.11.11
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/game-plan/
│   ├── flowchart-view.tsx        # Add onNodeClick, onNodeMouseEnter/Leave, onEdgeMouseEnter/Leave handlers; Export button
│   ├── technique-node.tsx        # Reads highlight state from data or prop; adds nodrag class on internal elements
│   ├── position-node.tsx         # Reads highlight state; click handled at FlowchartView level
│   ├── technique-detail-sheet.tsx  # NEW: Sheet panel showing technique details
│   ├── position-browser-sheet.tsx  # NEW: Sheet panel for browsing/adding techniques from a position
│   ├── labeled-edge.tsx            # NEW: Custom edge component with EdgeLabelRenderer tooltip
│   └── export-button.tsx           # NEW: Export PNG button (uses html-to-image)
```

### Pattern 1: Click-to-Detail via onNodeClick

**What:** The `<ReactFlow>` component accepts `onNodeClick: (event, node) => void`. This is the canonical way to intercept node clicks at the flow level. Custom node internal elements that should NOT trigger node selection/click must add class `nodrag nopan`.

**When to use:** All click-to-open-panel interactions.

**How it works:**
- `onNodeClick` fires for any node click not consumed by an internal `stopPropagation()`
- Check `node.type` to route: `"technique"` opens `TechniqueDetailSheet`, `"position"` opens `PositionBrowserSheet`
- The remove button in `TechniqueNode` already uses `e.stopPropagation()` — this correctly prevents the Sheet from opening when clicking remove

```typescript
// In FlowchartView
const [selectedNode, setSelectedNode] = useState<{ type: string; id: string } | null>(null);

const onNodeClick = useCallback((_e: React.MouseEvent, node: Node) => {
  if (node.type === "technique") {
    setSelectedNode({ type: "technique", id: node.data.techniqueId as string });
  } else if (node.type === "position") {
    setSelectedNode({ type: "position", id: node.data.positionId as string });
  }
}, []);

// Source: https://reactflow.dev/api-reference/react-flow (onNodeClick prop)
```

### Pattern 2: Hover Path Highlighting via setNodes/setEdges

**What:** `onNodeMouseEnter` and `onNodeMouseLeave` on the `<ReactFlow>` component provide hover events. On enter, compute connected node/edge IDs using `getIncomers(node, nodes, edges)` and `getOutgoers(node, nodes, edges)` (standalone utility functions from `@xyflow/react`), then call `setNodes` and `setEdges` to inject opacity style overrides. On leave, reset all to opacity 1.

**Critical caveat:** The existing graph is a DAG (bipartite: positions ↔ techniques). There are no cycles. The single-level `getIncomers`/`getOutgoers` approach is sufficient and safe. Do NOT use recursive traversal — it is unnecessary for this graph and would cause stack overflow in cyclic graphs generally.

**Edge highlighting on node hover:** Edges connected to the hovered node get full opacity + animated marker; unconnected edges get dimmed opacity (0.2).

```typescript
// Source: https://reactflow.dev/api-reference/utils/get-incomers
import { getIncomers, getOutgoers } from "@xyflow/react";

const onNodeMouseEnter = useCallback((_e: React.MouseEvent, hoveredNode: Node) => {
  const connected = new Set([
    hoveredNode.id,
    ...getIncomers(hoveredNode, nodes, edges).map((n) => n.id),
    ...getOutgoers(hoveredNode, nodes, edges).map((n) => n.id),
  ]);
  const connectedEdgeIds = new Set(
    edges
      .filter((e) => e.source === hoveredNode.id || e.target === hoveredNode.id)
      .map((e) => e.id)
  );

  setNodes((nds) =>
    nds.map((n) => ({
      ...n,
      style: { ...n.style, opacity: connected.has(n.id) ? 1 : 0.2 },
    }))
  );
  setEdges((eds) =>
    eds.map((e) => ({
      ...e,
      style: { ...e.style, opacity: connectedEdgeIds.has(e.id) ? 1 : 0.15 },
      animated: connectedEdgeIds.has(e.id),
    }))
  );
}, [nodes, edges, setNodes, setEdges]);

const onNodeMouseLeave = useCallback(() => {
  setNodes((nds) => nds.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })));
  setEdges((eds) => eds.map((e) => ({ ...e, style: { ...e.style, opacity: 1 }, animated: false })));
}, [setNodes, setEdges]);
```

### Pattern 3: Edge Hover via onEdgeMouseEnter (for INTX-06 edge-hover variant)

**What:** `onEdgeMouseEnter` and `onEdgeMouseLeave` on `<ReactFlow>` work analogously to the node variants. The edge object is the second argument.

```typescript
const onEdgeMouseEnter = useCallback((_e: React.MouseEvent, hoveredEdge: Edge) => {
  const connectedNodeIds = new Set([hoveredEdge.source, hoveredEdge.target]);
  setNodes((nds) =>
    nds.map((n) => ({ ...n, style: { ...n.style, opacity: connectedNodeIds.has(n.id) ? 1 : 0.2 } }))
  );
  setEdges((eds) =>
    eds.map((e) => ({ ...e, style: { ...e.style, opacity: e.id === hoveredEdge.id ? 1 : 0.15 } }))
  );
}, [setNodes, setEdges]);
// Source: https://reactflow.dev/api-reference/react-flow (onEdgeMouseEnter prop)
```

### Pattern 4: Edge Tooltip via Custom Edge + EdgeLabelRenderer

**What:** INTX-07 requires a tooltip showing technique name and type when hovering an edge. The cleanest approach is a custom edge component that uses `EdgeLabelRenderer` from `@xyflow/react` — this renders HTML content in a div portal overlaid on the edges.

**Key constraint:** `EdgeLabelRenderer` has no pointer events by default. Add `pointerEvents: 'all'` and class `nopan nodrag` if the tooltip needs interactions.

```typescript
// Source: https://reactflow.dev/api-reference/components/edge-label-renderer
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

interface LabeledEdgeData {
  techniqueName?: string;
  techniqueType?: string;
}

export function LabeledEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, style }: EdgeProps<LabeledEdgeData>) {
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && data?.techniqueName && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -100%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "none",
            }}
            className="bg-card border border-border rounded-md px-2 py-1 text-xs shadow-lg z-50"
          >
            <span className="font-medium text-foreground">{data.techniqueName}</span>
            {data.techniqueType && (
              <span className="ml-1.5 text-muted-foreground capitalize">{data.techniqueType}</span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
```

**Data threading:** The `data` field on edges in `buildGamePlanGraph` needs to be extended. For technique->position edges, `data.techniqueName` and `data.techniqueType` should be included. Position->technique edges do not require a label (they simply connect the position to its technique; the name is on the node).

### Pattern 5: PNG Export via html-to-image

**What:** The React Flow viewport element (`.react-flow__viewport`) is targeted for DOM-to-image conversion. `useReactFlow()` provides `getNodes()`. The utilities `getNodesBounds` and `getViewportForBounds` compute the transform to fit all nodes into the exported image dimensions.

```typescript
// Source: https://reactflow.dev/examples/misc/download-image
import { getNodesBounds, getViewportForBounds, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";

const IMAGE_WIDTH = 1920;
const IMAGE_HEIGHT = 1080;

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");
  a.setAttribute("download", "game-plan.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

export function ExportButton() {
  const { getNodes } = useReactFlow();

  const handleExport = useCallback(() => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, IMAGE_WIDTH, IMAGE_HEIGHT, 0.5, 2, 0.1);

    const viewportEl = document.querySelector<HTMLElement>(".react-flow__viewport");
    if (!viewportEl) return;

    toPng(viewportEl, {
      backgroundColor: "#0f1117",  // match app dark background
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
      style: {
        width: String(IMAGE_WIDTH),
        height: String(IMAGE_HEIGHT),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
      filter: (node) => {
        // Exclude minimap, controls, panels from export
        if (node instanceof Element) {
          return !node.classList.contains("react-flow__minimap") &&
                 !node.classList.contains("react-flow__controls") &&
                 !node.classList.contains("react-flow__panel");
        }
        return true;
      },
    }).then(downloadImage);
  }, [getNodes]);

  return (
    <button onClick={handleExport} className="...">
      Export PNG
    </button>
  );
}
```

**Placement:** `ExportButton` must be rendered inside the `<ReactFlow>` component tree (as a `<Panel>` child) so that `useReactFlow()` has access to the FlowInstance context. Alternatively, it can receive `getNodes` as a prop.

### Pattern 6: Technique Detail Sheet

**What:** The `TechniqueDetailSheet` receives a `techniqueId` and renders the technique's full content (description, steps, tips, difficulty, type badge). This is the same data already rendered in `src/pages/technique.tsx` — the sheet is essentially an inline version of that page, without the breadcrumb/navigation.

**Data source:** All data is available from `techniques` data array via `techniques.find(t => t.id === techniqueId)`. No new data fetching required.

**Sheet vs Dialog:** Use `Sheet` (slides from right, does not occlude the graph). The `Sheet` component is already in `src/components/ui/sheet.tsx`.

### Pattern 7: Position Browser Sheet

**What:** The `PositionBrowserSheet` receives a `positionId` and renders all techniques from that position. Each technique shows its type badge, difficulty, and an "Add to Plan" toggle (reuse `AddToPlanButton`).

**Data source:** `getTechniquesByPosition(positionId)` from `src/data/index.ts`.

### Anti-Patterns to Avoid

- **Storing hover state in Zustand:** Hover is transient UI state. Keep it in local `useState` inside `FlowchartView`. Putting it in the global store causes unnecessary re-renders across all subscribers.
- **Using `display: none` to hide nodes during highlight:** React Flow recommends `opacity: 0` or `visibility: hidden` — `display: none` breaks the layout engine.
- **Installing html-to-image without pinning:** `npm install html-to-image` will install the latest (1.11.13+) which has known CSS and browser freeze regressions. Must use `html-to-image@1.11.11`.
- **Recursive graph traversal for highlighting:** Not needed for this DAG. Causes stack overflow in cyclic graphs.
- **Opening Sheet from inside custom node component:** Custom nodes render inside SVG. Portaling a Sheet from inside a node component is fragile. Route all click-to-detail through `onNodeClick` on the parent `<ReactFlow>`.
- **Modifying edge `data` at highlight time:** Don't use `data` for hover state. Use `style` and `animated` properties on edge objects — these are the intended fields for visual state.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| DOM-to-PNG conversion | Custom canvas drawing | `html-to-image@1.11.11` | SVG rendering, font embedding, CSS handling are all handled |
| Edge tooltip positioning | Manual absolute coords | `EdgeLabelRenderer` + `getBezierPath` returning `labelX, labelY` | Midpoint calc and SVG layering is handled |
| Connected-node lookup | Custom graph traversal | `getIncomers` / `getOutgoers` from `@xyflow/react` | Already considers edge directionality correctly |
| Node bounds calculation | Manual min/max of positions | `getNodesBounds` from `@xyflow/react` | Accounts for node dimensions, not just position origins |
| Viewport-to-image mapping | Manual transform math | `getViewportForBounds` from `@xyflow/react` | Returns x, y, zoom already calibrated to image dimensions |
| Slide-in detail panel | Custom CSS drawer | `Sheet` from `src/components/ui/sheet.tsx` | Already implemented, accessible, animated |

**Key insight:** The React Flow utility functions (`getIncomers`, `getOutgoers`, `getNodesBounds`, `getViewportForBounds`) exist precisely to avoid the math that is surprisingly complex when zoom and pan transforms are involved.

## Common Pitfalls

### Pitfall 1: html-to-image Version Regression
**What goes wrong:** Upgrading or installing latest html-to-image (1.11.12+) produces broken/incomplete PNG output. Versions 1.11.13+ cause CSS parse errors and missing styles. Chrome 138+ causes `toJpeg` (and potentially `toPng`) to hang indefinitely.
**Why it happens:** A CSS parsing change in the library's stylesheet cloning code broke cross-origin style injection. Chrome 138 introduced a different rendering pipeline for canvas operations.
**How to avoid:** Pin to exactly `html-to-image@1.11.11`. Add to package.json as exact version. Document this in the component file.
**Warning signs:** Empty/white PNG, partial styling, browser tab becoming unresponsive.

### Pitfall 2: ExportButton Must Be Inside ReactFlow Context
**What goes wrong:** `useReactFlow()` throws an error if called outside a `<ReactFlow>` provider.
**Why it happens:** `useReactFlow()` reads from context set by the `<ReactFlow>` wrapper.
**How to avoid:** Place `ExportButton` inside `<ReactFlow>` as a `<Panel>` child, or pass `getNodes` / `getNodesBounds` down as props from `FlowchartView`.
**Warning signs:** `Error: Seems like you have not used zustand provider as an ancestor` or similar context errors.

### Pitfall 3: Remove Button Conflict with onNodeClick
**What goes wrong:** Clicking the remove button on a `TechniqueNode` also triggers `onNodeClick`, opening the detail Sheet.
**Why it happens:** Click events bubble up through the React tree; `onNodeClick` on `<ReactFlow>` sees all clicks that reach the node container.
**How to avoid:** The remove button in `TechniqueNode` already calls `e.stopPropagation()` — verify this is in place and keep it. Do not remove it.
**Warning signs:** Clicking "remove" both removes the technique AND opens the Sheet.

### Pitfall 4: Hover State Causing Infinite Render Loop
**What goes wrong:** `onNodeMouseEnter` calls `setNodes` which triggers re-render which re-registers `onNodeMouseEnter` which fires again.
**Why it happens:** Event handlers not wrapped in `useCallback` get new references on every render, which React Flow's internal comparison may treat as changes.
**How to avoid:** Wrap ALL event handlers (`onNodeClick`, `onNodeMouseEnter`, `onNodeMouseLeave`, `onEdgeMouseEnter`, `onEdgeMouseLeave`) in `useCallback`. The official React Flow docs explicitly warn about this.
**Warning signs:** Browser tab CPU spiking to 100%, rapid re-renders visible in React DevTools.

### Pitfall 5: Edge Data Not Populated for Tooltip
**What goes wrong:** `LabeledEdge` receives `data` as `undefined` because `buildGamePlanGraph` does not populate edge `data`.
**Why it happens:** The current `buildGamePlanGraph` returns edges with no `data` field.
**How to avoid:** Extend `buildGamePlanGraph` to add `data: { techniqueName, techniqueType }` to technique->position edges. Position->technique edges can omit `data` or set `data: {}` (the edge type map can use `LabeledEdge` for all edges; it conditionally renders the tooltip only if `data?.techniqueName` exists).
**Warning signs:** No tooltip appears despite hovering. Console shows `data` is undefined.

### Pitfall 6: EdgeLabelRenderer Pointer Events Blocking Graph Interactions
**What goes wrong:** The edge tooltip intercepts mouse events, making it impossible to pan the graph when the cursor is near an edge.
**Why it happens:** `EdgeLabelRenderer` has pointer events disabled by default, but if `pointerEvents: 'all'` is set on the label div, it captures mouse events from the graph.
**How to avoid:** Set `pointerEvents: 'none'` on purely informational tooltips. Only use `pointerEvents: 'all'` on interactive labels that need clicks.

## Code Examples

Verified patterns from official sources:

### Export Button (verified from reactflow.dev/examples/misc/download-image)
```typescript
import { getNodesBounds, getViewportForBounds, useReactFlow } from "@xyflow/react";
import { toPng } from "html-to-image";

// Must be a child component inside <ReactFlow> to access useReactFlow context
export function ExportButton() {
  const { getNodes } = useReactFlow();

  const handleClick = () => {
    const nodes = getNodes();
    const bounds = getNodesBounds(nodes);
    const viewport = getViewportForBounds(bounds, 1920, 1080, 0.5, 2, 0.1);

    toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
      backgroundColor: "#0f1117",
      width: 1920,
      height: 1080,
      style: {
        width: "1920",
        height: "1080",
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "game-plan.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return <button onClick={handleClick}>Export PNG</button>;
}
```

### Hover Highlighting (verified from reactflow.dev/api-reference/utils/get-incomers)
```typescript
import { getIncomers, getOutgoers } from "@xyflow/react";

// Inside FlowchartView:
const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
  const highlighted = new Set([
    node.id,
    ...getIncomers(node, nodes, edges).map((n) => n.id),
    ...getOutgoers(node, nodes, edges).map((n) => n.id),
  ]);
  const edgeHighlighted = new Set(
    edges.filter((e) => e.source === node.id || e.target === node.id).map((e) => e.id)
  );
  setNodes((ns) => ns.map((n) => ({ ...n, style: { ...n.style, opacity: highlighted.has(n.id) ? 1 : 0.2 } })));
  setEdges((es) => es.map((e) => ({ ...e, animated: edgeHighlighted.has(e.id), style: { ...e.style, opacity: edgeHighlighted.has(e.id) ? 1 : 0.15 } })));
}, [nodes, edges, setNodes, setEdges]);

const onNodeMouseLeave = useCallback(() => {
  setNodes((ns) => ns.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })));
  setEdges((es) => es.map((e) => ({ ...e, animated: false, style: { ...e.style, opacity: 1 } })));
}, [setNodes, setEdges]);
```

### Custom Edge with Tooltip (verified from reactflow.dev/api-reference/components/edge-label-renderer)
```typescript
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";
import { useState } from "react";

export function LabeledEdge(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, style } = props;
  const [hovered, setHovered] = useState(false);
  const [edgePath, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  const edgeData = data as { techniqueName?: string; techniqueType?: string } | undefined;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        interactionWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hovered && edgeData?.techniqueName && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan absolute bg-card border border-border/70 rounded-md px-2 py-1 text-xs shadow-md"
            style={{
              transform: `translate(-50%, -100%) translate(${labelX}px, ${labelY - 8}px)`,
              pointerEvents: "none",
            }}
          >
            <span className="font-medium text-foreground">{edgeData.techniqueName}</span>
            {edgeData.techniqueType && (
              <span className="ml-1 text-muted-foreground capitalize">{edgeData.techniqueType}</span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `reactflow` package name | `@xyflow/react` package name | React Flow 12, July 2024 | Project already uses `@xyflow/react` — no action needed |
| `getRectOfNodes` + `getTransformForBounds` | `getNodesBounds` + `getViewportForBounds` | React Flow 12 | Old API names seen in pre-2024 examples are renamed; new names are in use |
| `html2canvas` for DOM export | `html-to-image` | Community shift ~2022-2023 | `html-to-image` has better SVG support; React Flow's own examples use it |

**Deprecated/outdated:**
- `getRectOfNodes`: Replaced by `getNodesBounds` in @xyflow/react v12. Old blog posts and StackOverflow answers still reference it.
- `getTransformForBounds`: Replaced by `getViewportForBounds`. Same note.
- `reactflow` (the old package): Renamed. Do not add it as a dependency.

## Open Questions

1. **Edge tooltip scope: which edges get labels?**
   - What we know: INTX-07 says "hovering an edge shows a tooltip with the technique name and type." In the bipartite graph, only technique->position edges have a semantically meaningful "technique name and type" label (position->technique edges connect a position to a technique, which is already labeled on the technique node).
   - What's unclear: Should position->technique edges also show a tooltip (just the technique name as destination)? Or only technique->position edges (showing the technique as the transit move)?
   - Recommendation: Only technique->position edges get the tooltip. Position->technique edges have no meaningful information to surface beyond what the node already shows. Encode this in `buildGamePlanGraph` by only populating `data.techniqueName` on technique->position edges.

2. **Export button placement: Panel vs outside ReactFlow**
   - What we know: `useReactFlow()` requires being inside the ReactFlow provider tree. The existing `FlowchartView` already renders `<Panel>` children (Legend button).
   - What's unclear: Whether the export button should be inside the flowchart viewport (as a `<Panel>`) or above the flowchart in the page header.
   - Recommendation: Place it as a `<Panel position="top-right">` inside the ReactFlow component, consistent with the existing Legend button pattern. This keeps export contextually associated with the flowchart and avoids prop drilling `getNodes` upward.

3. **Sheet interaction while flowchart is beneath it**
   - What we know: The `Sheet` slides in from the right. On small screens, it may cover most of the flowchart.
   - What's unclear: Whether INTX-02 (position browsing) should allow the user to visually interact with the flowchart simultaneously (requiring a non-blocking panel) or if a blocking Sheet is acceptable.
   - Recommendation: A right-side Sheet is acceptable for now. Position browsing from the Sheet can include "Add to Plan" buttons. The Sheet should be dismissible by clicking outside or the X button. If the UX feels too heavy, a future iteration can switch to a split-panel layout.

## Sources

### Primary (HIGH confidence)
- `https://reactflow.dev/examples/misc/download-image` — export implementation verified; `html-to-image@1.11.11` pin confirmed
- `https://reactflow.dev/api-reference/react-flow` — `onNodeClick`, `onNodeMouseEnter`, `onNodeMouseLeave`, `onEdgeMouseEnter`, `onEdgeMouseLeave` event signatures confirmed
- `https://reactflow.dev/api-reference/utils/get-incomers` — `getIncomers(node, nodes, edges): Node[]` signature confirmed
- `https://reactflow.dev/api-reference/utils/get-viewport-for-bounds` — `getViewportForBounds(bounds, width, height, minZoom, maxZoom, padding)` signature confirmed
- `https://reactflow.dev/api-reference/components/edge-label-renderer` — `EdgeLabelRenderer` pattern and pointer-events behavior confirmed
- `https://reactflow.dev/api-reference/types/node-props` — `selected`, `dragging`, `data`, `id` NodeProps fields confirmed
- `https://reactflow.dev/examples/edges/custom-edges` — `getBezierPath` returning `[edgePath, labelX, labelY]` confirmed

### Secondary (MEDIUM confidence)
- `https://github.com/bubkoo/html-to-image/issues/516` — 1.11.13 CSS regression confirmed by multiple users; 1.11.11 confirmed stable
- `https://github.com/bubkoo/html-to-image/issues/542` — Chrome 138+ hang confirmed; not yet fixed
- `https://github.com/wbkd/react-flow/issues/984` — Hover highlight pattern (opacity-based with getIncomers/getOutgoers) confirmed as community standard approach

### Tertiary (LOW confidence)
- WebSearch results on "html2canvas alternatives 2025" — general community trend toward html-to-image; not verified against specific benchmarks

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All core libraries verified against official docs; version pin for html-to-image confirmed from two sources (official example + GitHub issue)
- Architecture: HIGH — All API patterns verified against official React Flow documentation via WebFetch
- Pitfalls: HIGH for version regression (multiple GitHub issues), MEDIUM for hover loop (official doc warning only, not independently verified with code)

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days — React Flow APIs are stable; html-to-image issue may resolve sooner if maintainers release a fix)
