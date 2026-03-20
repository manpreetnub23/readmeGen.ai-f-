# README Generator Frontend

Frontend UI for generating polished `README.md` files from public GitHub repositories using a backend that fetches repo intelligence and calls an LLM.

## What This App Does

- Accepts a public GitHub repository URL.
- Sends it to backend `POST /api/generate`.
- Shows a loading state while backend analyzes the repo.
- Displays generated README in:
- `Preview` mode (rendered markdown with GFM support).
- `Raw` mode (plain markdown text).
- Supports copying to clipboard and downloading as `README.md`.

## End-to-End Flow

1. User enters GitHub repo URL in frontend input.
2. Frontend calls backend API with `{ repoUrl }`.
3. Backend validates URL using Zod schema.
4. Backend checks Redis cache using key `readme:${repoUrl}`.
5. On cache miss, backend fetches repository data from GitHub API:
- repo metadata
- README
- license
- contributors
- topics
- file structure
- package dependencies/scripts
- selected code snippets
6. Backend builds a structured prompt and sends it to Hugging Face router model:
- `meta-llama/Llama-3.1-8B-Instruct:novita`
7. Backend returns generated README and caches it in Redis for 1 hour.
8. Frontend renders and exposes copy/download actions.

## Features Implemented

### Frontend

- Clean single-page UI (`Home` page) with custom styling and responsive layout.
- Enter-key submit support.
- Animated loader while generation is in progress.
- Markdown preview using `react-markdown` + `remark-gfm`.
- Toggle between `preview` and `raw` modes.
- `Copy` button with success feedback.
- `Download` button to save generated markdown as `README.md`.

### Backend Features Used by This Frontend

- GitHub API integration with token auth.
- LLM generation through Hugging Face router (Llama 3.1 model).
- Redis caching:
- Key format: `readme:${repoUrl}`
- TTL: `3600` seconds (1 hour)
- Rate limiting on generate endpoint:
- `20` requests per `15` minutes
- Applied on `POST /api/generate`
- Default limiter keying is IP-based.

## API Contract (Used by Frontend)

### Generate README

- Endpoint: `POST /api/generate`
- Request body:

```json
{
  "repoUrl": "https://github.com/owner/repo"
}
```

- Success response:

```json
{
  "readme": "# Project Title\n..."
}
```

- Common error cases:
- Invalid URL / non-GitHub URL -> `400`
- Rate limit exceeded -> limiter message
- Upstream/API/LLM failures -> `500`

## Project Structure (Frontend)

```text
frontend/
  src/
    api/generate.js
    components/
      InputBox.jsx
      Loader.jsx
      ReadmePreview.jsx
    pages/Home.jsx
    App.jsx
    main.jsx
    index.css
  public/
  package.json
  vite.config.js
```

## Tech Stack

- React 19
- Vite 8
- Axios
- React Markdown
- remark-gfm
- Tailwind (plugin configured; UI mostly custom CSS-in-JS styles)

## Prerequisites

- Node.js 18+ (recommended)
- npm
- Running backend service
- Redis (used by backend)
- GitHub token + Hugging Face API key configured in backend `.env`

## Installation and Run

## 1. Start Backend (from `backend/`)

Install dependencies:

```bash
npm install
```

Create/update `backend/.env` with required values:

```env
PORT=8000
GITHUB_TOKEN=your_github_token
HF_API_KEY=your_huggingface_key
REDIS_URL=your_redis_url
REDIS_TLS=auto
```

Run backend:

```bash
npm run dev
```

## 2. Start Frontend (from `frontend/`)

Install dependencies:

```bash
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Run frontend:

```bash
npm run dev
```

Frontend will run on Vite dev server (typically `http://localhost:5173`).

## Build and Preview (Frontend)

```bash
npm run build
npm run preview
```

## Notes

- Frontend supports public repositories only.
- Cache behavior depends on exact URL string used in request.
- Error UI is currently a simple alert for failures.

## Security Reminder

- Never commit real secrets in `.env` files.
- If keys were exposed, rotate GitHub, Hugging Face, and Redis credentials immediately.
