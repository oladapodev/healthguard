# Changelog

All notable project changes should be recorded here and mirrored in AGENTS update log.

## Unreleased

### Added
- Added [TASKS.md](TASKS.md) as the active build task plan with service/tool recommendations and sprint sequencing for lab parsing, agents, environmental context, RAG, and Doctor Notes.
- Added typed lab upload and marker extraction contracts:
  - [app/schemas/lab.py](/home/dev/Desktop/healthguard/app/schemas/lab.py)
  - [app/models/lab_result.py](/home/dev/Desktop/healthguard/app/models/lab_result.py)
  - [app/services/parsing.py](/home/dev/Desktop/healthguard/app/services/parsing.py)
  - [app/api/v1/labs.py](/home/dev/Desktop/healthguard/app/api/v1/labs.py)
- Added first agent workflow state scaffolding:
  - [app/agents/state.py](/home/dev/Desktop/healthguard/app/agents/state.py)
  - [app/agents/graphs/lab_analysis.py](/home/dev/Desktop/healthguard/app/agents/graphs/lab_analysis.py)
- Added generic OpenAPI frontend API client generation via [scripts/generate_api_client.py](/home/dev/Desktop/healthguard/scripts/generate_api_client.py).
- Added lab upload endpoint contract tests in [app/tests/test_labs.py](/home/dev/Desktop/healthguard/app/tests/test_labs.py).
- Added [PRD.md](PRD.md) as the product source of truth for HealthGuard AI goals, concrete feature scope, safety posture, clinician-bridge output, and reputable research basis.
- Added [web/src/lib/theme.ts](web/src/lib/theme.ts) with palette tokens, semantic color map, and utility class examples.
- Expanded [AGENTS.md](/AGENTS.md) into a detailed implementation checklist for backend and frontend file-by-file work.
- Added changelog workflow (`CHANGELOG.md`) and repository pre-commit reminder mechanism.
- Added typed Hello World API endpoint scaffolding and generated frontend integration:
  - `app/schemas/hello.py`
  - `app/api/v1/hello.py`
  - `app/tests/test_hello.py`
  - `web/src/lib/generated/hello-api.generated.ts`
  - `web/src/pages/HelloWorldPage.generated.tsx`
- Simplified Makefile workflow to the required command set (`dev`, `install frontend`, `install backend`, `gen`, `lint`, `test`) with aliases.
- Updated Makefile frontend tooling to use plain `bun` executable from PATH (removed hardcoded user-specific bun binary path) to make collaboration setup portable, and fixed JSX escape issue in `web/src/components/base/buttons/button.tsx`.
- Reworked `web/src/App.tsx` into a clean, minimal landing route using only the hello endpoint display and removed Home/Docs placeholder scaffolding.
- Simplified `web/src/pages/HelloWorldPage.generated.tsx` to a minimal, typed backend hello payload view with corrected copy and theme-aware colors/typography.
- Refined `web/src/lib/theme.ts` utility classes to use shared semantic CSS variables and HealthGuard color/typography tokens.
- Added local CORS middleware in `app/main.py` using `app/core/config.py` (`cors_origins`) to allow Vite origin requests.
- Added `/api/v1` proxy in [web/vite.config.ts](/home/dev/Desktop/healthguard/web/vite.config.ts) for dev-time same-origin API calls.
- Updated codegen output template and generated client to default to relative API base (`VITE_API_BASE_URL` fallback to `''`) to work with Vite proxy.
- Updated generated hello UI template in `scripts/generate_hello_frontend.py` to include theme-aware refresh flow and theme toggle, aligned with [web/src/pages/HelloWorldPage.generated.tsx](/home/dev/Desktop/healthguard/web/src/pages/HelloWorldPage.generated.tsx).
- Added a starter Untitled UI component bundle for application reuse:
  - [web/src/components/base/alerts/alert.tsx](/home/dev/Desktop/healthguard/web/src/components/base/alerts/alert.tsx)
  - [web/src/components/base/badges/badge.tsx](/home/dev/Desktop/healthguard/web/src/components/base/badges/badge.tsx)
  - [web/src/components/base/cards/card.tsx](/home/dev/Desktop/healthguard/web/src/components/base/cards/card.tsx)
  - [web/src/components/base/empty-state/empty-state.tsx](/home/dev/Desktop/healthguard/web/src/components/base/empty-state/empty-state.tsx)
  - [web/src/components/base/metrics/metric-card.tsx](/home/dev/Desktop/healthguard/web/src/components/base/metrics/metric-card.tsx)
  - [web/src/components/base/typography/section-title.tsx](/home/dev/Desktop/healthguard/web/src/components/base/typography/section-title.tsx)
  - [web/src/components/index.ts](/home/dev/Desktop/healthguard/web/src/components/index.ts)

### Changed
- Updated `make gen` to generate a broader OpenAPI TypeScript client instead of only the hello endpoint.
- Updated the generated hello page to consume [web/src/lib/generated/api-client.generated.ts](/home/dev/Desktop/healthguard/web/src/lib/generated/api-client.generated.ts).
- Kept [scripts/generate_hello_frontend.py](/home/dev/Desktop/healthguard/scripts/generate_hello_frontend.py) as a compatibility wrapper around the new generic generator.
- Updated [AGENTS.md](AGENTS.md) update protocol so product-scope changes must also update [PRD.md](PRD.md).
- Theme source of truth now includes direct guidance for `#0F766E`, `#10B981`, `#F8FAFC`, `#64748B`, `#F59E0B`, and `#EF4444` across tokens and docs.
- Updated `AGENTS.md` to document the locked Makefile contract and changelog sync requirements.
- Updated [web/src/pages/HelloWorldPage.generated.tsx](/home/dev/Desktop/healthguard/web/src/pages/HelloWorldPage.generated.tsx) to add theme toggling and a retry request action using theme-aware styling.

## 2026-05-05

### Project foundation
- Rebuilt frontend scaffold under `web/` with Vite and Untitled UI starter layout.
