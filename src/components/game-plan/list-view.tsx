import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypeBadge } from "@/components/type-badge";
import { categories, positions, techniques } from "@/data";
import type { Technique } from "@/types";
import { useGamePlanStore } from "@/stores/game-plan-store";

const perspectiveBorder: Record<string, string> = {
  top: "border-l-violet-500",
  bottom: "border-l-blue-500",
  both: "border-l-amber-500",
};

interface ListViewProps {
  techniqueIds: string[];
}

function getPositionPath(positionId: string) {
  const position = positions.find((p) => p.id === positionId);
  if (!position) return "/";
  const category = categories.find((c) => c.id === position.categoryId);
  if (!category) return "/";
  return `/${category.slug}/${position.slug}`;
}

function getTargetPositionName(positionId: string) {
  const position = positions.find((p) => p.id === positionId);
  return position?.name ?? positionId;
}

export function ListView({ techniqueIds }: ListViewProps) {
  const removeTechnique = useGamePlanStore((s) => s.removeTechnique);

  // Resolve techniqueIds to full technique objects
  const selectedTechniques = techniqueIds
    .map((id) => techniques.find((t) => t.id === id))
    .filter((t): t is Technique => t !== undefined);

  // Group techniques by positionId
  const techniquesByPosition = new Map<string, Technique[]>();
  for (const technique of selectedTechniques) {
    const list = techniquesByPosition.get(technique.positionId) ?? [];
    list.push(technique);
    techniquesByPosition.set(technique.positionId, list);
  }

  return (
    <div className="space-y-4">
      {[...techniquesByPosition.entries()].map(([positionId, positionTechniques]) => {
        const position = positions.find((p) => p.id === positionId);
        if (!position) return null;
        const category = categories.find((c) => c.id === position.categoryId);
        if (!category) return null;

        const submissions = positionTechniques.filter((t) => t.type === "submission");
        const transitions = positionTechniques.filter(
          (t) => t.type !== "submission" && t.resultingPositionId
        );

        return (
          <div
            key={positionId}
            className={cn(
              "rounded-lg border border-border/50 bg-card overflow-hidden border-l-4",
              perspectiveBorder[category.perspective]
            )}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Link
                  to={getPositionPath(positionId)}
                  className="font-heading text-base font-bold text-foreground hover:text-primary transition-colors"
                >
                  {position.name}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {category.name}
                </span>
              </div>

              {/* Submissions */}
              {submissions.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground font-medium mb-1.5">
                    Submissions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {submissions.map((sub) => (
                      <span
                        key={sub.id}
                        className="text-xs bg-red-500/15 text-red-400 border border-red-500/30 rounded-full px-2 py-0.5 inline-flex items-center gap-1 group/sub"
                      >
                        {sub.name}
                        <button
                          onClick={() => removeTechnique(sub.id)}
                          className="opacity-0 group-hover/sub:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                          title="Remove from plan"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Outgoing transitions */}
              {transitions.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-1.5">
                    Transitions
                  </div>
                  <div className="space-y-1.5">
                    {transitions.map((technique) => (
                      <div
                        key={technique.id}
                        className="flex items-center gap-2 text-sm group/row"
                      >
                        <TypeBadge type={technique.type} className="text-[10px] px-1.5 py-0" />
                        <span className="text-foreground/80 truncate">
                          {technique.name}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                        <Link
                          to={getPositionPath(technique.resultingPositionId!)}
                          className="text-primary text-xs font-medium hover:underline shrink-0"
                        >
                          {getTargetPositionName(technique.resultingPositionId!)}
                        </Link>
                        <button
                          onClick={() => removeTechnique(technique.id)}
                          className="ml-auto opacity-0 group-hover/row:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0"
                          title="Remove from plan"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
