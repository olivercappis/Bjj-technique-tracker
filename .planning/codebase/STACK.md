# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- TypeScript 5.9.3 - Core language for all source code in `src/`
- TSX/JSX - Used in React components throughout `src/components/` and `src/pages/`

**Secondary:**
- JavaScript - Configuration files (vite.config.ts, tsconfig.json)
- CSS - Styling via Tailwind CSS in `src/styles/globals.css`

## Runtime

**Environment:**
- Node.js (version unspecified - inferred from dev dependencies)

**Package Manager:**
- npm - Used with package-lock.json (v10+ format based on package-lock.json structure)
- Lockfile: Present (`package-lock.json`)

## Frameworks

**Core:**
- React 19.2.4 - UI framework, used in all components (`src/components/`)
- React DOM 19.2.4 - React rendering in `src/main.tsx`
- React Router DOM 7.13.0 - Client-side routing in `src/router.tsx`

**State Management:**
- Zustand 5.0.11 - Lightweight state management for game plans in `src/stores/game-plan-store.ts`

**UI/Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/vite 4.1.18 - Vite integration for Tailwind
- Radix UI 1.4.3 - Unstyled accessible component library (components wrapper)
- class-variance-authority 0.7.1 - CSS class composition utility in `src/components/ui/`
- clsx 2.1.1 - Conditional className utility
- tailwind-merge 3.4.0 - Tailwind class merging utility

**Component/Animation:**
- motion 12.34.0 - Animation library for smooth transitions (used in `src/components/page-transition.tsx`)
- lucide-react 0.564.0 - Icon library, configured in `components.json` as icon provider

**Graph Visualization:**
- @xyflow/react 12.10.0 - React Flow for interactive diagrams in `src/components/game-plan/flowchart-view.tsx`
- @dagrejs/dagre 2.0.4 - Hierarchical graph layout engine for positioning nodes

**Command Palette:**
- cmdk 1.1.1 - Command/search component in `src/components/search-dialog.tsx`

**Testing:**
- None detected - No test framework currently integrated

**Build/Dev:**
- Vite 7.3.1 - Fast build tool and dev server (config in `vite.config.ts`)
- @vitejs/plugin-react 5.1.4 - React Fast Refresh plugin for Vite
- TypeScript 5.9.3 - TypeScript compiler for type checking (`build` script uses `tsc -b`)

## Key Dependencies

**Critical:**
- React 19 - Core UI framework, essential for all interactive components
- React Router DOM 7 - Enables client-side routing for multi-page navigation in `src/router.tsx`
- Zustand 5 - Persistent state management for game plans (persists to localStorage via middleware)
- Tailwind CSS 4 - Complete styling solution via utility classes
- @xyflow/react 12 - Enables interactive flowchart visualization of game plans

**Infrastructure:**
- TypeScript 5.9.3 - Type safety and development experience
- Vite 7 - Fast development and production builds

## Configuration

**Environment:**
- No environment variables detected - Application is fully static with no external services
- All data is static (imported from `src/data/`) or in-memory (Zustand store)

**Build:**
- `vite.config.ts` - Configures Vite with React and Tailwind CSS plugins
- `tsconfig.json` - TypeScript compiler options with strict mode enabled
- `components.json` - shadcn/ui configuration (style: new-york, base color: neutral)
- `package.json` - Build scripts: `dev` (Vite dev server), `build` (TypeScript + Vite build), `preview` (preview built assets)

## Platform Requirements

**Development:**
- Node.js runtime with npm
- Modern IDE with TypeScript support
- No database or external service dependencies

**Production:**
- Static site hosting (SPA - Single Page Application)
- Any HTTP server can serve the built output from `dist/`
- No backend required - all logic is client-side
- Browser support: Modern browsers with ES2020+ and DOM API support

---

*Stack analysis: 2026-02-16*
