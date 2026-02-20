import { useState } from "react";
import { ChevronDown, Plus, Pencil, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGamePlanStore } from "@/stores/game-plan-store";
import { PlanCreateDialog } from "./plan-create-dialog";
import { PlanRenameDialog } from "./plan-rename-dialog";
import { PlanDeleteDialog } from "./plan-delete-dialog";
import { PlanTagEditor } from "./plan-tag-editor";
import { cn } from "@/lib/utils";

export function PlanSelector() {
  const gamePlans = useGamePlanStore((s) => s.gamePlans);
  const activeGamePlanId = useGamePlanStore((s) => s.activeGamePlanId);
  const setActiveGamePlan = useGamePlanStore((s) => s.setActiveGamePlan);
  const duplicateGamePlan = useGamePlanStore((s) => s.duplicateGamePlan);
  const deleteGamePlan = useGamePlanStore((s) => s.deleteGamePlan);

  const [createOpen, setCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const activePlan = gamePlans.find((p) => p.id === activeGamePlanId);

  function handleDelete() {
    if (!deleteTarget) return;
    deleteGamePlan(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {activePlan?.name ?? "Select Plan"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {gamePlans.map((plan) => (
            <DropdownMenuItem
              key={plan.id}
              className={cn(
                "flex items-center justify-between pr-1",
                plan.id === activeGamePlanId && "bg-accent"
              )}
              onSelect={() => setActiveGamePlan(plan.id)}
            >
              <span className="flex-1 truncate">{plan.name}</span>
              {(plan.tags ?? []).length > 0 && (
                <span className="flex gap-1 ml-1">
                  {(plan.tags ?? []).map((tag) => (
                    <span key={tag} className="text-[9px] px-1 py-0 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
              <span className="flex items-center gap-0.5 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setRenameTarget({ id: plan.id, name: plan.name });
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Rename</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    duplicateGamePlan(plan.id);
                  }}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Duplicate</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDeleteTarget({ id: plan.id, name: plan.name });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            New Plan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {activeGamePlanId && <PlanTagEditor planId={activeGamePlanId} />}

      <PlanCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
      {renameTarget && (
        <PlanRenameDialog
          open={true}
          onOpenChange={(open) => { if (!open) setRenameTarget(null); }}
          planId={renameTarget.id}
          currentName={renameTarget.name}
        />
      )}
      {deleteTarget && (
        <PlanDeleteDialog
          open={true}
          onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
          planName={deleteTarget.name}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
