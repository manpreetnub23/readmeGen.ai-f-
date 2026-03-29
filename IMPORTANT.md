# README Generator Interview Notes

## What This Project Does

This is an AI README Generator for public GitHub repositories.
The user submits a repo URL, the backend analyzes the repository, sends structured context to an LLM, and returns a generated `README.md`.

## How It Works

1. User enters a GitHub repo URL in the React frontend.
2. Frontend sends it to `POST /api/generate`.
3. Backend validates the input and applies rate limiting.
4. Backend checks Redis cache.
5. If not cached, backend fetches repo details from GitHub.
6. It extracts useful signals like dependencies, scripts, file structure, and key code snippets.
7. It builds a structured prompt and sends it to the LLM.
8. Generated README is returned, cached, and shown in preview/raw form.

## Main Tech Choices

### Why React + Vite?

Because the frontend is a small SPA. I did not need SSR or heavy framework features, and Vite gave a faster setup and dev experience.

### Why Express?

Because the backend is API-focused and middleware-driven. Express keeps the server simple and easy to organize.

### Why Redis?

Because README generation is expensive. Redis avoids repeated GitHub + LLM calls for the same repo, improves response time, and reduces cost.

### Why Zod?

To validate input before doing expensive work. It helps reject bad or malformed GitHub URLs early.

### Why rate limiting?

Because this endpoint triggers external API calls and LLM generation. Rate limiting protects the system from abuse and accidental spam.

### Why Hugging Face / hosted LLM?

Because I wanted model access without managing GPU infrastructure or self-hosting.

## Important Interview Questions

### Why use Redis and not a database?

I only needed temporary caching, not permanent storage. There are no user accounts, saved history, or relational queries, so Redis was the simpler fit.

### Why not Next.js?

This project did not need SEO, SSR, or full-stack frontend framework features. React + Vite was enough.

### Why not TypeScript?

This version was optimized for faster development. TypeScript would be a good upgrade for maintainability and safer refactoring.

### Why not send the whole repo to the LLM?

Because that would be expensive, noisy, and harder to control. Selective extraction gives better signal and reduces hallucination.

### How do you reduce hallucination?

I do not rely on the model blindly. I first extract repo-based evidence like dependencies, scripts, structure, and code snippets, then build a grounded prompt from that data.

### Why separate controller and service logic?

To keep the controller focused on request/response handling while business logic stays reusable and easier to maintain.

### Why no authentication?

Because this version only supports public repositories. Auth becomes useful when adding private repos, saved history, or user-specific features.

### Why no queue?

For this version, synchronous generation keeps the architecture simple. If traffic grows, queue-based processing would be the next step.

## Short Answers You Can Say Fast

### Explain the project in one answer

"This is a full-stack AI README Generator for public GitHub repositories. The frontend is built with React and Vite, and the backend is built with Express. A user submits a repo URL, the backend analyzes repository metadata and selected code context, then sends structured input to an LLM to generate a README. I used Redis to cache generated results so repeated requests are faster and cheaper."

### Why is Redis important here?

"Redis improves speed and reduces cost because the same repository does not need to be analyzed and generated again and again."

### What is the most important backend idea?

"The key idea is that I do not send a blind prompt to the model. I first extract structured repo signals so the output is more accurate and grounded."

## Honest Limitations

- Public repositories only
- No authentication
- No persistent history
- No queue or streaming
- Heuristic repo analysis can miss edge cases
- Production version should add tests, retries, and better monitoring
