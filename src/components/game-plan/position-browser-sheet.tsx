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
import { positions, getTechniquesByPosition } from "@/data";

interface PositionBrowserSheetProps {
  positionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PositionBrowserSheet({
  positionId,
  open,
  onOpenChange,
}: PositionBrowserSheetProps) {
  const position = positions.find((p) => p.id === positionId);
  const positionTechniques = positionId ? getTechniquesByPosition(positionId) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle>{position?.name ?? ""}</SheetTitle>
          <SheetDescription>
            Browse and add techniques from this position
          </SheetDescription>
        </SheetHeader>

        <div className="overflow-y-auto flex-1 px-4 pb-4">
          {positionTechniques.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-4">
              No techniques available for this position.
            </p>
          ) : (
            <div className="space-y-2 mt-2">
              {positionTechniques.map((technique) => (
                <div
                  key={technique.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-3 gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">
                      {technique.name}
                    </span>
                    <TypeBadge type={technique.type} />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <DifficultyIndicator difficulty={technique.difficulty} />
                    <AddToPlanButton techniqueId={technique.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
