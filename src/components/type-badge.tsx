import { cn } from "@/lib/utils";
import type { TechniqueType } from "@/types";

const typeStyles: Record<TechniqueType, string> = {
  submission:
    "bg-red-500/15 text-red-400 border-red-500/30",
  sweep:
    "bg-blue-500/15 text-blue-400 border-blue-500/30",
  escape:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  transition:
    "bg-amber-500/15 text-amber-400 border-amber-500/30",
  pass:
    "bg-violet-500/15 text-violet-400 border-violet-500/30",
  takedown:
    "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

const typeLabels: Record<TechniqueType, string> = {
  submission: "Submission",
  sweep: "Sweep",
  escape: "Escape",
  transition: "Transition",
  pass: "Pass",
  takedown: "Takedown",
};

interface TypeBadgeProps {
  type: TechniqueType;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        typeStyles[type],
        className
      )}
    >
      {typeLabels[type]}
    </span>
  );
}
