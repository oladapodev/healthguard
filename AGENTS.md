# ✅ Locked Source of Truth: HealthGuard AI Tech Stack & Project Structure

**Last Updated:** 2026-05-05
**Owner:** HealthGuard AI
**Purpose:** Canonical implementation source and decision log
**Status:** Active and binding for all future changes

## 0) Product Source of Truth

Product intent, user-facing scope, safety posture, clinical-bridge behavior, and research grounding live in [PRD.md](/home/dev/Desktop/healthguard/PRD.md).

This file remains the implementation source of truth for stack, architecture, file structure, command contracts, checklists, and change-log protocol. Any implementation work must preserve the product direction in `PRD.md`.

## 1) Mission

HealthGuard AI is a patient-first, multi-agent AI system that turns lab data and contextual signals into:

- Safe patient-friendly explanations
- Clinician-ready interpretations and notes
- Structured evidence-backed recommendations

Core value is approachable UX with strict clinical caution handling.

## 2) Locked Stack (Do Not Drift Without Updating This File)

### Backend
- FastAPI
- LangChain + LangGraph
- SQLModel + PostgreSQL
- JWT auth via FastAPI Users or custom flow
- pytest
- uv
- Ollama / Groq / Fireworks (LLM providers)
- Unstructured / Docling
- ReportLab or WeasyPrint
- Chroma

### Frontend
- React 18+ with TypeScript
- Vite
- Untitled UI
- TanStack Query
- React Router v7
- Bun

### DevOps
- Docker + docker-compose
- Makefile + `dev.py`
- PostgreSQL
- ngrok or Cloudflare Tunnel

## 3) Colors (Canonical Palette)

Primary / supporting colors:

- Main Blue: `#0F766E`
- Accent Green: `#10B981`
- Soft Background: `#F8FAFC`
- Neutral Gray: `#64748B`
- Warning Yellow: `#F59E0B`
- Danger Red: `#EF4444`

Implementation files:

- [web/src/styles/theme.css](/home/dev/Desktop/healthguard/web/src/styles/theme.css)
- [web/src/lib/theme.ts](/home/dev/Desktop/healthguard/web/src/lib/theme.ts)

## 4) Source-of-Thought Folder Structure (Canonical)

```bash
aibm/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.py
│   │   │   ├── labs.py
│   │   │   ├── profile.py
│   │   │   ├── analysis.py
│   │   │   └── note.py
│   ├── core/
│   ├── agents/
│   │   ├── nodes/
│   │   ├── graphs/
│   │   ├── prompts.py
│   │   └── tools.py
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── rag/
│   └── tests/
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   └── assets/
│   └── public/
├── dev.py
├── Makefile
├── docker-compose.yml
├── pyproject.toml
├── AGENT.md
├── AGENTS.md
├── CHANGELOG.md
└── README.md
```

## 5) Agent Workflow (LangGraph)

Canonical graph flow:

- Intake
- Context
- Insights
- Safety
- Note

Core files:

- [app/agents/nodes](/home/dev/Desktop/healthguard/app/agents/nodes)
- [app/agents/graphs](/home/dev/Desktop/healthguard/app/agents/graphs)
- [app/agents/prompts.py](/home/dev/Desktop/healthguard/app/agents/prompts.py)
- [app/agents/tools.py](/home/dev/Desktop/healthguard/app/agents/tools.py)

## 6) Backend Implementation Checklist (File-by-File)

### Core and app bootstrap
- [x] [app/main.py](/home/dev/Desktop/healthguard/app/main.py)
- [x] [app/core/config.py](/home/dev/Desktop/healthguard/app/core/config.py)
- [x] [app/core/deps.py](/home/dev/Desktop/healthguard/app/core/deps.py)
- [x] [app/core/security.py](/home/dev/Desktop/healthguard/app/core/security.py)

### API layer
- [x] [app/api/v1/auth.py](/home/dev/Desktop/healthguard/app/api/v1/auth.py)
- [x] [app/api/v1/labs.py](/home/dev/Desktop/healthguard/app/api/v1/labs.py)
- [x] [app/api/v1/profile.py](/home/dev/Desktop/healthguard/app/api/v1/profile.py)
- [x] [app/api/v1/analysis.py](/home/dev/Desktop/healthguard/app/api/v1/analysis.py)
- [x] [app/api/v1/note.py](/home/dev/Desktop/healthguard/app/api/v1/note.py)
- [x] [app/api/v1/hello.py](/home/dev/Desktop/healthguard/app/api/v1/hello.py)

### Data and validation
- [x] [app/models/user.py](/home/dev/Desktop/healthguard/app/models/user.py)
- [x] [app/models/profile.py](/home/dev/Desktop/healthguard/app/models/profile.py)
- [x] [app/models/lab_result.py](/home/dev/Desktop/healthguard/app/models/lab_result.py)
- [x] [app/models/analysis.py](/home/dev/Desktop/healthguard/app/models/analysis.py)
- [x] [app/schemas/auth.py](/home/dev/Desktop/healthguard/app/schemas/auth.py)
- [x] [app/schemas/profile.py](/home/dev/Desktop/healthguard/app/schemas/profile.py)
- [x] [app/schemas/lab.py](/home/dev/Desktop/healthguard/app/schemas/lab.py)
- [x] [app/schemas/analysis.py](/home/dev/Desktop/healthguard/app/schemas/analysis.py)
- [x] [app/schemas/note.py](/home/dev/Desktop/healthguard/app/schemas/note.py)
- [x] [app/schemas/hello.py](/home/dev/Desktop/healthguard/app/schemas/hello.py)

### Agent layer
- [x] [app/agents/prompts.py](/home/dev/Desktop/healthguard/app/agents/prompts.py)
- [x] [app/agents/tools.py](/home/dev/Desktop/healthguard/app/agents/tools.py)
- [x] [app/agents/nodes/__init__.py](/home/dev/Desktop/healthguard/app/agents/nodes/__init__.py)
- [x] [app/agents/graphs/__init__.py](/home/dev/Desktop/healthguard/app/agents/graphs/__init__.py)

### Service layer
- [x] [app/services/parsing.py](/home/dev/Desktop/healthguard/app/services/parsing.py)
- [x] [app/services/labs.py](/home/dev/Desktop/healthguard/app/services/labs.py)
- [x] [app/services/note_generation.py](/home/dev/Desktop/healthguard/app/services/note_generation.py)
- [x] [app/services/rag.py](/home/dev/Desktop/healthguard/app/services/rag.py)
- [x] [app/rag/__init__.py](/home/dev/Desktop/healthguard/app/rag/__init__.py)

### Observability, tests, quality
- [ ] [app/tests/__init__.py](/home/dev/Desktop/healthguard/app/tests/__init__.py) and test suite expansion
- [x] [app/tests/test_hello.py](/home/dev/Desktop/healthguard/app/tests/test_hello.py)
- [ ] Unit and integration tests for all API routes
- [ ] End-to-end safety guardrail tests for note and risk language

## 7) Frontend Implementation Checklist (File-by-File)

### App shell and routing
- [x] [web/src/main.tsx](/home/dev/Desktop/healthguard/web/src/main.tsx)
- [x] [web/src/App.tsx](/home/dev/Desktop/healthguard/web/src/App.tsx)
- [x] [web/src/meta.ts](/home/dev/Desktop/healthguard/web/src/meta.ts)

### Providers and global behavior
- [x] [web/src/providers/route-provider.tsx](/home/dev/Desktop/healthguard/web/src/providers/route-provider.tsx)
- [x] [web/src/providers/theme-provider.tsx](/home/dev/Desktop/healthguard/web/src/providers/theme-provider.tsx)
- [x] [web/src/lib/theme.ts](/home/dev/Desktop/healthguard/web/src/lib/theme.ts)

### Shared UI building blocks
- [x] [web/src/utils/cx.ts](/home/dev/Desktop/healthguard/web/src/utils/cx.ts)
- [x] [web/src/utils/is-react-component.ts](/home/dev/Desktop/healthguard/web/src/utils/is-react-component.ts)
- [x] [web/src/components](/home/dev/Desktop/healthguard/web/src/components)
- [x] [web/src/components/base/buttons/button.tsx](/home/dev/Desktop/healthguard/web/src/components/base/buttons/button.tsx)
- [x] [web/src/components/base/input/input.tsx](/home/dev/Desktop/healthguard/web/src/components/base/input/input.tsx)
- [x] [web/src/components/base/alerts/alert.tsx](/home/dev/Desktop/healthguard/web/src/components/base/alerts/alert.tsx)
- [x] [web/src/components/base/badges/badge.tsx](/home/dev/Desktop/healthguard/web/src/components/base/badges/badge.tsx)
- [x] [web/src/components/base/cards/card.tsx](/home/dev/Desktop/healthguard/web/src/components/base/cards/card.tsx)
- [x] [web/src/components/base/empty-state/empty-state.tsx](/home/dev/Desktop/healthguard/web/src/components/base/empty-state/empty-state.tsx)
- [x] [web/src/components/base/metrics/metric-card.tsx](/home/dev/Desktop/healthguard/web/src/components/base/metrics/metric-card.tsx)
- [x] [web/src/components/base/typography/section-title.tsx](/home/dev/Desktop/healthguard/web/src/components/base/typography/section-title.tsx)
- [x] [web/src/components/index.ts](/home/dev/Desktop/healthguard/web/src/components/index.ts)

### Hooks and shared behavior
- [x] [web/src/hooks/use-breakpoint.ts](/home/dev/Desktop/healthguard/web/src/hooks/use-breakpoint.ts)
- [x] [web/src/hooks/use-clipboard.ts](/home/dev/Desktop/healthguard/web/src/hooks/use-clipboard.ts)

### Style system
- [x] [web/src/styles/theme.css](/home/dev/Desktop/healthguard/web/src/styles/theme.css)
- [x] [web/src/styles/globals.css](/home/dev/Desktop/healthguard/web/src/styles/globals.css)
- [x] [web/src/components/theme-toggle.tsx](/home/dev/Desktop/healthguard/web/src/components/theme-toggle.tsx)

### Tooling and code generation
- [x] [Makefile](/home/dev/Desktop/healthguard/Makefile)
- [x] [scripts/generate_hello_frontend.py](/home/dev/Desktop/healthguard/scripts/generate_hello_frontend.py)
- [x] [web/src/lib/generated/hello-api.generated.ts](/home/dev/Desktop/healthguard/web/src/lib/generated/hello-api.generated.ts)

### Feature pages
- [x] [web/src/pages](/home/dev/Desktop/healthguard/web/src/pages) folder implementation
- [x] [web/src/pages/HelloWorldPage.generated.tsx](/home/dev/Desktop/healthguard/web/src/pages/HelloWorldPage.generated.tsx)
- [x] Home-style landing route cleanup and hello-only experience in [web/src/App.tsx](/home/dev/Desktop/healthguard/web/src/App.tsx)
- [ ] Home page experience (expanded product flow)
- [ ] Profile and context capture
- [ ] Lab upload and parsing status page
- [ ] Analysis visualization page
- [ ] Doctor note page and share/download flow

## 8) Theme Utility Examples (Reference)

Use theme helpers to keep all pages visually consistent:

```
import { cardTokens, statusToneClass, utilityClassExamples, utilityStyleExamples, tokens } from '@/lib/theme'

<div className={cardTokens.containerClass}>...</div>
<div className={statusToneClass('attention')}>Check these values</div>
<div className={utilityClassExamples.appShell}>...</div>
<div style={utilityStyleExamples.card}>...</div>
```

- `cardTokens.containerClass` for surface containers
- `cardTokens.mutedSurfaceClass` for quieter sections
- `statusToneClass('normal'|'attention'|'urgent')` for chips and statuses
- `tokens.brand` for API-level logic and non-CSS references

## 9) Update Protocol (Mandatory)

Before each commit that changes architecture, stack choice, folder structure, behavior, or theme tokens:

1. Update this `AGENTS.md` first.
2. Add a changelog entry under the next version/date.
3. Update `PRD.md` if product scope, safety posture, user flows, clinical behavior, research grounding, or feature requirements changed.
4. Update affected code files.
5. Ensure changelog, PRD, and implementation checklists remain truthful.

A repo-level reminder hook is installed via `.githooks/pre-commit` and `make setup-git-hooks`.

## 9.1) Makefile Development Contract (Required)

- Core local workflow commands are fixed as:
  - `make dev` – run backend and frontend dev servers together.
  - `make install backend` (alias: `make install-backend`) – install backend dependencies.
  - `make install frontend` (alias: `make install-frontend`) – install frontend dependencies with `bun`.
  - `make gen` – regenerate frontend endpoint typings/page from backend OpenAPI.
  - `make lint` – run backend lint/type-check and frontend TypeScript strict check.
  - `make test` – run backend tests and frontend tests (if configured).

These frontend commands assume the `bun` binary is available on `$PATH` for collaborator machines.

If these commands are changed, `AGENTS.md` and `CHANGELOG.md` must be updated in the same commit.

## 11) CORS + API Integration Pattern

- Backend health checks and hello endpoint CORS behavior are controlled via `app/core/config.py: settings.cors_origins`.
- Frontend development uses Vite proxy for `/api/v1` in [web/vite.config.ts](/home/dev/Desktop/healthguard/web/vite.config.ts).
- Generated frontend API clients use `import.meta.env.VITE_API_BASE_URL` first; fallback is relative path (`''`) to support proxy-based local dev.

## 10) Change Log

- `2026-05-05` — Added [PRD.md](/home/dev/Desktop/healthguard/PRD.md) as the product source of truth for HealthGuard AI goals, features, safety posture, clinician-bridge output, and reputable research basis.
- `2026-05-05` — Updated hello page with theme-aware controls: added `ThemeToggle`, retry request button, and current-theme indicator in [web/src/pages/HelloWorldPage.generated.tsx](/home/dev/Desktop/healthguard/web/src/pages/HelloWorldPage.generated.tsx).
- `2026-05-05` — Initial locked source document created.
- `2026-05-05` — Frontend scaffold replaced in `web/` with Vite + Untitled UI foundation and theme provider routing utilities.
- `2026-05-05` — Added reusable color token API in [web/src/lib/theme.ts](/home/dev/Desktop/healthguard/web/src/lib/theme.ts).
- `2026-05-05` — Expanded file-by-file backend/frontend implementation checklists in this document.
- `2026-05-05` — Added change-log protocol file and pre-commit reminder scaffold.
- `2026-05-05` — Simplified frontend landing experience to a clean Hello World connectivity page on `/`, removed placeholder Home/Docs content, and aligned typography/color usage to shared theme tokens in `web/src/lib/theme.ts`.
- `2026-05-05` — Simplified Makefile command contract to support `make dev`, `make install frontend|backend`, `make gen`, `make lint`, and `make test`; added frontend codegen alias and pre-commitable checks.
