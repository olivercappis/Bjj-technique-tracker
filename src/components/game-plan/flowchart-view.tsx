import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  getIncomers,
  getOutgoers,
  type Node,
  type Edge,
  type NodeMouseHandler,
  type EdgeMouseHandler,
  MarkerType,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { PositionNode } from "./position-node";
import { TechniqueNode } from "./technique-node";
import { LabeledEdge } from "./labeled-edge";
import { ColorLegend } from "./color-legend";
import { ExportButton } from "./export-button";
import { TechniqueDetailSheet } from "./technique-detail-sheet";
import { PositionBrowserSheet } from "./position-browser-sheet";
import type { PositionFlowNode, TechniqueFlowNode } from "@/lib/game-plan-graph";
import { useGamePlanStore } from "@/stores/game-plan-store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeTypes: Record<string, any> = { position: PositionNode, technique: TechniqueNode };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const edgeTypes: Record<string, any> = { default: LabeledEdge };

const POSITION_NODE_WIDTH = 180;
const POSITION_NODE_HEIGHT = 60;
const TECHNIQUE_NODE_WIDTH = 160;
const TECHNIQUE_NODE_HEIGHT = 36;

function applyDagreLayout(
  nodes: Node[],
  edges: Edge[],
  savedPositions?: Record<string, { x: number; y: number }>
): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 60, ranksep: 80 });

  for (const node of nodes) {
    const width = node.type === "position" ? POSITION_NODE_WIDTH : TECHNIQUE_NODE_WIDTH;
    const height = node.type === "position" ? POSITION_NODE_HEIGHT : TECHNIQUE_NODE_HEIGHT;
    g.setNode(node.id, { width, height });
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const saved = savedPositions?.[node.id];
    if (saved) {
      return { ...node, position: { x: saved.x, y: saved.y } };
    }

    const dagreNode = g.node(node.id);
    const width = node.type === "position" ? POSITION_NODE_WIDTH : TECHNIQUE_NODE_WIDTH;
    const height = node.type === "position" ? POSITION_NODE_HEIGHT : TECHNIQUE_NODE_HEIGHT;
    return {
      ...node,
      position: {
        x: dagreNode.x - width / 2,
        y: dagreNode.y - height / 2,
      },
    };
  });
}

interface FlowchartViewProps {
  nodes: (PositionFlowNode | TechniqueFlowNode)[];
  edges: Array<{ id: string; source: string; target: string; data?: { techniqueName?: string; techniqueType?: string } }>;
}

export function FlowchartView({ nodes: inputNodes, edges: inputEdges }: FlowchartViewProps) {
  const activePlan = useGamePlanStore(
    (s) => s.gamePlans.find((p) => p.id === s.activeGamePlanId)
  );
  const updateNodePositions = useGamePlanStore((s) => s.updateNodePositions);

  const [legendVisible, setLegendVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<{ type: "technique" | "position"; id: string } | null>(null);

  const initialEdges: Edge[] = useMemo(
    () =>
      inputEdges.map((e) => ({
        ...e,
        markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
        style: { stroke: "oklch(0.55 0.02 260 / 0.5)", strokeWidth: 1.5 },
      })),
    [inputEdges]
  );

  const layoutedNodes = useMemo(
    () =>
      applyDagreLayout(
        inputNodes as Node[],
        initialEdges,
        activePlan?.nodePositions
      ),
    [inputNodes, initialEdges, activePlan?.nodePositions]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(layoutedNodes);
  }, [layoutedNodes, setNodes]);

  const onNodeDragStop = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    for (const n of nodes) {
      positions[n.id] = n.position;
    }
    updateNodePositions(positions);
  }, [nodes, updateNodePositions]);

  const onNodeClick = useCallback((_e: React.MouseEvent, node: Node) => {
    if (node.type === "technique") {
      setSelectedNode({ type: "technique", id: (node.data as { techniqueId: string }).techniqueId });
    } else if (node.type === "position") {
      setSelectedNode({ type: "position", id: (node.data as { positionId: string }).positionId });
    }
  }, []);

  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_event, hoveredNode) => {
      const connected = new Set<string>([
        hoveredNode.id,
        ...getIncomers(hoveredNode, nodes, edges).map((n) => n.id),
        ...getOutgoers(hoveredNode, nodes, edges).map((n) => n.id),
      ]);
      const connectedEdgeIds = new Set<string>(
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
    },
    [nodes, edges, setNodes, setEdges]
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })));
    setEdges((eds) => eds.map((e) => ({ ...e, style: { ...e.style, opacity: 1 }, animated: false })));
  }, [setNodes, setEdges]);

  const onEdgeMouseEnter: EdgeMouseHandler = useCallback(
    (_event, hoveredEdge) => {
      const connectedNodeIds = new Set<string>([hoveredEdge.source, hoveredEdge.target]);
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: { ...n.style, opacity: connectedNodeIds.has(n.id) ? 1 : 0.2 },
        }))
      );
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          style: { ...e.style, opacity: e.id === hoveredEdge.id ? 1 : 0.15 },
          animated: e.id === hoveredEdge.id,
        }))
      );
    },
    [setNodes, setEdges]
  );

  const onEdgeMouseLeave: EdgeMouseHandler = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })));
    setEdges((eds) => eds.map((e) => ({ ...e, style: { ...e.style, opacity: 1 }, animated: false })));
  }, [setNodes, setEdges]);

  return (
    <>
      <div className="h-[600px] w-full rounded-xl border border-border/50 bg-card overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onEdgeMouseEnter={onEdgeMouseEnter}
          onEdgeMouseLeave={onEdgeMouseLeave}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="oklch(0.28 0.015 255 / 0.5)" />
          <Controls
            className="!bg-card !border-border/50 !shadow-lg [&_button]:!bg-card [&_button]:!border-border/50 [&_button]:!text-foreground [&_button:hover]:!bg-accent"
          />
          <MiniMap
            className="!bg-card !border-border/50"
            nodeColor="oklch(0.55 0.22 25 / 0.5)"
            maskColor="oklch(0.14 0.02 260 / 0.7)"
          />
          <Panel position="top-left">
            <button
              onClick={() => setLegendVisible((v) => !v)}
              className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            >
              Legend
            </button>
          </Panel>
          <Panel position="top-right">
            <ExportButton />
          </Panel>
          <ColorLegend visible={legendVisible} />
        </ReactFlow>
      </div>
      <TechniqueDetailSheet
        techniqueId={selectedNode?.type === "technique" ? selectedNode.id : ""}
        open={selectedNode?.type === "technique"}
        onOpenChange={(open) => { if (!open) setSelectedNode(null); }}
      />
      <PositionBrowserSheet
        positionId={selectedNode?.type === "position" ? selectedNode.id : ""}
        open={selectedNode?.type === "position"}
        onOpenChange={(open) => { if (!open) setSelectedNode(null); }}
      />
    </>
  );
}
