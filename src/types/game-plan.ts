export const PLAN_TAGS = ["gi", "no-gi", "competition"] as const;
export type PlanTag = (typeof PLAN_TAGS)[number];

export interface GamePlan {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  techniqueIds: string[];
  nodePositions?: Record<string, { x: number; y: number }>;
  tags?: PlanTag[];
}
