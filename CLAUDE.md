# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # TypeScript compilation + Vite production build
npm run preview  # Preview production build
```

No test or lint scripts are configured yet.

## Architecture

**Lexaclaw** is a SPA frontend (Solid.js + TypeScript + Tailwind CSS, built with Vite) that interfaces with a separate backend API running on `http://localhost:8080`.

### Frontend (`/src`)

- `index.tsx` — mounts the app to `#root`
- `App.tsx` — root component (currently minimal boilerplate)
- Tailwind CSS imported via `index.css`

### Backend API

The backend exposes a streaming endpoint:

```
POST http://localhost:8080/extract/stream
Content-Type: application/json
Accept: text/event-stream

{ "url": "<youtube-url>", "num_ctx": 4096|8192, "styles": ["summary"|"takeaways"] }
```

Returns Server-Sent Events. See `curl.md` for example requests.

### Key tech choices

- **Solid.js** (not React) — JSX looks similar but reactivity model is different (fine-grained signals, no virtual DOM)
- **Vite 8 + vite-plugin-solid** — handles JSX transform for Solid
- **Tailwind CSS v4** — imported as a Vite plugin, not via PostCSS config
- **TypeScript strict mode** — enforced via `tsconfig.json`
