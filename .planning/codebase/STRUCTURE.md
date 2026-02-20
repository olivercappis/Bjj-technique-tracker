# Codebase Structure

**Analysis Date:** 2026-02-16

## Directory Layout

```
src/
├── components/              # UI components, organized by feature
│   ├── ui/                 # Primitive components (Button, Card, Dialog, etc.)
│   ├── cards/              # Data-presenting cards (CategoryCard, PositionCard, TechniqueCard)
│   ├── game-plan/          # Game plan specific components (flowchart, list views, graph rendering)
│   ├── layout/             # Layout containers (RootLayout, Header, Footer, Breadcrumbs)
│   ├── search-dialog.tsx   # Global search component
│   ├── page-transition.tsx # Animated page wrapper
│   ├── difficulty-indicator.tsx # Reusable difficulty display
│   └── type-badge.tsx      # Technique type badge component
│
├── pages/                   # Route-level page components
│   ├── home.tsx            # Category grid, entry point
│   ├── category.tsx        # Position grid for selected category
│   ├── position.tsx        # Technique grid for selected position
│   ├── technique.tsx       # Technique detail page with steps/tips
│   ├── game-plan.tsx       # Game plan orchestrator (flowchart/list tabs)
│   └── not-found.tsx       # 404 fallback
│
├── data/                    # Static BJJ technique database and queries
│   ├── categories.ts       # PositionCategory[] constant
│   ├── positions.ts        # Position[] constant
│   ├── techniques.ts       # Technique[] constant (60+ techniques)
│   └── index.ts            # Query functions (getCategoryBySlug, searchAll, etc.)
│
├── stores/                  # Zustand state management
│   └── game-plan-store.ts  # GamePlanStore with CRUD and persistence
│
├── hooks/                   # Custom React hooks
│   └── use-breadcrumbs.ts  # Route-aware breadcrumb generation
│
├── lib/                     # Utilities and business logic
│   ├── game-plan-graph.ts  # buildGamePlanGraph() for visualization
│   └── utils.ts            # cn() classname utility
│
├── types/                   # TypeScript definitions
│   ├── index.ts            # Core domain types (Technique, Position, Category)
│   └── game-plan.ts        # GamePlan, GamePlanNode, GamePlanEdge types
│
├── styles/                  # Global styles
│   └── globals.css         # Tailwind imports, CSS variables
│
├── main.tsx                # React app entry point (mounts to #root)
├── router.tsx              # React Router config with all routes
└── vite-env.d.ts          # Vite type definitions
```

## Directory Purposes

**src/components/ui/:**
- Purpose: Reusable UI primitives from shadcn/radix-ui ecosystem
- Contains: Badge, Button, Card, Command, Dialog, Separator, Sheet, Tabs, Breadcrumb components
- Key files: All exported as `.tsx` files
- Import pattern: Used by feature components for consistent styling

**src/components/cards/:**
- Purpose: Data-presentation cards for hierarchy navigation
- Contains: CategoryCard, PositionCard, TechniqueCard
- Key files: Each card accepts data object and renders as Link to next level
- Pattern: Pure presentation + navigation, uses icons from lucide-react

**src/components/game-plan/:**
- Purpose: Feature-specific components for game plan visualization and management
- Contains:
  - FlowchartView: React Flow graph visualization with Dagre auto-layout
  - ListView: Tabular view of techniques and positions
  - PositionNode: Custom React Flow node type for positions
  - TechniqueEdge: Custom React Flow edge type for technique transitions
  - AddToPlanButton: Button to add technique to active plan
  - EmptyState: Placeholder when no techniques selected
- Key files: `flowchart-view.tsx`, `list-view.tsx`

**src/pages/:**
- Purpose: Route-level components that orchestrate full features
- Contains: One component per route, queries data, composes feature components
- Key files: All route endpoints
- Pattern: Use params from router, validate with data queries, render or redirect

**src/data/:**
- Purpose: Static BJJ database and query API
- Contains: Raw data (60+ techniques, 10+ positions, 6 categories) + query functions
- Key files:
  - `techniques.ts`: Complete technique library with steps, tips, tags
  - `positions.ts`: Position descriptions with key points
  - `categories.ts`: Category metadata with icons, perspective (top/bottom/both)
  - `index.ts`: Export all query functions and data
- Query functions: getCategoryBySlug, getPositionsByCategory, getTechniqueBySlug, searchAll, etc.

**src/stores/:**
- Purpose: Client-side state management for game plans
- Contains: Zustand store with persist middleware
- Key files: `game-plan-store.ts` (single source of truth for game plans)
- State shape: `{ gamePlans: GamePlan[], activeGamePlanId: string | null }`

**src/hooks/:**
- Purpose: Custom React hooks for shared logic
- Contains: `use-breadcrumbs` (generates breadcrumbs from route params)
- Key files: One hook per file
- Pattern: Pure hooks that subscribe to router context

**src/lib/:**
- Purpose: Domain logic and utilities not tied to React
- Contains: Graph building, classname utilities
- Key files:
  - `game-plan-graph.ts`: buildGamePlanGraph() converts technique IDs → nodes/edges
  - `utils.ts`: cn() merges classnames safely

**src/types/:**
- Purpose: TypeScript interface definitions
- Contains: Domain types (Technique, Position, Category, GamePlan) + variant types
- Key files: `index.ts` (core), `game-plan.ts` (visualization types)
- Exports: All used throughout app via `import type { ... } from "@/types"`

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React DOM mount, RouterProvider wrapping
- `src/router.tsx`: React Router v7 config, all route definitions
- `src/components/layout/root-layout.tsx`: Persistent layout wrapper (header, footer, breadcrumbs)

**Configuration:**
- `tsconfig.json`: TypeScript strict mode, path alias `@/*` → `./src/*`
- `vite.config.ts`: Vite + React + Tailwind CSS v4 + resolve alias
- `tailwind.config.ts`: Not present (using Tailwind CSS v4 with @tailwindcss/vite)
- `components.json`: shadcn-ui config for component generation

**Core Logic:**
- `src/data/index.ts`: Query API for all data lookups
- `src/stores/game-plan-store.ts`: Zustand store with persist middleware
- `src/lib/game-plan-graph.ts`: Graph construction from technique selections

**Testing:**
- No test files present (not yet implemented)

## Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `CategoryCard.tsx`, `RootLayout.tsx`)
- Utilities/Hooks: `camelCase.ts` (e.g., `use-breadcrumbs.ts`, `utils.ts`)
- Pages: `PascalCase.tsx` (e.g., `HomePage.tsx`)
- Types: Uppercase with `.ts` extension when standalone module (e.g., `game-plan.ts`)

**Directories:**
- Feature/component groups: lowercase plural or hyphenated (e.g., `components/cards/`, `components/game-plan/`)
- Functionality groups: lowercase plural (e.g., `pages/`, `hooks/`, `stores/`)

**Functions:**
- React components: PascalCase (e.g., `HomePage`, `CategoryCard`)
- Hooks: camelCase with `use` prefix (e.g., `useBreadcrumbs`)
- Data queries: camelCase with action prefix (e.g., `getCategoryBySlug`, `searchAll`)
- Store actions: camelCase (e.g., `addTechnique`, `createGamePlan`)
- Utilities: camelCase (e.g., `cn()`)

**Variables:**
- Component props: camelCase (e.g., `categorySlug`, `techniqueId`)
- State: camelCase (e.g., `activePlan`, `gamePlans`)
- Constants: UPPER_SNAKE_CASE for animations (e.g., `NODE_WIDTH`, `containerVariants`)

**Types:**
- Interfaces: PascalCase with descriptive name (e.g., `PositionCategory`, `GamePlanNode`)
- Type aliases: PascalCase (e.g., `TechniqueType`, `DifficultyLevel`)
- Generic types: Single letter or descriptive (e.g., `T` in generic functions)

## Where to Add New Code

**New Feature (e.g., Session Tracking):**
- Primary code: Create new page in `src/pages/session.tsx`
- Components: Feature-specific components in `src/components/session/` folder
- Store: Add new Zustand store in `src/stores/session-store.ts` if needed
- Tests: Co-locate as `src/pages/session.test.tsx`

**New Component/Module:**
- Implementation: `src/components/[feature-name]/ComponentName.tsx`
- Export: If used across pages, add to parent barrel file (e.g., `src/components/ui/index.ts`)
- Types: Define props interface above component, or in `src/types/` if domain-specific

**Utilities:**
- Shared helpers: `src/lib/[function-name].ts` (pure JS/TS functions)
- React hooks: `src/hooks/use-[name].ts`
- Style utilities: Keep in `src/lib/utils.ts` if small, or create `src/lib/style-utils.ts`

**Data/Queries:**
- New data source: Add to `src/data/[resource].ts` with export in `src/data/index.ts`
- Query functions: Add to `src/data/index.ts` or create module for complex logic

**State Management:**
- New global state: Create `src/stores/[feature]-store.ts` with Zustand
- Pattern: Use persist middleware for localStorage (see `game-plan-store.ts`)

## Special Directories

**src/styles/:**
- Purpose: Global styles and design tokens
- Generated: No
- Committed: Yes
- Contents: `globals.css` with Tailwind directives and CSS custom properties

**dist/:**
- Purpose: Built production bundle (Vite output)
- Generated: Yes (via `npm run build`)
- Committed: No (ignored in .gitignore)

**node_modules/:**
- Purpose: Installed dependencies
- Generated: Yes (via `npm install`)
- Committed: No (ignored in .gitignore)

**.planning/codebase/:**
- Purpose: Architecture analysis and planning documents
- Generated: Yes (via GSD)
- Committed: Yes

## Import Patterns

**Path Aliases:**
- Use `@/` instead of relative paths: `import { Button } from "@/components/ui/button"`
- Benefits: Readable, safe from refactoring, works at any nesting level

**Component Imports:**
- Local: `import { HomePage } from "@/pages/home"`
- UI: `import { Card, CardContent } from "@/components/ui/card"`
- Feature: `import { FlowchartView } from "@/components/game-plan/flowchart-view"`

**Data Imports:**
- Query API: `import { getCategoryBySlug } from "@/data"`
- Raw data: `import { techniques } from "@/data"` or via barrel export

**Type Imports:**
- Core: `import type { Technique, Position } from "@/types"`
- Feature: `import type { GamePlan } from "@/types/game-plan"`
- Always use `type` keyword to prevent runtime imports

---

*Structure analysis: 2026-02-16*
