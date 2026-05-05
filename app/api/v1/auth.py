from typing import Any

from fastapi import APIRouter, HTTPException, status

from app.schemas.auth import AuthPayload

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register")
def register(payload: AuthPayload) -> dict[str, str]:
    if not payload.email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is required",
        )
    return {
        "message": "Registration flow is scaffolded (FastAPI Users integration next).",
        "email": payload.email,
    }


@router.post("/login")
def login(payload: AuthPayload) -> dict[str, Any]:
    return {
        "message": "Login flow is scaffolded (JWT issued after DB wiring).",
        "email": payload.email,
    }
