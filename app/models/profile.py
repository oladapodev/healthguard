from typing import Any

from sqlmodel import Field, SQLModel


class UserProfile(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    age: int | None = None
    gender: str | None = None
    cycle_phase: str | None = None
    context: dict[str, Any] = Field(default_factory=dict, sa_type=None)
