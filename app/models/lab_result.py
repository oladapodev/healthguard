from datetime import datetime

from sqlmodel import Field, SQLModel


class LabResult(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    filename: str
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    raw_payload: str | None = None


class LabUpload(SQLModel, table=True):
    id: str = Field(primary_key=True)
    user_id: str | None = Field(default=None, index=True)
    filename: str
    content_type: str | None = None
    status: str = Field(default="received", index=True)
    parser: str = Field(default="docling")
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    raw_text: str | None = None


class LabResultMarker(SQLModel, table=True):
    id: str = Field(primary_key=True)
    lab_upload_id: str = Field(index=True)
    name: str = Field(index=True)
    value: str
    unit: str | None = None
    reference_range: str | None = None
    flag: str = Field(default="unknown", index=True)
    loinc_code: str | None = Field(default=None, index=True)
    source_text: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
