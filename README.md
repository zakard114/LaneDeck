# LaneDeck

Lightweight Kanban board for organizing tasks across **Todo → Doing → Done**.

Spec-first build: frontend (mocked API) → OpenAPI → FastAPI → SQLite.

## Spec

See [`_docs/specs.md`](_docs/specs.md).

## Layout

```text
LaneDeck/
  _docs/specs.md
  AGENTS.md
  README.md
  frontend/     # Vite + React + TypeScript
  backend/      # FastAPI + uv (next)
  openapi.yaml  # after FE service exists
```

## Commands

```powershell
. E:\IT_SPACES\AI\scripts\use_e_drive.ps1

# Frontend
cd frontend
npm install
npm run dev

# Backend (after scaffold)
cd backend
uv sync
uv run uvicorn ...   # exact command TBD
uv run pytest -q
```

Frontend runs at `http://127.0.0.1:5173`. Board data is mocked in `localStorage` via `src/api/cardsApi.ts` until the FastAPI backend is wired.

## Homework answers (draft)

| Q | Answer |
|---|--------|
| 1 Project | Mini Kanban board |
| 2 App name | LaneDeck |
| 3 Spec commit SHA | `cf878545446c6ab67ee7a4ccbfe61edcccaa6579` |
| 4 FE start command | `npm run dev` (from `frontend/`) |
| 5 BE start command | TBD |
| 6 FE → BE URL | TBD (`http://127.0.0.1:8000`) |
| 7 Test command | TBD |

## Course

- Homework: https://github.com/DataTalksClub/ai-dev-tools-zoomcamp/blob/main/cohorts/2026/homework/02-development/homework.md
- Submit: https://courses.datatalks.club/ai-dev-tools-2026/homework/hw2
