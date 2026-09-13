# LaneDeck

Mini Kanban board for **AI Dev Tools Zoomcamp 2026 — Homework 2**.

Track a few cards across **Todo → Doing → Done**. Spec-first, then frontend (mocked API), OpenAPI, FastAPI, and SQLite.

## Spec

See [`_docs/specs.md`](_docs/specs.md).

## Project idea

Mini Kanban board (course option).

## App name

**LaneDeck**

## Layout (planned)

```text
AIDT_HW_02/
  _docs/specs.md
  AGENTS.md
  README.md
  frontend/     # Vite + React (next)
  backend/      # FastAPI + uv (next)
  openapi.yaml  # after FE service exists
```

## Commands

*(Filled in as each layer is added.)*

```powershell
. E:\IT_SPACES\AI\scripts\use_e_drive.ps1

# Frontend (after scaffold)
cd frontend
npm install
npm run dev

# Backend (after scaffold)
cd backend
uv sync
uv run uvicorn ...   # exact command TBD
uv run pytest -q
```

## Homework answers (draft)

| Q | Answer |
|---|--------|
| 1 Project | Mini Kanban board |
| 2 App name | LaneDeck |
| 3 Spec commit SHA | *(see git log after foundation push)* |
| 4 FE start command | TBD |
| 5 BE start command | TBD |
| 6 FE → BE URL | TBD (`http://127.0.0.1:8000`) |
| 7 Test command | TBD |

## Course

- Homework: https://github.com/DataTalksClub/ai-dev-tools-zoomcamp/blob/main/cohorts/2026/homework/02-development/homework.md
- Submit: https://courses.datatalks.club/ai-dev-tools-2026/homework/hw2
