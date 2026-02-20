import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGamePlanStore } from "@/stores/game-plan-store";

interface AddToPlanButtonProps {
  techniqueId: string;
}

export function AddToPlanButton({ techniqueId }: AddToPlanButtonProps) {
  const {
    addTechnique,
    removeTechnique,
    isTechniqueInActivePlan,
    getActiveGamePlan,
    createGamePlan,
  } = useGamePlanStore();

  const isInPlan = isTechniqueInActivePlan(techniqueId);

  function handleClick() {
    // Auto-create a default game plan if none exists
    if (!getActiveGamePlan()) {
      createGamePlan("My Game Plan");
    }

    if (isInPlan) {
      removeTechnique(techniqueId);
    } else {
      addTechnique(techniqueId);
    }
  }

  return (
    <Button
      variant={isInPlan ? "secondary" : "outline"}
      size="sm"
      onClick={handleClick}
      className="gap-1.5"
    >
      {isInPlan ? (
        <>
          <Check className="h-3.5 w-3.5" />
          In Game Plan
        </>
      ) : (
        <>
          <Plus className="h-3.5 w-3.5" />
          Add to Plan
        </>
      )}
    </Button>
  );
}
