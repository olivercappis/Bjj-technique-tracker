import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGamePlanStore } from "@/stores/game-plan-store";

interface PlanCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanCreateDialog({ open, onOpenChange }: PlanCreateDialogProps) {
  const [name, setName] = useState("");
  const createGamePlan = useGamePlanStore((s) => s.createGamePlan);
  const setActiveGamePlan = useGamePlanStore((s) => s.setActiveGamePlan);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = createGamePlan(trimmed);
    setActiveGamePlan(id);
    setName("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="e.g. Competition Pressure Passing"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Create Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
