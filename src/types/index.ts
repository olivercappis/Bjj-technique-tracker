export type TechniqueType =
  | "submission"
  | "sweep"
  | "escape"
  | "transition"
  | "pass"
  | "takedown";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type Perspective = "top" | "bottom" | "both";

export interface PositionCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  perspective: Perspective;
}

export interface Position {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  keyPoints: string[];
}

export interface Technique {
  id: string;
  positionId: string;
  name: string;
  slug: string;
  type: TechniqueType;
  difficulty: DifficultyLevel;
  description: string;
  steps: string[];
  tips: string[];
  tags: string[];
}
