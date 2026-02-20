# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Component-driven frontend with layered data access

**Key Characteristics:**
- React SPA with React Router for navigation
- Client-side state management with Zustand (persisted to localStorage)
- Static data model (categories → positions → techniques) with hierarchical routing
- Graph-based visualization for game plan composition using React Flow and Dagre
- Presentation-focused architecture with minimal server-side dependencies

## Layers

**Page Layer:**
- Purpose: Top-level route handlers that compose features
- Location: `src/pages/`
- Contains: Page components (HomePage, CategoryPage, PositionPage, TechniquePage, GamePlanPage, NotFoundPage)
- Depends on: Router params, data queries, store, components
- Used by: React Router

**Component Layer:**
- Purpose: Reusable UI elements, feature components, and layout containers
- Location: `src/components/`
- Contains:
  - Layout components (`layout/`): RootLayout, Header, Footer, Breadcrumbs
  - Business components (`game-plan/`, `cards/`): Technique/position cards, game plan views
  - UI primitives (`ui/`): Button, Card, Badge, Dialog, Tabs, etc. (from Radix UI/shadcn)
  - Utilities: SearchDialog, TypeBadge, DifficultyIndicator, PageTransition
- Depends on: Data queries, store, types, utilities
- Used by: Pages, other components, layout

**Data Access Layer:**
- Purpose: Query and search static BJJ technique data
- Location: `src/data/`
- Contains:
  - Raw data: `categories.ts`, `positions.ts`, `techniques.ts` (imported in `index.ts`)
  - Query functions: `getAllCategories()`, `getCategoryBySlug()`, `getPositionsByCategory()`, `getTechniqueBySlug()`, `searchAll()`, etc.
- Depends on: Types
- Used by: Pages, components, graph builder

**State Management Layer:**
- Purpose: Client-side persistence of user game plans
- Location: `src/stores/`
- Contains: `useGamePlanStore` (Zustand + persist middleware)
  - Game plan CRUD: create, delete, rename, set active
  - Technique management: add/remove techniques to active plan
  - Node positioning: store flowchart layout coordinates
  - Persists to localStorage as `bjj-game-plans`
- Depends on: Types
- Used by: Pages, game plan components

**Utility/Library Layer:**
- Purpose: Graph construction, formatting utilities, hooks
- Location: `src/lib/`, `src/hooks/`
- Contains:
  - `game-plan-graph.ts`: Converts technique IDs → graph nodes/edges, applies game plan composition logic
  - `utils.ts`: `cn()` classname utility
  - `use-breadcrumbs.ts`: Route-aware breadcrumb generation hook

**Type Layer:**
- Purpose: TypeScript definitions for domain entities
- Location: `src/types/`
- Contains:
  - Core types: `Technique`, `Position`, `PositionCategory`, `TechniqueType`, `DifficultyLevel`
  - Game plan types: `GamePlan`, `GamePlanNode`, `GamePlanEdge`

## Data Flow

**Browse Flow (Category → Position → Technique):**

1. User navigates via router → Page loads (CategoryPage, PositionPage, TechniquePage)
2. Page extracts route params (categorySlug, positionSlug, techniqueSlug)
3. Page queries data layer: `getCategoryBySlug()` → `getPositionBySlug()` → `getTechniqueBySlug()`
4. Page renders content with components (CategoryCard, PositionCard, TechniqueCard)
5. Components use breadcrumbs hook to render navigation trail

**Game Plan Flow (Add Technique → Visualize):**

1. User clicks "Add to Plan" button on technique page
2. Component calls `useGamePlanStore().addTechnique(techniqueId)`
3. Store updates active plan's `techniqueIds` array, persists to localStorage
4. GamePlanPage re-renders, calls `buildGamePlanGraph(techniqueIds)` via useMemo
5. Graph builder constructs nodes (positions) and edges (transitions) from techniques
6. FlowchartView renders graph using React Flow + Dagre auto-layout
7. User can drag nodes → `onNodeDragStop` calls `updateNodePositions()` → persisted to store

**Search Flow:**

1. User presses Cmd/Ctrl+K → RootLayout opens SearchDialog
2. SearchDialog accepts query, calls `searchAll(query)` from data layer
3. Returns matching categories, positions, techniques
4. Dialog renders results as navigable links

**State Management:**

- **User-created state:** Game plans live in Zustand store, persisted via localStorage middleware
- **Derived state:** Game plan graph nodes/edges computed fresh on each techniqueIds change (useMemo)
- **Immutable data:** Categories, positions, techniques imported as constants, never modified
- **Route state:** Current page context maintained by React Router

## Key Abstractions

**GamePlanGraph Builder:**
- Purpose: Transform flat list of technique IDs into graph structure for visualization
- Examples: `src/lib/game-plan-graph.ts` → `buildGamePlanGraph()`
- Pattern: Converts technique selections into position nodes (deduped) and technique→position edges

**Data Query Functions:**
- Purpose: Provide consistent interface for hierarchical lookups (category → position → technique)
- Examples: `src/data/index.ts` - `getCategoryBySlug()`, `getPositionsByCategory()`, `getTechniqueBySlug()`
- Pattern: Pure functions that filter static arrays by ID/slug

**Store Actions:**
- Purpose: Encapsulate game plan mutations with immutable updates
- Examples: `addTechnique()`, `removeTechnique()`, `renameGamePlan()`, `createGamePlan()`
- Pattern: Zustand actions that spread/map state arrays, auto-timestamp updates

**Component Composition:**
- Purpose: Build pages from reusable card, button, dialog, and layout pieces
- Examples: HomePage composes CategoryCards, CategoryPage composes PositionCards
- Pattern: Container component queries data → maps over items → renders card/item component for each

## Entry Points

**Application Root:**
- Location: `src/main.tsx`
- Triggers: `npm run dev` (Vite dev server)
- Responsibilities: Mounts React app into DOM, wraps with RouterProvider, includes global styles

**Router:**
- Location: `src/router.tsx`
- Triggers: On navigation (URL change)
- Responsibilities: Maps URL paths to page components, handles nested routes via RootLayout, redirects 404

**RootLayout:**
- Location: `src/components/layout/root-layout.tsx`
- Triggers: Mounted for all routes
- Responsibilities: Renders header, footer, breadcrumbs, keyboard shortcut listener (Cmd+K), page transitions with animations

## Error Handling

**Strategy:** Navigate to 404 page

**Patterns:**
- Route not found: React Router `<Route path="*">` catches and renders NotFoundPage
- Category/position/technique not found: Page component checks result of data query, calls `<Navigate to="/" replace />` if undefined
- Malformed technique ID in game plan: `buildGamePlanGraph()` filters undefined results with `filter((t): t is Technique => t !== undefined)`

## Cross-Cutting Concerns

**Logging:** Not implemented (uses console in development)

**Validation:**
- Route params validated via data layer lookups (return undefined if not found)
- Type safety enforced by TypeScript strict mode

**Authentication:** Not implemented (no auth system)

**Styling:**
- Tailwind CSS via @tailwindcss/vite plugin
- Color system using CSS custom properties (oklch), dark mode via CSS classes
- Component-scoped styles via className composing utility `cn()`

**Animations:**
- Page transitions via Motion library (framer-motion alternative)
- Staggered card entrances using containerVariants/itemVariants pattern
- Hover effects on cards using Motion's whileHover

**State Persistence:**
- Game plans only: Zustand persist middleware writes to localStorage under key `bjj-game-plans`
- Browse state not persisted (follows standard SPA behavior)

---

*Architecture analysis: 2026-02-16*
