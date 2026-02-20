import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/types";

const difficultyConfig: Record<
  DifficultyLevel,
  { filled: number; label: string; color: string }
> = {
  beginner: { filled: 1, label: "Beginner", color: "bg-emerald-400" },
  intermediate: { filled: 2, label: "Intermediate", color: "bg-amber-400" },
  advanced: { filled: 3, label: "Advanced", color: "bg-red-400" },
};

interface DifficultyIndicatorProps {
  difficulty: DifficultyLevel;
  showLabel?: boolean;
  className?: string;
}

export function DifficultyIndicator({
  difficulty,
  showLabel = false,
  className,
}: DifficultyIndicatorProps) {
  const config = difficultyConfig[difficulty];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex gap-1">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={cn(
              "h-2 w-2 rounded-full",
              dot <= config.filled ? config.color : "bg-muted"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
}
