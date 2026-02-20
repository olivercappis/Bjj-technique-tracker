import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TypeBadge } from "@/components/type-badge";
import { DifficultyIndicator } from "@/components/difficulty-indicator";
import { AddToPlanButton } from "@/components/game-plan/add-to-plan-button";
import { techniques, positions } from "@/data";

interface TechniqueDetailSheetProps {
  techniqueId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TechniqueDetailSheet({
  techniqueId,
  open,
  onOpenChange,
}: TechniqueDetailSheetProps) {
  const technique = techniques.find((t) => t.id === techniqueId);
  const position = technique
    ? positions.find((p) => p.id === technique.positionId)
    : undefined;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col p-0">
        {technique ? (
          <>
            <SheetHeader className="px-4 pt-4 pb-2">
              <SheetTitle>{technique.name}</SheetTitle>
              <SheetDescription>{position?.name ?? ""}</SheetDescription>
            </SheetHeader>

            <div className="overflow-y-auto flex-1 px-4 pb-4">
              {/* Type, Difficulty, Add to Plan row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <TypeBadge type={technique.type} />
                <DifficultyIndicator difficulty={technique.difficulty} showLabel />
                <AddToPlanButton techniqueId={technique.id} />
              </div>

              {/* Tags */}
              {technique.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {technique.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {technique.description}
              </p>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="font-heading text-sm font-bold text-foreground mb-3">
                  Step by Step
                </h3>
                <ol className="space-y-3">
                  {technique.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-sm leading-relaxed text-foreground/90">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {technique.tips.length > 0 && (
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    <h3 className="font-heading text-sm font-bold text-amber-400">
                      Tips &amp; Common Mistakes
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {technique.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
