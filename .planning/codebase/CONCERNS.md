# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

### Store State Synchronization Issues

**Issue:** `useGamePlanStore` is used with Zustand's persist middleware, but state updates via `getActiveGamePlan()` and other getters are called both as dependencies in `useEffect` and directly in render. This creates potential for stale closures and double-initialization.

**Files:**
- `src/stores/game-plan-store.ts` (lines 28-143)
- `src/pages/game-plan.tsx` (lines 11-18)
- `src/components/game-plan/add-to-plan-button.tsx` (lines 20-23)

**Impact:**
- Auto-creation of default game plan happens twice: once in `GamePlanPage` and once in `AddToPlanButton`, creating race conditions
- Adding game plan store methods as useEffect dependencies ([lines 18](file:///c:/Users/cappi/.claude-worktrees/Bjj-technique-tracker/funny-bardeen/src/pages/game-plan.tsx)) causes infinite loops since store functions are recreated on every store state change
- If localStorage fails to hydrate, store and UI can become inconsistent

**Fix approach:**
- Use Zustand's shallow equality and selector patterns instead of passing raw store methods as dependencies
- Consolidate game plan auto-creation to store initialization only, remove from components
- Add error handling for localStorage hydration failure
- Use `useShallow` or create memoized selectors to prevent unnecessary re-renders

### Weak ID Generation

**Issue:** `generateId()` function in `src/stores/game-plan-store.ts` (line 5-6) uses `Date.now().toString(36)` combined with only 6 characters of Math.random(). This has collision risk and isn't cryptographically safe.

**Files:**
- `src/stores/game-plan-store.ts` (lines 5-6)

**Impact:**
- With multiple rapid game plan creations, ID collisions become possible
- UUIDs could accidentally match across browser sessions
- No protection if multiple tabs create game plans simultaneously

**Fix approach:**
- Replace with crypto.randomUUID() or a library like nanoid
- Add uniqueness validation at store level
- Document why IDs are created (for local storage keys, not network IDs)

## Known Issues

### Missing Data Validation

**Issue:** Data lookup functions in `src/data/index.ts` return `undefined` but components don't always validate presence before use.

**Files:**
- `src/data/index.ts` (lines 10-46)
- `src/pages/technique.tsx` (lines 18-26)
- `src/pages/position.tsx` (lines 38-42)
- `src/hooks/use-breadcrumbs.ts` (lines 22-30)

**Symptoms:** If a technique's `resultingPositionId` references a non-existent position, the graph builder silently skips it without logging. Users won't know edges are missing.

**Trigger:** Edit data file to add technique with `resultingPositionId` pointing to non-existent position ID

**Workaround:** Validate all position references are valid before deployment

### Graph Layout Race Condition

**Issue:** In `src/components/game-plan/flowchart-view.tsx` (lines 109-114), the `layoutedNodes` are set twice: once in `useNodesState` initialization and again in `useEffect`. If `initialNodes` or `initialEdges` change between renders, layout flickers.

**Files:**
- `src/components/game-plan/flowchart-view.tsx` (lines 109-114)

**Symptoms:** Flowchart nodes jump positions when switching between views or adding techniques

**Trigger:** Add technique to game plan while viewing flowchart, switch to list and back

**Workaround:** None currently; affects UX only, not functionality

## Security Considerations

### Insufficient localStorage Scope

**Issue:** Game plans are stored in localStorage under key `bjj-game-plans` (line 140 in `game-plan-store.ts`) with no versioning beyond version 1. If schema changes, old data will silently fail to migrate.

**Files:**
- `src/stores/game-plan-store.ts` (lines 140-142)

**Risk:** Future schema changes (adding new fields) will cause data loss for existing users. Old game plans from v1 won't load in v2+.

**Current mitigation:** Schema is currently minimal, so compatibility is maintained

**Recommendations:**
- Implement data migration strategy using Zustand middleware
- Add migration functions for each schema version
- Document versioning strategy in store comments
- Add tests for migration edge cases

### No Input Sanitization

**Issue:** Game plan names are user-input but stored directly in state without validation.

**Files:**
- `src/stores/game-plan-store.ts` (line 40-47)

**Risk:** Low in current app (localStorage only), but creates bad pattern if later exposed via API or shared URLs

**Recommendations:**
- Add name length limits (30-50 chars)
- Trim whitespace
- Document maximum length in types

## Performance Bottlenecks

### Unnecessary Graph Rebuilds

**Issue:** `buildGamePlanGraph()` is memoized by `techniqueIds` array, but if `techniques` data changes (which it won't in this app), the entire graph is rebuilt without optimization.

**Files:**
- `src/lib/game-plan-graph.ts` (lines 19-81)
- `src/pages/game-plan.tsx` (lines 23-26)

**Problem:** With 100+ techniques, graph building (O(n) for each of 3 nested loops) becomes slow. No incremental updates.

**Current capacity:**
- Works fine with current technique count (~40 techniques)
- Will start noticing slowdown around 200+ techniques in a single game plan

**Improvement path:**
- Profile with React DevTools Profiler
- Consider incremental graph building (add one node at a time)
- Use useMemo more granularly (per-node, per-edge)
- Consider memoizing the position lookups

### Heavy DOM Rendering in FlowchartView

**Issue:** ReactFlow component re-renders entire graph on every node position change (line 134 in `flowchart-view.tsx`). No debouncing of `onNodeDragStop`.

**Files:**
- `src/components/game-plan/flowchart-view.tsx` (lines 116-125)

**Problem:** Dragging nodes triggers store update, which re-renders the entire graph component

**Current capacity:** Smooth with 20-30 nodes; becomes janky with 50+ nodes

**Improvement path:**
- Add debounce/throttle to `onNodeDragStop` (500ms)
- Consider using `useCallback` with stable reference (already done, but verify)
- Use React.memo for node components (not done)
- Profile with React DevTools

## Fragile Areas

### Data Integrity Coupling

**Files:**
- `src/data/techniques.ts` (massive file, 27K tokens)
- `src/data/positions.ts`
- `src/data/categories.ts`

**Why fragile:**
- All technique-position-category relationships hardcoded in data arrays
- No validation that `positionId` exists in positions
- No validation that `categoryId` exists in categories
- No validation that `resultingPositionId` exists in positions
- Graph builder silently skips invalid references

**Safe modification:**
- Run lookup tests before deploying: For each technique, verify positionId and resultingPositionId exist
- Add data validation function to run on app startup
- Consider moving to JSON file + schema validation (zod/yup)
- Document data structure constraints clearly

**Test coverage:** No tests for data integrity; potential for silent data corruption

### Store Initialization Race

**Files:**
- `src/stores/game-plan-store.ts` (initialization)
- `src/components/game-plan/add-to-plan-button.tsx` (auto-create logic)
- `src/pages/game-plan.tsx` (auto-create logic)

**Why fragile:**
- Multiple components auto-create default game plan independently
- Zustand persist middleware hydrates asynchronously
- Before hydration completes, store is empty and creates duplicate plans
- No way to know if hydration succeeded

**Safe modification:**
- Create single source of truth for initialization: move to store initialization
- Add hydration state to store (e.g., `isHydrated: boolean`)
- Check hydration before creating anything
- Wait for hydration in routes if needed

## Scaling Limits

### Data File Size

**Current state:**
- techniques.ts: 27K tokens (massive)
- Single file contains 40+ techniques with full step/tips/descriptions

**Limit:** Above 30-40KB, IDE/TypeScript performance degrades noticeably

**Scaling path:**
- Split techniques into multiple files by position/category
- Consider lazy-loading technique descriptions
- Move full descriptions to separate data file, keep index minimal
- Consider JSON data files with build-time type generation

### Graph Visualization Capacity

**Current capacity:**
- Smooth at 30 nodes (positions)
- Acceptable at 50 nodes
- Slow at 100+ nodes
- UI becomes unusable at 200+ nodes

**Scaling path:**
- Add clustering/grouping by category in flowchart view
- Implement virtual scrolling for list view
- Add filtering to reduce visible graph size
- Consider canvas-based rendering instead of DOM for very large graphs

### localStorage Size

**Current state:**
- Empty store: ~200 bytes
- With 10 game plans of 5 techniques each: ~2KB
- With 50 game plans: ~10KB

**Limit:** 5-10MB typical localStorage quota; at current growth rate, should never hit limit

## Dependencies at Risk

### @xyflow/react Risk Level: Medium

**Risk:** Library is actively maintained but relies on dagre for layout, which is less actively maintained.

**Impact:** If dagre stops working or has bugs, graph layout breaks

**Migration plan:**
- Investigate alternatives: Cytoscape.js, Sigma.js, or custom layout
- dagre is small, could fork if needed
- No immediate action required

### zustand Version: Low Risk

**Risk:** Zustand API is stable; persist middleware is solid

**Current version:** ^5.0.11

**Migration plan:** None needed; library is reliable

### TypeScript Strictness: Medium Risk

**Risk:** `noUncheckedIndexedAccess` enabled (tsconfig.json line 18) but not fully respected in some files

**Files affected:**
- `src/components/game-plan/position-node.tsx` (line 26, 58) accesses array without bounds check

**Recommendation:**
- Either disable the rule or add array bounds checks
- Consistency is key

## Test Coverage Gaps

### No Unit Tests for Data Lookups

**What's not tested:**
- `getCategoryBySlug()`, `getPositionBySlug()`, `getTechniqueBySlug()` with invalid inputs
- What happens when slug doesn't exist
- What happens when position has no techniques

**Files:** `src/data/index.ts`

**Risk:** Silent failures if data is corrupted; users see blank pages instead of clear errors

**Priority:** High - Easy to test, prevents silent failures

### No Tests for Store State Persistence

**What's not tested:**
- Game plans persist to localStorage
- Game plans restore from localStorage
- Multiple tabs synchronization
- localStorage quota exceeded

**Files:** `src/stores/game-plan-store.ts`

**Risk:** Data loss without warning; no visibility into hydration failures

**Priority:** High - Critical functionality

### No Tests for Graph Building

**What's not tested:**
- `buildGamePlanGraph()` with empty technique list
- With techniques referencing invalid positions
- With circular references (if added later)
- Performance with 100+ techniques

**Files:** `src/lib/game-plan-graph.ts`

**Risk:** Silent graph corruption; fragile edges

**Priority:** Medium - Important for game plan feature

### No Integration Tests

**What's not tested:**
- Adding technique to game plan and seeing it in flowchart
- Dragging nodes and positions persisting
- Navigation between pages

**Risk:** Regressions on feature changes; no confidence in deployments

**Priority:** Medium - Standard practice

---

*Concerns audit: 2026-02-16*
