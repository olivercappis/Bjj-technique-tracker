# Coding Conventions

**Analysis Date:** 2026-02-16

## Naming Patterns

**Files:**
- Components: PascalCase with `.tsx` extension (e.g., `DifficultyIndicator.tsx`, `TechniqueCard.tsx`)
- Pages: PascalCase with `.tsx` extension (e.g., `HomePage.tsx`, `TechniquePage.tsx`)
- Hooks: camelCase with `use-` prefix and `.ts` extension (e.g., `use-breadcrumbs.ts`)
- Utilities: camelCase with `.ts` extension (e.g., `utils.ts`, `game-plan-graph.ts`)
- Stores: camelCase with `-store.ts` suffix (e.g., `game-plan-store.ts`)
- Types: camelCase with `.ts` extension (e.g., `game-plan.ts`, `index.ts`)

**Functions:**
- Component functions: PascalCase (e.g., `DifficultyIndicator`, `TechniqueCard`)
- Custom hooks: camelCase with `use` prefix (e.g., `useBreadcrumbs`)
- Utility functions: camelCase (e.g., `generateId`, `buildGamePlanGraph`, `searchAll`)
- Export functions from data: camelCase (e.g., `getCategoryBySlug`, `getPositionsByCategory`)
- Internal helper functions: camelCase (e.g., `getCategorySlugForPosition`, `getPositionSlugForTechnique`)

**Variables:**
- Constants: camelCase (e.g., `containerVariants`, `itemVariants`, `difficultyConfig`, `typeStyles`)
- State variables: camelCase (e.g., `searchOpen`, `gamePlans`, `activeGamePlanId`)
- Type instances: camelCase (e.g., `category`, `position`, `technique`, `crumbs`)
- Parameters: camelCase (e.g., `difficulty`, `showLabel`, `className`)

**Types:**
- Interfaces: PascalCase, end with suffix for clarity (e.g., `TechniqueCardProps`, `DifficultyIndicatorProps`, `HeaderProps`, `SearchDialogProps`, `Breadcrumb`, `GamePlan`, `GamePlanNode`, `GamePlanEdge`)
- Type aliases: PascalCase (e.g., `TechniqueType`, `DifficultyLevel`, `Perspective`)
- Generic types: PascalCase (e.g., `ClassValue`, `VariantProps`)

## Code Style

**Formatting:**
- No explicit formatter configured (Prettier not in devDependencies)
- File imports use ES modules with absolute paths via `@/` alias
- Indentation: 2 spaces (observed in all files)
- Line length: No explicit limit observed, pragmatic wrapping used
- Trailing commas: Used in multi-line structures

**Linting:**
- No ESLint configuration present in project root
- TypeScript strict mode enabled: `strict: true` in `tsconfig.json`
- Additional TypeScript flags enabled:
  - `noUnusedLocals: true` - Enforces removal of unused local variables
  - `noUnusedParameters: true` - Enforces removal of unused function parameters
  - `noFallthroughCasesInSwitch: true` - Prevents switch fall-through
  - `noUncheckedIndexedAccess: true` - Requires bounds checking on indexed access
  - `allowImportingTsExtensions: true` - Allows `.ts`/`.tsx` imports

**Syntax preferences:**
- Arrow functions for simple callbacks (e.g., `.map((t) => ...`, `.filter((p) => ...)`)
- Destructuring for component props (e.g., `{ technique, categorySlug, positionSlug }`)
- Optional chaining widely used (e.g., `category?.name`, `position?.slug`)
- Nullish coalescing for defaults (e.g., `category?.name ?? categorySlug`)

## Import Organization

**Order:**
1. React and React hooks (e.g., `import { useState } from "react"`)
2. External libraries in alphabetical order (e.g., `clsx`, `class-variance-authority`, `motion`, `react-router-dom`)
3. Icon libraries (e.g., `lucide-react`)
4. Internal absolute imports with `@/` alias
5. Type imports grouped at top of component files (e.g., `import type { TechniqueType } from "@/types"`)

**Path Aliases:**
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Always use absolute imports via `@/` in all files, never relative imports
- Examples:
  - `@/components/ui/card`
  - `@/types`
  - `@/data`
  - `@/lib/utils`
  - `@/stores/game-plan-store`

## Error Handling

**Navigation Errors:**
- Invalid routes redirect to home with `<Navigate to="/" replace />` (e.g., in `TechniquePage.tsx` when category/position/technique not found)
- Pattern: Check for required data, return Navigate component if missing

**Data Retrieval Errors:**
- Defensive programming with optional chaining and nullish coalescing
- No explicit error boundaries or try-catch blocks in components
- Gracefully handle missing data with null checks before rendering

**Missing Data:**
- Use optional chaining: `category?.name ?? categorySlug`
- Return empty arrays instead of null: functions like `getTechniquesByPosition` return empty arrays for missing positions
- Use explicit undefined checks: `if (!category || !position || !technique)`

## Logging

**Framework:** Built-in `console` methods (no structured logging library)

**Patterns:**
- No logging present in source code examined
- When needed, would use standard `console.log`, `console.error`, etc.
- Debug information currently not logged

## Comments

**When to Comment:**
- Minimal commenting observed - code is self-documenting through clear naming
- Variable declarations like `difficultyConfig` and `typeStyles` are self-explanatory with Record types
- Complex logic (like game plan graph building) uses descriptive variable names instead of comments

**JSDoc/TSDoc:**
- Not used in codebase
- All types are explicit TypeScript interfaces and type aliases
- Props are documented through interface definitions (e.g., `TechniqueCardProps`, `HeaderProps`)

## Function Design

**Size:** Functions are generally small and focused:
- `generateId()`: 1 line
- `useBreadcrumbs()`: ~38 lines with clear logical sections
- `buildGamePlanGraph()`: ~60 lines with commented logical sections

**Parameters:**
- Use object destructuring for multiple parameters (e.g., props in components)
- Prefer interface-based prop definitions over spread props
- Optional parameters documented in interface (e.g., `showLabel?: boolean`)

**Return Values:**
- Functions return explicitly typed values matching their declared return type
- Components return JSX.Element or similar
- Hooks return arrays or objects matching Zustand/React patterns
- Data access functions return the exact type or undefined (e.g., `Category | undefined`)

**Async Handling:**
- Hooks use `useEffect` for side effects with proper dependency arrays
- Callbacks wrapped in `useCallback` when passed as props (e.g., `handleSelect` in SearchDialog)
- No async/await observed; event-driven approach preferred

## Module Design

**Exports:**
- Named exports for all components, functions, and types (no default exports)
- Single export per file is common pattern (e.g., one component per file)
- Multiple exports in utility files (e.g., `data/index.ts` exports functions)
- Type-only imports used: `import type { ... }` for TypeScript types

**Barrel Files:**
- Used strategically in `src/data/index.ts` to export query functions
- Not used for component directories (each component file is separate)
- `src/types/index.ts` exports all type definitions and interfaces

**File Organization by Concern:**
- `src/components/` - React components organized by feature (ui, cards, game-plan, layout)
- `src/pages/` - Page-level components for routing
- `src/hooks/` - Custom React hooks
- `src/stores/` - Zustand state stores
- `src/data/` - Data access and query functions
- `src/lib/` - Pure utility functions and logic
- `src/types/` - TypeScript type definitions

## React-Specific Patterns

**Functional Components:**
- All components are functional components using hooks
- Props always destructured in function signature
- Prop interfaces always defined (no implicit types)

**State Management:**
- Local state with `useState` for UI state (e.g., `searchOpen`, `query`)
- Zustand store for game plan state (`useGamePlanStore`)
- No Redux or Context API observed

**Animation:**
- Motion library (`motion/react`) for animations
- Variants pattern used (e.g., `containerVariants`, `itemVariants` in HomePage)
- Motion directives: `variants`, `initial`, `animate`, `whileHover`, `transition`

**Styling:**
- Tailwind CSS for all styling
- className strings build with `cn()` utility combining `clsx` and `tailwind-merge`
- Color theme uses CSS custom properties defined in `globals.css`
- Responsive classes: `sm:`, `md:`, `lg:` prefixes used throughout

**Component Composition:**
- Radix UI components used as foundation (Button, Card, Badge, Dialog)
- Composition over inheritance
- Custom components wrap Radix components with additional styling/functionality

## Data Type Patterns

**Enums as Union Types:**
- Use union types instead of enums: `type TechniqueType = "submission" | "sweep" | ...`
- Maps for type-to-config mappings: `Record<TechniqueType, { ... }>`
- Bidirectional mapping pattern: `typeStyles` and `typeLabels` separate Maps

**IDs:**
- String-based IDs throughout
- Generated with `Date.now().toString(36) + Math.random().toString(36).slice(2, 8)`
- Used consistently for all entities (categories, positions, techniques, game plans)

---

*Convention analysis: 2026-02-16*
