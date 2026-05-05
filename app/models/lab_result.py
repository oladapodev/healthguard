from datetime import datetime

from sqlmodel import Field, SQLModel


class LabResult(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    filename: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    raw_payload: str | None = None
