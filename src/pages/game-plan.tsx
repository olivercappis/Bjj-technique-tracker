import { useMemo, useState, useEffect } from "react";
import { GitBranch, List, Workflow } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useGamePlanStore } from "@/stores/game-plan-store";
import { buildGamePlanGraph } from "@/lib/game-plan-graph";
import { FlowchartView } from "@/components/game-plan/flowchart-view";
import { ListView } from "@/components/game-plan/list-view";
import { EmptyState } from "@/components/game-plan/empty-state";
import { PlanSelector } from "@/components/game-plan/plan-selector";

export function GamePlanPage() {
  const { getActiveGamePlan, createGamePlan } = useGamePlanStore();

  // Auto-create a default game plan if none exists
  useEffect(() => {
    if (!getActiveGamePlan()) {
      createGamePlan("My Game Plan");
    }
  }, [getActiveGamePlan, createGamePlan]);

  const activePlan = getActiveGamePlan();
  const techniqueIds = activePlan?.techniqueIds ?? [];

  const { nodes, edges } = useMemo(
    () => buildGamePlanGraph(techniqueIds),
    [techniqueIds]
  );

  const positionCount = nodes.filter((n) => n.type === "position").length;

  // Default to list on small screens
  const [defaultTab, setDefaultTab] = useState("flowchart");
  useEffect(() => {
    if (window.innerWidth < 768) {
      setDefaultTab("list");
    }
  }, []);

  const isEmpty = techniqueIds.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <GitBranch className="h-5 w-5 text-primary" />
          </div>
          <div>
            <PlanSelector />
            {!isEmpty && (
              <p className="text-sm text-muted-foreground mt-1">
                {techniqueIds.length} technique{techniqueIds.length !== 1 ? "s" : ""} across{" "}
                {positionCount} position{positionCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <Tabs defaultValue={defaultTab}>
          <TabsList variant="line" className="mb-6">
            <TabsTrigger value="flowchart" className="gap-1.5">
              <Workflow className="h-4 w-4" />
              Flowchart
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-1.5">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flowchart">
            <FlowchartView nodes={nodes} edges={edges} />
          </TabsContent>

          <TabsContent value="list">
            <ListView techniqueIds={techniqueIds} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
