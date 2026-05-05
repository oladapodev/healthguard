from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import (
    analysis_router,
    auth_router,
    hello_router,
    labs_router,
    note_router,
    profile_router,
)
from app.core.config import settings

app = FastAPI(
    title=settings.project_name,
    version="0.1.0",
    description="HealthGuard AI API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(labs_router)
app.include_router(profile_router)
app.include_router(analysis_router)
app.include_router(note_router)
app.include_router(hello_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
