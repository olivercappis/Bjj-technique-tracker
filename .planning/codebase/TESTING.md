# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Status:** No testing framework configured

**Current State:**
- No test runner installed (Vitest, Jest, or similar not in `package.json`)
- No test files in project root or `src/` directory
- Only test files found are in `node_modules/` (from Radix UI dependencies)
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)

**Build Configuration:**
- TypeScript compiler runs before Vite build: `"build": "tsc -b && vite build"`
- This enforces type checking but no runtime tests

## Recommended Testing Setup

Given the tech stack (React 19, TypeScript 5.9, Vite 7), the following would be appropriate:

**For Unit/Integration Testing:**
- **Framework:** Vitest (pairs well with Vite)
- **Assertion Library:** Vitest built-in assertions or external like `chai` or `assert-ts`
- **React Testing:** `@testing-library/react` for component testing

**For E2E Testing:**
- **Framework:** Not configured; Playwright or Cypress would be options

## Suggested Test File Location Pattern

Based on project structure, tests should follow:

```
src/
├── components/
│   ├── cards/
│   │   ├── technique-card.tsx
│   │   └── technique-card.test.tsx
│   ├── difficulty-indicator.tsx
│   └── difficulty-indicator.test.tsx
├── hooks/
│   ├── use-breadcrumbs.ts
│   └── use-breadcrumbs.test.ts
├── lib/
│   ├── game-plan-graph.ts
│   └── game-plan-graph.test.ts
├── stores/
│   ├── game-plan-store.ts
│   └── game-plan-store.test.ts
└── data/
    ├── index.ts
    └── index.test.ts
```

**Naming Convention:**
- Co-located tests: `*.test.ts` or `*.test.tsx` in same directory as source file
- Test files immediately adjacent to source files for clear association

## Test Structure Patterns to Follow

### Hook Testing Pattern

For custom hooks like `useBreadcrumbs`:

```typescript
// src/hooks/use-breadcrumbs.test.ts
// Should test:
// - Hook returns empty crumbs array on home page
// - Hook adds category crumb for /:categorySlug route
// - Hook adds position crumb for /:categorySlug/:positionSlug route
// - Hook adds technique crumb for full path
// - Hook handles game-plan route specially
// - Hook handles missing data gracefully
```

**Hook-specific concerns:**
- Must be tested with React Router context (useParams, useLocation)
- Setup needed: Mock `react-router-dom` with test routes
- Dependency on data functions (`getCategoryBySlug`, etc.)

### Store Testing Pattern

For Zustand store like `game-plan-store`:

```typescript
// src/stores/game-plan-store.test.ts
// Should test:
// - Initial state
// - createGamePlan() adds plan and sets as active
// - deleteGamePlan() removes plan
// - renameGamePlan() updates name
// - setActiveGamePlan() changes active plan
// - addTechnique() adds to active plan only
// - removeTechnique() removes from active plan
// - isTechniqueInActivePlan() returns correct boolean
// - updateNodePositions() persists positions
// - Persistence middleware (localStorage interactions)
```

**Store-specific concerns:**
- Zustand stores need to be tested in isolation
- State immutability should be verified
- Persistence should be mocked/tested separately

### Component Testing Pattern

For React components like `DifficultyIndicator`:

```typescript
// src/components/difficulty-indicator.test.tsx
// Should test:
// - Renders correct number of filled dots for each difficulty level
// - Shows/hides label based on showLabel prop
// - Applies correct color classes based on difficulty
// - Accepts custom className
```

**Component-specific concerns:**
- Props validation (required vs optional)
- Conditional rendering (showLabel prop)
- Class merging with `cn()` utility
- No external data fetching

### Pure Function Testing Pattern

For utility functions like `buildGamePlanGraph`:

```typescript
// src/lib/game-plan-graph.test.ts
// Should test:
// - Returns empty nodes/edges for empty input
// - Creates nodes for all referenced positions
// - Links source and target positions via edges
// - Separates submission techniques from transitions
// - Handles missing position data gracefully
```

**Utility-specific concerns:**
- No side effects
- No external dependencies
- Pure input->output transformation

### Data Access Function Testing Pattern

For data functions in `src/data/index.ts`:

```typescript
// src/data/index.test.ts
// Should test:
// - getCategoryBySlug() returns correct category or undefined
// - getPositionsByCategory() filters correctly
// - getTechniquesByPosition() returns correct array
// - searchAll() finds categories, positions, and techniques
// - Search is case-insensitive
```

**Data-specific concerns:**
- No mutation of data arrays
- Correct filtering/searching logic
- Handles missing IDs gracefully

## Mocking Strategy

**What to Mock:**
- External dependencies (`react-router-dom` for hooks using router)
- Data source imports in unit tests (mock `@/data` module)
- Zustand store in component tests (create test instance)
- DOM APIs if testing non-interactive logic

**What NOT to Mock:**
- Internal utility functions (`cn()`, type conversions)
- Data structures and types
- Component composition (unless testing in isolation)
- Zustand store itself when testing the store (test real implementation)

**Mock Examples to Follow:**

```typescript
// Mocking react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  useLocation: vi.fn(),
  // ... other exports
}));

// Mocking data module
vi.mock('@/data', () => ({
  categories: testCategories,
  getCategoryBySlug: vi.fn(),
  // ... other exports
}));
```

## Fixtures and Factories

**Test Data Location:** (To be created)
- `src/__tests__/fixtures/` - Static test data
- `src/__tests__/factories/` - Factory functions for building test objects

**Example Factory Pattern:**

```typescript
// src/__tests__/factories/technique.ts
export function createTechnique(overrides?: Partial<Technique>): Technique {
  return {
    id: "test-tech-1",
    positionId: "test-pos-1",
    name: "Test Technique",
    slug: "test-technique",
    type: "submission",
    difficulty: "beginner",
    description: "Test description",
    steps: ["Step 1"],
    tips: [],
    tags: [],
    ...overrides,
  };
}
```

## Coverage Expectations

**Current State:** No coverage requirements enforced

**Recommended Coverage Targets:**
- Utility functions (`src/lib/`): 100%
- Data functions (`src/data/`): 100%
- Stores (`src/stores/`): 90%+ (state mutations)
- Hooks (`src/hooks/`): 85%+ (side effects hard to test)
- Components (`src/components/`): 70%+ (UI testing is expensive)

**Coverage Approach:**
- Focus on critical paths and error cases
- Prioritize utility and data layer tests (100% coverage)
- Component tests focus on prop validation and conditional rendering
- E2E tests cover user workflows

## Test Organization by Concern

### Unit Tests

**Scope:** Single function or component in isolation

**Examples:**
- `cn()` utility with various class combinations
- `generateId()` produces valid IDs
- `DifficultyIndicator` renders with correct visual states
- Type badge color mapping

**Approach:**
- Mock external dependencies
- Test single responsibility
- Keep tests simple and focused

### Integration Tests

**Scope:** Multiple components or functions working together

**Examples:**
- `useBreadcrumbs()` with React Router integration
- `buildGamePlanGraph()` with actual data arrays
- Component rendering with real child components
- Store state changes across multiple actions

**Approach:**
- Minimal mocking (only external systems)
- Test real data flow
- Verify component interactions

### E2E Tests (Not Implemented)

**Scope:** Full user workflows from UI to data

**Examples:**
- Navigating from home -> category -> position -> technique
- Adding techniques to game plan
- Searching and selecting techniques
- Game plan creation and management

**Framework:** Playwright or Cypress (not configured)

## Running Tests (When Framework Added)

```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

**Configuration for Vitest would include:**
- Environment: `jsdom` (for React component testing)
- Setup files for test utilities
- Module resolution matching Vite config (alias `@/`)
- Coverage thresholds configuration

## Current Testing Gaps

**Critical to Test:**
1. **Game Plan State Management** (`src/stores/game-plan-store.ts`)
   - Complex state mutations
   - Persistence behavior
   - Edge cases (deleting active plan)

2. **Data Access Layer** (`src/data/index.ts`)
   - Search functionality across multiple entity types
   - Filter functions correctness
   - Slug generation and lookup

3. **Game Plan Graph Building** (`src/lib/game-plan-graph.ts`)
   - Node/edge construction from technique IDs
   - Handling missing or incomplete data
   - Submission vs transition separation logic

4. **Navigation and Routing** (`src/hooks/use-breadcrumbs.ts`, router configuration)
   - Breadcrumb generation for all route patterns
   - Invalid route handling
   - Special handling for game-plan route

**Nice to Test:**
- Component rendering (difficulty indicator colors, badges)
- Search dialog functionality and result filtering
- Motion animation setup (less critical for functionality)

## Type Safety in Tests

**Leverage TypeScript:**
- Tests should be `.test.ts` or `.test.tsx` (not `.test.js`)
- Use `import type` for test fixture types
- Define test data with explicit types for IDE support
- No `any` types in test code

---

*Testing analysis: 2026-02-16*
