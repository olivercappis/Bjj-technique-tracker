import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGamePlanStore } from "@/stores/game-plan-store";

interface PlanRenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: string;
  currentName: string;
}

export function PlanRenameDialog({ open, onOpenChange, planId, currentName }: PlanRenameDialogProps) {
  const [name, setName] = useState(currentName);
  const renameGamePlan = useGamePlanStore((s) => s.renameGamePlan);

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || trimmed === currentName) return;
    renameGamePlan(planId, trimmed);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || name.trim() === currentName}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
