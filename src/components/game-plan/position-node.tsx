import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

export interface PositionNodeData {
  positionId: string;
  name: string;
  categoryName: string;
  perspective: string;
  techniqueCount: number;
}

interface PositionNodeProps {
  data: PositionNodeData;
}

function PositionNodeComponent({ data }: PositionNodeProps) {
  return (
    <div className="rounded-xl border-2 border-border bg-card px-4 py-3 min-w-[160px] shadow-md relative">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3 !border-2 !border-card"
      />

      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
        {data.techniqueCount}
      </span>

      <p className="text-sm font-bold text-foreground text-center">
        {data.name}
      </p>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3 !border-2 !border-card"
      />
    </div>
  );
}

export const PositionNode = memo(PositionNodeComponent);
