# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page client-side app: **React 19 + TypeScript + Vite**. There is no backend, database, or auth; todo/list state lives in memory (see `src/hooks/useTodos.ts`) and resets on reload.

Standard commands are defined in `package.json` scripts:
- Dev server: `npm run dev` (Vite on `http://localhost:5173`)
- Lint: `npm run lint` (Oxlint)
- Build: `npm run build` (`tsc -b` type-check then `vite build`)
- Preview production build: `npm run preview`

Notes:
- The update script runs `npm install` on startup, so dependencies are already installed for future agents.
- Node 22 is used here; TypeScript is v6 and Vite is v8 (newer than typical templates), so match the versions in `package-lock.json` rather than assuming older APIs.
