from typing import Any

from fastapi import APIRouter

from app.schemas.profile import ProfilePayload, ProfileResponse

router = APIRouter(prefix="/api/v1/profile", tags=["profile"])


@router.get("/me")
def get_profile() -> ProfileResponse:
    return ProfileResponse(
        user_id="user_stub", age=None, gender=None, cycle_phase=None, preferences={}
    )


@router.patch("/me")
def update_profile(payload: ProfilePayload) -> dict[str, Any]:
    return {"message": "Profile updated", "data": payload.model_dump(exclude_none=True)}
