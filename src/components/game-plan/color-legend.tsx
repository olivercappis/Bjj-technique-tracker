import { Panel } from "@xyflow/react";
import type { TechniqueType } from "@/types";

const legendItems: Record<TechniqueType, { label: string; color: string }> = {
  submission: { label: "Submission", color: "#ef4444" },
  sweep: { label: "Sweep", color: "#3b82f6" },
  escape: { label: "Escape", color: "#10b981" },
  transition: { label: "Transition", color: "#f59e0b" },
  pass: { label: "Pass", color: "#8b5cf6" },
  takedown: { label: "Takedown", color: "#f97316" },
};

interface ColorLegendProps {
  visible: boolean;
}

export function ColorLegend({ visible }: ColorLegendProps) {
  if (!visible) return null;

  return (
    <Panel position="top-right">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg">
        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">
          Technique Types
        </div>
        <div className="space-y-1.5">
          {(Object.entries(legendItems) as [TechniqueType, { label: string; color: string }][]).map(
            ([type, { label, color }]) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-foreground">{label}</span>
              </div>
            )
          )}
        </div>
      </div>
    </Panel>
  );
}
