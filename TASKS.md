# HealthGuard AI Build Tasks

**Status:** Active  
**Last Updated:** 2026-05-05  
**Product Source:** [PRD.md](/home/dev/Desktop/healthguard/PRD.md)  
**Implementation Source:** [AGENTS.md](/home/dev/Desktop/healthguard/AGENTS.md)

## 1. Current Build Strategy

Start with the lab upload and parsing spine. Every later feature depends on reliable structured lab data: agents, medical RAG, environmental context, Doctor Notes, safety checks, and clinician summaries.

## 2. Recommended Services And Open-Source Tools

| Capability | First Choice | Why |
| --- | --- | --- |
| Agent workflow | LangGraph | Explicit state, branching, safety gates, persistence-friendly multi-agent flow |
| Agent tracing | Langfuse | Open-source tracing, prompt management, sessions, evals, LangChain/LangGraph support |
| LLM gateway | LiteLLM | One OpenAI-compatible interface across Groq, Fireworks, Ollama, OpenAI, Anthropic, etc. |
| Document parsing | Docling | Local PDF/image/OCR/table extraction with JSON/Markdown output |
| OCR fallback | Tesseract or RapidOCR via Docling | Keeps sensitive lab files local for MVP |
| Medical education | MedlinePlus Connect | NIH/NLM-backed, supports LOINC lab test code lookups |
| Lab coding | LOINC | Standard lab test identifiers |
| Environmental data | Open-Meteo Air Quality | AQI, PM2.5, PM10, NO2, O3, SO2, CO, pollen where available |
| Station air quality | OpenAQ | Public global air quality measurements |
| Vector store | Chroma | Local RAG store already in stack |
| RAG evaluation | Ragas | Measures retrieval and answer quality |
| Background jobs | Celery + Redis | Upload parsing, OCR, PDF generation, long-running analysis jobs |
| API | FastAPI | Typed OpenAPI source for frontend generation |

## 3. Sprint 1: Lab Upload + Typed API Spine

- [x] Create this task source-of-truth file.
- [x] Improve API type generation from a single hello-only generator into a generic OpenAPI TypeScript client generator.
- [x] Add typed lab upload schemas.
- [x] Add typed lab marker extraction schemas.
- [x] Add a Docling-ready parser service contract with a safe fallback.
- [x] Add lab upload endpoint metadata suitable for Swagger/OpenAPI docs.
- [x] Add first agent workflow state scaffold.
- [ ] Add persisted database session dependency.
- [ ] Store uploaded lab metadata in PostgreSQL.
- [ ] Store extracted markers in PostgreSQL.
- [ ] Add real Docling extraction implementation for PDFs/images.
- [ ] Add frontend lab upload page.
- [ ] Generate frontend client and wire upload page to backend.

## 4. Sprint 2: First Multi-Agent Analysis Flow

- [ ] Build `IntakeAgent` node for lab payload normalization.
- [ ] Build `ContextAgent` node for profile, lifestyle, and environment.
- [ ] Build `InsightsAgent` node for plain-language explanations.
- [ ] Build `SafetyAgent` node for urgent flags and non-diagnosis enforcement.
- [ ] Build `NoteAgent` node for patient summary and clinician summary.
- [ ] Add trace IDs and Langfuse instrumentation hooks.
- [ ] Add unit tests for safety language and structured outputs.

## 5. Sprint 3: Environmental Context

- [ ] Add location input to profile/context.
- [ ] Add Open-Meteo service client.
- [ ] Normalize AQI, PM2.5, PM10, NO2, O3, SO2, CO payloads.
- [ ] Add OpenAQ fallback or station-measurement enrichment.
- [ ] Add environment cards to analysis UI.

## 6. Sprint 4: Medical Grounding And RAG

- [ ] Add LOINC mapping model/table.
- [ ] Add MedlinePlus Connect lookup client.
- [ ] Add Chroma ingestion pipeline for approved source summaries.
- [ ] Add Ragas evaluation dataset and script.
- [ ] Add source citation metadata to analysis outputs.

## 7. Sprint 5: Doctor Note And Export

- [ ] Build clinician summary schema.
- [ ] Build PDF generation service.
- [ ] Add Doctor Note page.
- [ ] Add downloadable PDF endpoint.
- [ ] Add review/export audit log.

## 8. Safety Rules For Every Sprint

- Never claim diagnosis.
- Never suggest medication changes without clinician framing.
- Add urgent-care escalation language for severe or risky patterns.
- Keep intimate health fields optional and purpose-specific.
- Treat model outputs as untrusted data and validate them with Pydantic.
- Update `PRD.md`, `AGENTS.md`, `TASKS.md`, and `CHANGELOG.md` when scope or architecture changes.
