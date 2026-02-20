import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import type { TechniqueType } from "@/types";
import { useGamePlanStore } from "@/stores/game-plan-store";

export interface TechniqueNodeData {
  techniqueId: string;
  name: string;
  techniqueType: TechniqueType;
  isSubmission: boolean;
}

const techniqueColors: Record<TechniqueType, React.CSSProperties> = {
  submission: {
    background: "rgba(239, 68, 68, 0.12)",
    borderColor: "#ef4444",
    color: "#fca5a5",
    borderWidth: "2px",
    boxShadow:
      "0 0 10px 2px rgba(239, 68, 68, 0.35), 0 0 20px 4px rgba(239, 68, 68, 0.15)",
  },
  sweep: {
    background: "rgba(59, 130, 246, 0.12)",
    borderColor: "#3b82f6",
    color: "#93c5fd",
    borderWidth: "2px",
  },
  escape: {
    background: "rgba(16, 185, 129, 0.12)",
    borderColor: "#10b981",
    color: "#6ee7b7",
    borderWidth: "2px",
  },
  transition: {
    background: "rgba(245, 158, 11, 0.12)",
    borderColor: "#f59e0b",
    color: "#fcd34d",
    borderWidth: "2px",
  },
  pass: {
    background: "rgba(139, 92, 246, 0.12)",
    borderColor: "#8b5cf6",
    color: "#c4b5fd",
    borderWidth: "2px",
  },
  takedown: {
    background: "rgba(249, 115, 22, 0.12)",
    borderColor: "#f97316",
    color: "#fdba74",
    borderWidth: "2px",
  },
};

interface TechniqueNodeProps {
  data: TechniqueNodeData;
}

function TechniqueNodeComponent({ data }: TechniqueNodeProps) {
  const removeTechnique = useGamePlanStore((s) => s.removeTechnique);

  return (
    <div
      className="relative group rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap min-w-24 max-w-48 text-center truncate border"
      style={techniqueColors[data.techniqueType]}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-current !border-0"
      />
      {data.name}
      {!data.isSubmission && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-2 !h-2 !bg-current !border-0"
        />
      )}
      <button
        className="nodrag absolute -top-1.5 -right-1.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          removeTechnique(data.techniqueId);
        }}
        title="Remove from plan"
      >
        x
      </button>
    </div>
  );
}

export const TechniqueNode = memo(TechniqueNodeComponent);
