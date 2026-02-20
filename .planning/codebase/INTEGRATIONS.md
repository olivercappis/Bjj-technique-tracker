# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Not applicable** - No external API integrations detected.

The application is a fully client-side SPA with no backend API calls. All data is static and bundled with the application.

## Data Storage

**Databases:**
- None - Application uses no database

**Local Storage:**
- Browser localStorage - Used by Zustand middleware in `src/stores/game-plan-store.ts`
  - Key: `bjj-game-plans` (set in persist configuration, line 140)
  - Contents: Game plan state including technique selections and node positions
  - Persistence: Automatic via Zustand `persist` middleware
  - Scope: Single user's browser only

**File Storage:**
- Local filesystem only - No cloud file storage
- Static assets (fonts, icons) served from public directory

**Caching:**
- Browser caching - Standard HTTP caching headers handled by hosting platform
- No in-memory cache beyond React component state

## Authentication & Identity

**Auth Provider:**
- None - Application requires no authentication
- No user accounts or login system
- Single-user, browser-based application

## Monitoring & Observability

**Error Tracking:**
- None detected - No error tracking service integration

**Logs:**
- Console logs only - No structured logging or log aggregation
- Application is fully client-side with no server logs

## CI/CD & Deployment

**Hosting:**
- Not specified - Any static site host can serve the built SPA
- Common options: Vercel, Netlify, GitHub Pages, AWS S3, CloudFront, etc.

**CI Pipeline:**
- Not detected - No CI configuration files found (no `.github/workflows`, `.gitlab-ci.yml`, `circleci`, etc.)

## Environment Configuration

**Required env vars:**
- None - Application contains no environment variable references
- No external service credentials needed

**Secrets location:**
- Not applicable - No secrets in use

## Webhooks & Callbacks

**Incoming:**
- None - Application is purely client-side

**Outgoing:**
- None - Application makes no external HTTP requests

## Font & CDN Resources

**External Resources:**
- Google Fonts - Two fonts loaded in `index.html` (lines 7-12):
  - Font files loaded via `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (preconnect)
  - Fonts: Inter (400, 500, 600, 700) and Space Grotesk (500, 700)
  - Used in global CSS in `src/styles/globals.css`

---

*Integration audit: 2026-02-16*
