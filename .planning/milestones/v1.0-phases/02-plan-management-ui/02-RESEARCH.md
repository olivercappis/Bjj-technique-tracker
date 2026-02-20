# Phase 2: Plan Management UI - Research

**Researched:** 2026-02-17
**Domain:** Zustand v5 store extension, Radix UI primitives (Dialog, DropdownMenu), shadcn/ui component patterns, React state for CRUD UI, inline editing, confirmation dialogs, tag systems
**Confidence:** HIGH

---

## Summary

Phase 2 adds full CRUD management for game plans: create, rename, delete (with confirmation), duplicate, tag, and switch between plans. It also adds per-technique removal from the flowchart and list views. All infrastructure from Phase 1 is in place: Zustand v5 with persist middleware for the store, Radix UI primitives (Dialog, Sheet already exist in the UI component library), and shadcn/ui "new-york" style components.

The store (`game-plan-store.ts`) already has `createGamePlan`, `deleteGamePlan`, `renameGamePlan`, and `setActiveGamePlan`. What is missing is: (1) store actions for `duplicateGamePlan` and tag management, (2) `GamePlan` type extension for `tags`, (3) UI components to expose all these operations, and (4) `removeTechnique` wired into the flowchart and list view nodes. No new npm packages are needed — the existing stack (Zustand, Radix UI via `radix-ui` unified package, lucide-react, Tailwind v4) covers everything required.

The primary architectural question is where plan-switching and plan management UI lives. The recommendation is a plan selector in the game-plan page header (not the global app header) — a dropdown/popover for switching between plans, with management actions accessible via an icon button that opens a dialog. This keeps the global header clean and management scoped to where it makes sense.

**Primary recommendation:** Extend the Zustand store with `duplicateGamePlan` and tag actions, extend the `GamePlan` type with `tags: string[]`, build a `PlanSelector` component for the game-plan page header, use the existing `Dialog` component for create/rename/delete flows, and wire `removeTechnique` into `TechniqueNode` and the `ListView` rows.

---

## Standard Stack

### Core (all already installed — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `zustand` | ^5.0.11 | Store for all plan state — gamePlans array, activeGamePlanId, CRUD actions | Already in use; persist middleware handles localStorage |
| `radix-ui` | ^1.4.3 | Dialog, DropdownMenu, AlertDialog primitives for confirmation and menus | Already installed as unified package; Dialog and Sheet already used in project |
| `lucide-react` | ^0.564.0 | Icons throughout management UI (Plus, Trash2, Pencil, Copy, Tag, ChevronDown) | Already in use project-wide |
| `tailwindcss` | ^4.1.18 | All component styling | Already in use |

### What's in the Project's UI Library Already

The `src/components/ui/` directory contains:
- `dialog.tsx` — full Dialog primitive with DialogHeader, DialogFooter, DialogTitle, DialogDescription
- `sheet.tsx` — side-panel alternative to dialog
- `tabs.tsx` — already used in game-plan page
- `button.tsx` — Button with variants (default, secondary, outline, destructive)
- `badge.tsx` — for tag display
- `card.tsx` — for plan list items

**Missing from UI library that may need adding via shadcn:**
- `DropdownMenu` — for the plan switcher trigger and per-plan action menu (rename, duplicate, delete)
- `Input` — for plan name text input fields in create/rename dialogs
- `AlertDialog` — for the delete confirmation (separate from Dialog; has destructive action affordance)
- `Popover` — alternative to DropdownMenu for plan switcher panel

### Shadcn CLI Addition Commands

```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add alert-dialog
```

These will add the Radix UI primitives as styled components into `src/components/ui/`. The project uses `radix-ui` (unified package v1.4.3) not individual `@radix-ui/*` packages. The shadcn "new-york" style is configured in `components.json`.

**Verification note:** The project's `radix-ui` unified package v1.4.3 re-exports all Radix primitives. Shadcn components import from `radix-ui` subpaths (e.g., `radix-ui/react-dropdown-menu`) — this is compatible with the installed `radix-ui` package.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| AlertDialog (Radix) | Window.confirm() | `window.confirm` blocks the event loop, can't be styled, doesn't fit the dark UI. AlertDialog is the right pattern. |
| DropdownMenu for plan list | A custom Sheet panel | Sheet provides more room for a long plan list with management actions per row — viable if plan count grows large. For Phase 2, DropdownMenu suffices. |
| Tag badges (simple strings) | A dedicated tag component library | Overkill — `Badge` from shadcn is sufficient for 3-label system (gi, no-gi, competition). |

---

## Architecture Patterns

### Recommended File Structure After Phase 2

```
src/
├── types/
│   └── game-plan.ts          # Add tags: string[] to GamePlan interface
├── stores/
│   └── game-plan-store.ts    # Add duplicateGamePlan(), addTag(), removeTag() actions
├── components/
│   └── game-plan/
│       ├── plan-selector.tsx          # NEW: plan switcher dropdown + "New Plan" button
│       ├── plan-create-dialog.tsx     # NEW: dialog for naming a new plan
│       ├── plan-rename-dialog.tsx     # NEW: dialog for renaming existing plan
│       ├── plan-delete-dialog.tsx     # NEW: AlertDialog for delete confirmation
│       ├── plan-tag-editor.tsx        # NEW: inline tag toggle UI (gi, no-gi, competition)
│       ├── technique-node.tsx         # UPDATE: add remove button interaction
│       ├── list-view.tsx              # UPDATE: add remove button per technique row
│       └── empty-state.tsx            # UPDATE: improve messaging when plan has no techniques
└── pages/
    └── game-plan.tsx                  # UPDATE: add PlanSelector to page header area
```

### Pattern 1: Controlled Dialog for Create/Rename

**What:** A dialog opened by a button, with a text input. On submit, calls the store action and closes.
**When to use:** Create (needs name input) and Rename (needs name input with current name pre-filled).

```typescript
// Source: existing src/components/ui/dialog.tsx pattern
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // to be added via shadcn

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
    if (!name.trim()) return;
    const id = createGamePlan(name.trim());
    setActiveGamePlan(id);
    setName("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Game Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="e.g. Competition Pressure Passing"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <DialogFooter>
            <Button type="submit" disabled={!name.trim()}>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Pattern 2: AlertDialog for Delete Confirmation

**What:** A separate AlertDialog (not Dialog) with explicit Cancel and destructive Delete buttons. Radix AlertDialog is semantically distinct — it communicates intent and blocks interaction until dismissed.
**When to use:** Any destructive action (delete game plan).

```typescript
// Source: shadcn AlertDialog pattern + existing dialog.tsx in project
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // to be added via shadcn

export function PlanDeleteDialog({ open, onOpenChange, planName, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{planName}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this game plan and all its technique selections.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            Delete Plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Pattern 3: Plan Selector Dropdown

**What:** A button showing the active plan name with a chevron. Clicking opens a DropdownMenu listing all plans. Each item switches the active plan. A "+ New Plan" item at the bottom opens the create dialog. Each plan item has a trailing "..." menu (or icon buttons) for rename, duplicate, delete.
**When to use:** Plan switching in the game-plan page header area.

```typescript
// Pattern using DropdownMenu from shadcn
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,
         DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function PlanSelector() {
  const gamePlans = useGamePlanStore((s) => s.gamePlans);
  const activeGamePlanId = useGamePlanStore((s) => s.activeGamePlanId);
  const setActiveGamePlan = useGamePlanStore((s) => s.setActiveGamePlan);
  const activePlan = gamePlans.find((p) => p.id === activeGamePlanId);

  const [createOpen, setCreateOpen] = useState(false);

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
              onSelect={() => setActiveGamePlan(plan.id)}
              className={cn(plan.id === activeGamePlanId && "bg-accent")}
            >
              {plan.name}
              {/* Per-plan action icons here, or nested ... menu */}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> New Plan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PlanCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
```

### Pattern 4: Tag System as String Array on GamePlan

**What:** `tags: string[]` field on `GamePlan`. The allowed tag values are a fixed set: `"gi"`, `"no-gi"`, `"competition"`. Tag editing is a simple toggle UI (3 badge buttons, active/inactive state).

**Type extension:**
```typescript
// src/types/game-plan.ts
export const PLAN_TAGS = ["gi", "no-gi", "competition"] as const;
export type PlanTag = typeof PLAN_TAGS[number];

export interface GamePlan {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  techniqueIds: string[];
  nodePositions?: Record<string, { x: number; y: number }>;
  tags: PlanTag[];  // NEW — default []
}
```

**Store actions:**
```typescript
// game-plan-store.ts additions
addTag: (planId: string, tag: PlanTag) => void;
removeTag: (planId: string, tag: PlanTag) => void;
```

**Tag editor component:**
```typescript
export function PlanTagEditor({ planId }: { planId: string }) {
  const plan = useGamePlanStore((s) => s.gamePlans.find((p) => p.id === planId));
  const addTag = useGamePlanStore((s) => s.addTag);
  const removeTag = useGamePlanStore((s) => s.removeTag);

  return (
    <div className="flex gap-2 flex-wrap">
      {PLAN_TAGS.map((tag) => {
        const active = plan?.tags.includes(tag) ?? false;
        return (
          <button
            key={tag}
            onClick={() => active ? removeTag(planId, tag) : addTag(planId, tag)}
            className={cn(
              "text-xs px-2 py-0.5 rounded-full border transition-colors",
              active
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-transparent border-border text-muted-foreground hover:border-primary/30"
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
```

### Pattern 5: Duplicate Plan Store Action

**What:** Creates a new plan with all technique IDs copied from source, a modified name, and empty `nodePositions` (fresh layout). The new plan becomes active.

```typescript
// game-plan-store.ts
duplicateGamePlan: (id: string) => string | null;

// Implementation
duplicateGamePlan: (id: string) => {
  const { gamePlans } = get();
  const source = gamePlans.find((p) => p.id === id);
  if (!source) return null;
  const newId = generateId();
  const copy: GamePlan = {
    ...source,
    id: newId,
    name: `${source.name} (copy)`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    nodePositions: undefined, // fresh layout
  };
  set((state) => ({
    gamePlans: [...state.gamePlans, copy],
    activeGamePlanId: newId,
  }));
  return newId;
},
```

### Pattern 6: Remove Technique from TechniqueNode (INTX-03)

**What:** A small "×" button on each TechniqueNode in the flowchart. Clicking calls `removeTechnique`. The button must not trigger React Flow's drag behavior.

**Critical detail:** React Flow fires `onNodeClick` and drag events on the node. To make an interactive button inside a node work without triggering drag, use `event.stopPropagation()` on the button click handler and add the `nodrag` class to the button element (React Flow checks this class to suppress drag on interactive children).

```typescript
// technique-node.tsx update
function TechniqueNodeComponent({ data }: TechniqueNodeProps) {
  const removeTechnique = useGamePlanStore((s) => s.removeTechnique);

  return (
    <div className="rounded-full px-3 py-1.5 text-xs font-medium ... relative group">
      <Handle type="target" position={Position.Top} className="..." />
      {data.name}
      {/* Remove button — appears on hover */}
      <button
        className="nodrag absolute -top-1.5 -right-1.5 hidden group-hover:flex
                   h-4 w-4 items-center justify-center rounded-full
                   bg-destructive text-destructive-foreground text-[10px]
                   opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          removeTechnique(data.techniqueId);
        }}
        title="Remove from plan"
      >
        ×
      </button>
      {!data.isSubmission && <Handle type="source" position={Position.Bottom} className="..." />}
    </div>
  );
}
```

**Note:** `removeTechnique` in the existing store operates on the active plan's `techniqueIds`. Since TechniqueNodes in the flowchart always belong to the active plan, this is correct behavior.

### Pattern 7: Remove Technique from ListView (INTX-03)

**What:** A small trash/× icon button at the end of each technique row in `ListView`. Same store action — `removeTechnique`.

```typescript
// list-view.tsx update — add Trash2 icon button per technique
<div key={technique.id} className="flex items-center gap-2 text-sm group">
  {/* existing content */}
  <button
    onClick={() => removeTechnique(technique.id)}
    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity
               text-muted-foreground hover:text-destructive"
    title="Remove from plan"
  >
    <Trash2 className="h-3.5 w-3.5" />
  </button>
</div>
```

### Pattern 8: Empty State Variants

**What:** The existing `EmptyState` component covers "no techniques in plan." Phase 2 adds a variant for "no plans at all" — but the current auto-create behavior (creates "My Game Plan" on mount) likely means this state is rare. The better improvement is enriching the existing empty state to mention the plan name and offer to rename it.

**Decision:** The `EmptyState` should become context-aware:
- When `gamePlans.length === 0`: Show "Create your first game plan" state (though auto-create makes this unlikely)
- When `activePlan.techniqueIds.length === 0`: Current state — "Your game plan is empty" with Browse link

The page-level management already shows the plan name in the header. Enriching the empty state with a link/button to rename is optional — mark as PLAN-05 nice-to-have.

### Anti-Patterns to Avoid

- **Nesting DropdownMenuItem inside a DropdownMenuItem for per-plan actions:** Radix DropdownMenu does not support nested menus by default without `DropdownMenuSub`. Use icon buttons beside each plan item instead, or open a secondary dialog via state.
- **Using `window.confirm()` for delete confirmation:** Not styleable, blocks thread, inconsistent with app aesthetic. Use AlertDialog.
- **Calling `removeTechnique` without confirming the active plan context:** The current store implementation always removes from the active plan. The flowchart and list view only show the active plan's techniques, so this is safe — but document this assumption.
- **Storing tags as a comma-separated string:** Always store as `string[]` (array). Serialization to localStorage by Zustand persist handles arrays correctly as JSON.
- **Making `tags` required without migration:** Existing stored plans won't have `tags`. Either make `tags` optional (`tags?: PlanTag[]`) or add a Zustand persist `migrate` function. The simplest path: default to `[]` in the store's initial plan creation and treat missing `tags` as `[]` in all reads.
- **Putting plan management UI in the global header:** The global header is sparse and intentional. Plan management belongs on the game-plan page itself, near the context where plans are used.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Delete confirmation dialog | Custom modal with overlay | `AlertDialog` from Radix (via shadcn) | AlertDialog has proper ARIA roles (`alertdialog`), focus trapping, backdrop, escape-to-close — all handled |
| Plan name text input | Raw `<input>` with custom styling | `Input` from shadcn | Consistent styling with project design tokens, accessible label association, error state support |
| Plan list dropdown | Custom absolute-positioned div | `DropdownMenu` from Radix | Handles portal rendering, keyboard navigation, focus management, outside-click-to-close, scroll lock |
| ID generation | `Math.random()` directly | Existing `generateId()` in store | Already in use, collision-resistant — use same function for duplicated plans |
| Tag persistence | Custom localStorage writes | Zustand persist | Already persists the whole store; just extend `GamePlan` type with `tags` and persist handles it |

**Key insight:** Every UI primitive needed for Phase 2 has a Radix/shadcn equivalent. The project already imports from `radix-ui` (the unified package). Adding DropdownMenu, Input, and AlertDialog via `npx shadcn@latest add` is the only setup work needed.

---

## Common Pitfalls

### Pitfall 1: Tags on Existing Persisted Plans Without Migration

**What goes wrong:** Users who already have game plans in localStorage won't have `tags: []` on those plans. If code does `plan.tags.includes(tag)`, it throws `TypeError: Cannot read properties of undefined (reading 'includes')`.

**Why it happens:** Zustand persist rehydrates the exact saved JSON. Old plans don't have `tags`.

**How to avoid:** Two options:
1. Make `tags` optional: `tags?: PlanTag[]` and use `plan.tags ?? []` everywhere.
2. Add a `migrate` function in the persist config that adds `tags: []` to all existing plans.

**Recommendation:** Option 1 is simpler and safer. Use `plan.tags ?? []` in all read paths. New plans created via `createGamePlan` always set `tags: []`.

**Warning signs:** Runtime errors about `tags` being `undefined` in console during development after clearing localStorage.

### Pitfall 2: React Flow Drag Firing on Technique Node Buttons

**What goes wrong:** Clicking the "×" remove button on a technique node triggers React Flow's node drag behavior instead of (or in addition to) the click handler.

**Why it happens:** React Flow attaches `onMouseDown` to the node wrapper and interprets any mouse down as the start of a drag. Child elements inside the node need to signal they are interactive.

**How to avoid:** Add the `nodrag` CSS class to any interactive child element inside a React Flow custom node. React Flow checks for this class to suppress drag initiation. Also call `e.stopPropagation()` on the button's `onClick`.

```typescript
<button
  className="nodrag ..."
  onClick={(e) => { e.stopPropagation(); removeTechnique(data.techniqueId); }}
>
```

**Warning signs:** Clicking the remove button moves the node instead of removing the technique; the click handler fires but the node also starts dragging.

### Pitfall 3: DropdownMenu Content Not Visible Due to Portal Z-Index

**What goes wrong:** The DropdownMenu content renders in a portal but appears behind the React Flow canvas or other elements.

**Why it happens:** React Flow uses a high z-index internally. Radix portals render at the body level but use CSS variables for z-index layering.

**How to avoid:** The project already handles this with `z-50` on dialog overlays. DropdownMenuContent from shadcn uses `z-50` by default. If React Flow's canvas has a conflicting stacking context, ensure the plan selector is positioned above the flowchart in the DOM (in the page header, not inside the ReactFlow wrapper).

**Warning signs:** Dropdown opens but is invisible or clipped; visible behind the flowchart canvas.

### Pitfall 4: Plan Switcher Causing Full Re-Layout of Flowchart

**What goes wrong:** Switching active plan triggers `buildGamePlanGraph` to recompute, Dagre runs, and the flowchart re-layouts completely even if the new plan has saved `nodePositions`.

**Why it happens:** The saved positions are per-plan in Zustand. When `activeGamePlanId` changes, `FlowchartView` gets new `inputNodes`/`inputEdges` and re-runs `applyDagreLayout`. If the new plan has saved positions, they ARE used (existing logic: `savedPositions?.[node.id]` fallback). This is correct behavior.

**The real risk:** If the plan selector is rendered inside the same component that reads `activePlan?.nodePositions`, the selector dropdown closing may trigger an extra render that clears node positions in the React Flow internal state.

**How to avoid:** Keep the plan selector state (`open: boolean`, dialog states) in local component state, not in Zustand. Use granular Zustand selectors for `activeGamePlanId` and `gamePlans` to minimize re-renders. The existing FlowchartView pattern (reading `activePlan?.nodePositions` with a specific selector) already prevents unnecessary re-renders.

**Warning signs:** Switching plans always shows the Dagre auto-layout even when custom positions were saved for that plan.

### Pitfall 5: Auto-create "My Game Plan" Conflicting with Explicit Create UI

**What goes wrong:** The existing `GamePlanPage` auto-creates a plan on mount if none exists. When a user explicitly creates a second plan via the UI, they might expect to be switched to it, but the auto-create already set `activeGamePlanId` to the first plan.

**Why it happens:** The store's `createGamePlan` only sets `activeGamePlanId` if it was previously `null`: `activeGamePlanId: state.activeGamePlanId ?? id`.

**How to avoid:** Explicit user-triggered plan creation should always call `setActiveGamePlan(newId)` after `createGamePlan`. The `PlanCreateDialog` should do this explicitly, not rely on the store's auto-activate logic. This is shown in Pattern 1's code example above.

**Warning signs:** User creates a new plan, clicks away, but the old plan is still active.

### Pitfall 6: Deleting the Last Plan Leaves the App in a Broken State

**What goes wrong:** If the user deletes their only game plan, `activeGamePlanId` becomes `null` and `gamePlans` is empty. The page shows neither content nor a meaningful prompt to create a new plan.

**Why it happens:** The existing `deleteGamePlan` already handles this: sets `activeGamePlanId` to `remaining[0]?.id ?? null`. But the UI doesn't account for `null` active plan gracefully.

**How to avoid:** After the last plan is deleted, either: (a) auto-create a new empty plan immediately, or (b) show an empty state with a prominent "Create Game Plan" call to action. The EmptyState component already exists — ensure it renders when `activePlan === null` OR `techniqueIds.length === 0`.

**Warning signs:** White screen or JavaScript error after deleting the only plan.

---

## Code Examples

Verified patterns from existing codebase and Radix/shadcn official patterns:

### Store Extension — duplicateGamePlan and Tag Actions

```typescript
// src/stores/game-plan-store.ts additions to GamePlanState interface
duplicateGamePlan: (id: string) => string | null;
addTag: (planId: string, tag: string) => void;
removeTag: (planId: string, tag: string) => void;

// Implementation
duplicateGamePlan: (id) => {
  const source = get().gamePlans.find((p) => p.id === id);
  if (!source) return null;
  const newId = generateId();
  set((state) => ({
    gamePlans: [
      ...state.gamePlans,
      {
        ...source,
        id: newId,
        name: `${source.name} (copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        nodePositions: undefined,
        tags: source.tags ?? [],
      },
    ],
    activeGamePlanId: newId,
  }));
  return newId;
},

addTag: (planId, tag) => {
  set((state) => ({
    gamePlans: state.gamePlans.map((p) =>
      p.id === planId && !(p.tags ?? []).includes(tag)
        ? { ...p, tags: [...(p.tags ?? []), tag], updatedAt: Date.now() }
        : p
    ),
  }));
},

removeTag: (planId, tag) => {
  set((state) => ({
    gamePlans: state.gamePlans.map((p) =>
      p.id === planId
        ? { ...p, tags: (p.tags ?? []).filter((t) => t !== tag), updatedAt: Date.now() }
        : p
    ),
  }));
},
```

### GamePlan Type Extension

```typescript
// src/types/game-plan.ts
export const PLAN_TAGS = ["gi", "no-gi", "competition"] as const;
export type PlanTag = typeof PLAN_TAGS[number];

export interface GamePlan {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  techniqueIds: string[];
  nodePositions?: Record<string, { x: number; y: number }>;
  tags?: PlanTag[]; // optional — existing persisted plans won't have this field
}
```

### Zustand Selector Pattern (from existing FlowchartView)

```typescript
// Read specific fields — prevents reference equality re-renders
const gamePlans = useGamePlanStore((s) => s.gamePlans);
const activeGamePlanId = useGamePlanStore((s) => s.activeGamePlanId);
const activePlan = gamePlans.find((p) => p.id === activeGamePlanId);

// Actions — stable references, safe to destructure
const { createGamePlan, setActiveGamePlan } = useGamePlanStore();
```

### Inline Rename Pattern (edit-in-place)

An alternative to a rename dialog is editing the plan name inline in the plan selector or page header. This is lower friction but harder to implement correctly (click-to-edit, blur-to-save, escape-to-cancel). For Phase 2, a rename dialog is simpler and the existing Dialog component is ready to use. Inline editing can be deferred.

```typescript
// Inline rename — simpler implementation for now if desired
const [editing, setEditing] = useState(false);
const [draftName, setDraftName] = useState(activePlan?.name ?? "");

// onBlur or onKeyDown="Enter" -> renameGamePlan(planId, draftName) -> setEditing(false)
// onKeyDown="Escape" -> setDraftName(activePlan.name) -> setEditing(false)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Individual `@radix-ui/*` packages | Unified `radix-ui` package (v1.4.x) | 2024 | All Radix primitives in one package; shadcn components use `radix-ui` subpath imports |
| Zustand v4 (`useStore(store, selector)`) | Zustand v5 (`useGamePlanStore((s) => s.field)`) | 2024 | Different import and API style; project already uses v5 correctly |
| `shadcn/ui` with `@radix-ui/*` | `shadcn@latest` with unified `radix-ui` | 2024-2025 | New shadcn CLI targets unified package; adding components via `npx shadcn@latest add` generates correct imports |

**Deprecated/outdated:**
- `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu` etc. as individual packages: Project uses `radix-ui` unified package instead. Do not add individual `@radix-ui/*` packages.
- Zustand v4 `devtools` and `subscribeWithSelector` middleware signatures: v5 has changed some internals; the project uses only `persist` which is stable.

---

## Open Questions

1. **Where exactly does per-plan action UI live in the plan switcher?**
   - What we know: DropdownMenu has `DropdownMenuItem` for list items, and `DropdownMenuSub` for nested menus. Per-plan actions (rename, duplicate, delete) need to be accessible without a nested menu (which can be hard to discover).
   - What's unclear: Whether to put icon buttons (pencil, copy, trash) inline beside the plan name in the dropdown, or use a `DropdownMenuSub`, or open separate dialogs from the plan management section.
   - Recommendation: Inline icon buttons beside each plan row in the dropdown. Three small icons (Pencil, Copy, Trash2) in a flex row, right-aligned. Each opens a dialog (rename dialog, duplicate immediately, delete confirmation). This is discoverable and doesn't require nested menus.

2. **Should tag editing be inline or in a management dialog?**
   - What we know: Only 3 tags (gi, no-gi, competition). Toggle-style buttons fit in a small space.
   - What's unclear: Whether tags should show in the plan switcher dropdown (visible at a glance) or only in a dedicated edit UI.
   - Recommendation: Show tags as small `Badge` components in the plan selector dropdown (read-only, visible). Editing tags happens in a "manage plan" dialog or inline in the plan header on the game-plan page.

3. **Plan management on mobile: dropdown vs. sheet?**
   - What we know: The project detects small screens and defaults to list tab over flowchart tab. The `Sheet` component is already in the UI library.
   - What's unclear: Whether a DropdownMenu with icon buttons is usable on mobile or if a Sheet would be better for the plan list on small screens.
   - Recommendation: DropdownMenu works on mobile (Radix handles touch events). For Phase 2, use DropdownMenu uniformly. If usability issues arise on mobile, a responsive breakpoint to Sheet can be added later.

4. **Auto-create on delete of last plan: auto-create or empty state?**
   - What we know: Current code auto-creates "My Game Plan" on GamePlanPage mount if no plan exists. The `deleteGamePlan` action sets `activeGamePlanId` to the next plan if available, or `null`.
   - Recommendation: Don't change the auto-create behavior. After deleting the last plan, the page mount effect fires again and recreates "My Game Plan." This is acceptable UX for Phase 2. If user wants to explicitly manage this, they can rename it.

---

## Sources

### Primary (HIGH confidence)

- `src/stores/game-plan-store.ts` — read directly; existing `createGamePlan`, `deleteGamePlan`, `renameGamePlan`, `setActiveGamePlan`, `addTechnique`, `removeTechnique` implementations verified
- `src/types/game-plan.ts` — read directly; `GamePlan` interface confirmed
- `src/components/ui/dialog.tsx` — read directly; Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription all available
- `src/components/ui/sheet.tsx` — read directly; Sheet with side variants available
- `src/components/ui/badge.tsx`, `button.tsx`, `card.tsx` — confirmed in directory listing
- `package.json` — verified `zustand: ^5.0.11`, `radix-ui: ^1.4.3`, `lucide-react: ^0.564.0`
- `components.json` — verified shadcn "new-york" style, `rsc: false`, cssVariables, lucide icon library
- `src/components/game-plan/technique-node.tsx` — read directly; confirmed `nodrag` class needed for interactive children
- `src/pages/game-plan.tsx` — read directly; confirmed auto-create pattern and page structure

### Secondary (MEDIUM confidence)

- Radix UI unified package documentation — `radix-ui` v1.4.x re-exports all primitives including `DropdownMenu`, `AlertDialog`; shadcn generates imports as `radix-ui/react-dropdown-menu` etc.
- Zustand v5 persist middleware — `tags?: PlanTag[]` with `??` default is the correct migration-less approach for adding optional fields to persisted data
- React Flow `nodrag` class — documented in React Flow custom nodes guide for suppressing drag on interactive child elements; confirmed as the standard pattern

### Tertiary (LOW confidence — flag for validation)

- Shadcn `npx shadcn@latest add dropdown-menu alert-dialog input` compatibility with the `radix-ui` unified package v1.4.3 — likely works (shadcn generates `radix-ui/react-*` subpath imports) but should be verified by running the command before planning tasks assume it works.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified in `package.json` and source files; no new dependencies needed except shadcn component additions
- Architecture: HIGH — store extension patterns derived from existing store code; dialog patterns from existing `dialog.tsx`; flowchart remove-technique pattern from React Flow documented `nodrag` class
- Pitfalls: HIGH — most pitfalls derived from reading the actual existing code and identifying the specific interaction points that need care
- Tag system: HIGH — simple string array on existing type; Zustand persist handles it transparently

**Research date:** 2026-02-17
**Valid until:** 2026-03-17 (shadcn/Radix are stable; Zustand v5 API stable; React Flow v12 API stable)
