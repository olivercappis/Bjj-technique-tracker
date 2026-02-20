import { useState } from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";

export function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        interactionWidth={20}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && data?.techniqueName && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan absolute bg-card border border-border/70 rounded-md px-2 py-1 text-xs shadow-md"
            style={{
              transform: `translate(-50%, -100%) translate(${labelX}px, ${labelY - 8}px)`,
              pointerEvents: "none",
            }}
          >
            <span className="font-medium text-foreground">{String(data.techniqueName)}</span>
            {data.techniqueType != null && (
              <span className="ml-1.5 text-muted-foreground capitalize">
                {String(data.techniqueType)}
              </span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
