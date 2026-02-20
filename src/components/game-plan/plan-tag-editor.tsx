import { PLAN_TAGS } from "@/types/game-plan";
import { useGamePlanStore } from "@/stores/game-plan-store";

interface PlanTagEditorProps {
  planId: string;
}

export function PlanTagEditor({ planId }: PlanTagEditorProps) {
  const plan = useGamePlanStore((s) => s.gamePlans.find((p) => p.id === planId));
  const addTag = useGamePlanStore((s) => s.addTag);
  const removeTag = useGamePlanStore((s) => s.removeTag);

  return (
    <div className="flex gap-1.5 flex-wrap">
      {PLAN_TAGS.map((tag) => {
        const isActive = (plan?.tags ?? []).includes(tag);
        return (
          <button
            key={tag}
            className={[
              "text-[10px] px-1.5 py-0 rounded-full border transition-colors",
              isActive
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-transparent border-border text-muted-foreground hover:border-primary/30",
            ].join(" ")}
            onClick={() => {
              if (isActive) {
                removeTag(planId, tag);
              } else {
                addTag(planId, tag);
              }
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
