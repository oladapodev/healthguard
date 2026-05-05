from pydantic import BaseModel, Field


class ProfilePayload(BaseModel):
    age: int | None = Field(default=None, ge=0)
    gender: str | None = None
    cycle_phase: str | None = None
    preferences: dict[str, str] = Field(default_factory=dict)


class ProfileResponse(ProfilePayload):
    user_id: str
