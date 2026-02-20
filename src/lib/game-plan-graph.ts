import type { TechniqueType } from "@/types";
import { techniques, positions, categories } from "@/data";

export interface PositionFlowNode {
  id: string; // "pos-{positionId}"
  type: "position";
  position: { x: number; y: number };
  data: {
    positionId: string;
    name: string;
    categoryName: string;
    perspective: string; // "top" | "bottom" | "both"
    techniqueCount: number; // count of selected techniques from this position
  };
}

export interface TechniqueFlowNode {
  id: string; // "tech-{techniqueId}"
  type: "technique";
  position: { x: number; y: number };
  data: {
    techniqueId: string;
    name: string;
    techniqueType: TechniqueType;
    isSubmission: boolean;
  };
}

export function buildGamePlanGraph(techniqueIds: string[]): {
  nodes: (PositionFlowNode | TechniqueFlowNode)[];
  edges: Array<{ id: string; source: string; target: string; data?: { techniqueName?: string; techniqueType?: string } }>;
} {
  const selectedTechniques = techniqueIds
    .map((id) => techniques.find((t) => t.id === id))
    .filter((t): t is (typeof techniques)[number] => t !== undefined);

  if (selectedTechniques.length === 0) {
    return { nodes: [], edges: [] };
  }

  // Collect all position IDs referenced by selected techniques
  const positionIdSet = new Set<string>();
  for (const technique of selectedTechniques) {
    positionIdSet.add(technique.positionId);
    if (technique.resultingPositionId && technique.type !== "submission") {
      positionIdSet.add(technique.resultingPositionId);
    }
  }

  // Count how many plan-selected techniques originate from each position
  const techniqueCountByPosition = new Map<string, number>();
  for (const technique of selectedTechniques) {
    const count = techniqueCountByPosition.get(technique.positionId) ?? 0;
    techniqueCountByPosition.set(technique.positionId, count + 1);
  }

  // Build position nodes
  const positionNodes: PositionFlowNode[] = [];
  for (const posId of positionIdSet) {
    const pos = positions.find((p) => p.id === posId);
    if (!pos) continue;
    const category = categories.find((c) => c.id === pos.categoryId);
    if (!category) continue;

    positionNodes.push({
      id: `pos-${posId}`,
      type: "position",
      position: { x: 0, y: 0 },
      data: {
        positionId: posId,
        name: pos.name,
        categoryName: category.name,
        perspective: category.perspective,
        techniqueCount: techniqueCountByPosition.get(posId) ?? 0,
      },
    });
  }

  // Build technique nodes and edges
  const techniqueNodes: TechniqueFlowNode[] = [];
  const edges: Array<{ id: string; source: string; target: string; data?: { techniqueName?: string; techniqueType?: string } }> = [];

  for (const technique of selectedTechniques) {
    const isSubmission = technique.type === "submission";

    techniqueNodes.push({
      id: `tech-${technique.id}`,
      type: "technique",
      position: { x: 0, y: 0 },
      data: {
        techniqueId: technique.id,
        name: technique.name,
        techniqueType: technique.type,
        isSubmission,
      },
    });

    // Edge: position -> technique
    edges.push({
      id: `e-pos-tech-${technique.id}`,
      source: `pos-${technique.positionId}`,
      target: `tech-${technique.id}`,
    });

    // Edge: technique -> resulting position (non-submissions only)
    if (!isSubmission && technique.resultingPositionId) {
      edges.push({
        id: `e-tech-pos-${technique.id}`,
        source: `tech-${technique.id}`,
        target: `pos-${technique.resultingPositionId}`,
        data: { techniqueName: technique.name, techniqueType: technique.type },
      });
    }
  }

  return {
    nodes: [...positionNodes, ...techniqueNodes],
    edges,
  };
}
