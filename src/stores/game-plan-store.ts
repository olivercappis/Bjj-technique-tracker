import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GamePlan, PlanTag } from "@/types/game-plan";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

interface GamePlanState {
  gamePlans: GamePlan[];
  activeGamePlanId: string | null;

  getActiveGamePlan: () => GamePlan | null;
  createGamePlan: (name: string) => string;
  deleteGamePlan: (id: string) => void;
  renameGamePlan: (id: string, name: string) => void;
  setActiveGamePlan: (id: string) => void;

  duplicateGamePlan: (id: string) => string | null;
  addTag: (planId: string, tag: PlanTag) => void;
  removeTag: (planId: string, tag: PlanTag) => void;

  addTechnique: (techniqueId: string) => void;
  removeTechnique: (techniqueId: string) => void;
  isTechniqueInActivePlan: (techniqueId: string) => boolean;

  updateNodePositions: (
    positions: Record<string, { x: number; y: number }>
  ) => void;
}

export const useGamePlanStore = create<GamePlanState>()(
  persist(
    (set, get) => ({
      gamePlans: [],
      activeGamePlanId: null,

      getActiveGamePlan: () => {
        const { gamePlans, activeGamePlanId } = get();
        return gamePlans.find((p) => p.id === activeGamePlanId) ?? null;
      },

      createGamePlan: (name: string) => {
        const id = generateId();
        const plan: GamePlan = {
          id,
          name,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          techniqueIds: [],
        };
        set((state) => ({
          gamePlans: [...state.gamePlans, plan],
          activeGamePlanId: state.activeGamePlanId ?? id,
        }));
        return id;
      },

      deleteGamePlan: (id: string) => {
        set((state) => {
          const remaining = state.gamePlans.filter((p) => p.id !== id);
          return {
            gamePlans: remaining,
            activeGamePlanId:
              state.activeGamePlanId === id
                ? (remaining[0]?.id ?? null)
                : state.activeGamePlanId,
          };
        });
      },

      renameGamePlan: (id: string, name: string) => {
        set((state) => ({
          gamePlans: state.gamePlans.map((p) =>
            p.id === id ? { ...p, name, updatedAt: Date.now() } : p
          ),
        }));
      },

      setActiveGamePlan: (id: string) => {
        set({ activeGamePlanId: id });
      },

      duplicateGamePlan: (id: string) => {
        const source = get().gamePlans.find((p) => p.id === id);
        if (!source) return null;
        const newId = generateId();
        const copy: GamePlan = {
          ...source,
          id: newId,
          name: `${source.name} (copy)`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          nodePositions: undefined,
          tags: source.tags ?? [],
        };
        set((state) => ({
          gamePlans: [...state.gamePlans, copy],
          activeGamePlanId: newId,
        }));
        return newId;
      },

      addTag: (planId: string, tag: PlanTag) => {
        set((state) => ({
          gamePlans: state.gamePlans.map((p) =>
            p.id === planId && !(p.tags ?? []).includes(tag)
              ? { ...p, tags: [...(p.tags ?? []), tag], updatedAt: Date.now() }
              : p
          ),
        }));
      },

      removeTag: (planId: string, tag: PlanTag) => {
        set((state) => ({
          gamePlans: state.gamePlans.map((p) =>
            p.id === planId
              ? {
                  ...p,
                  tags: (p.tags ?? []).filter((t) => t !== tag),
                  updatedAt: Date.now(),
                }
              : p
          ),
        }));
      },

      addTechnique: (techniqueId: string) => {
        set((state) => {
          const activeId = state.activeGamePlanId;
          if (!activeId) return state;
          return {
            gamePlans: state.gamePlans.map((p) =>
              p.id === activeId && !p.techniqueIds.includes(techniqueId)
                ? {
                    ...p,
                    techniqueIds: [...p.techniqueIds, techniqueId],
                    updatedAt: Date.now(),
                  }
                : p
            ),
          };
        });
      },

      removeTechnique: (techniqueId: string) => {
        set((state) => {
          const activeId = state.activeGamePlanId;
          if (!activeId) return state;
          return {
            gamePlans: state.gamePlans.map((p) =>
              p.id === activeId
                ? {
                    ...p,
                    techniqueIds: p.techniqueIds.filter(
                      (id) => id !== techniqueId
                    ),
                    updatedAt: Date.now(),
                  }
                : p
            ),
          };
        });
      },

      isTechniqueInActivePlan: (techniqueId: string) => {
        const plan = get().getActiveGamePlan();
        return plan?.techniqueIds.includes(techniqueId) ?? false;
      },

      updateNodePositions: (
        positions: Record<string, { x: number; y: number }>
      ) => {
        set((state) => {
          const activeId = state.activeGamePlanId;
          if (!activeId) return state;
          return {
            gamePlans: state.gamePlans.map((p) =>
              p.id === activeId
                ? { ...p, nodePositions: positions, updatedAt: Date.now() }
                : p
            ),
          };
        });
      },
    }),
    {
      name: "bjj-game-plans",
      version: 2,
    }
  )
);
