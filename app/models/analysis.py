from datetime import datetime

from sqlmodel import Field, SQLModel


class AnalysisRecord(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    lab_result_id: str = Field(index=True)
    result_json: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
