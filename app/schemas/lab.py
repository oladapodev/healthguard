from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, Field


class LabUploadStatus(StrEnum):
    RECEIVED = "received"
    PARSED = "parsed"
    NEEDS_REVIEW = "needs_review"
    FAILED = "failed"


class LabMarkerFlag(StrEnum):
    NORMAL = "normal"
    LOW = "low"
    HIGH = "high"
    CRITICAL = "critical"
    UNKNOWN = "unknown"


class LabMarker(BaseModel):
    name: str = Field(..., examples=["Hemoglobin"])
    value: str = Field(..., examples=["13.8"])
    unit: str | None = Field(default=None, examples=["g/dL"])
    reference_range: str | None = Field(default=None, examples=["13.2-16.6"])
    flag: LabMarkerFlag = LabMarkerFlag.UNKNOWN
    loinc_code: str | None = Field(default=None, examples=["718-7"])
    source_text: str | None = Field(
        default=None,
        description="Original text fragment used to extract this marker.",
    )


class LabDocumentUploadResponse(BaseModel):
    lab_id: str
    status: LabUploadStatus
    filename: str
    content_type: str | None = None
    marker_count: int = 0
    markers: list[LabMarker] = Field(default_factory=list)
    parser: str
    uploaded_at: datetime
    disclaimer: str


class LabResultResponse(BaseModel):
    lab_id: str
    status: LabUploadStatus
    filename: str
    marker_count: int
    markers: list[LabMarker] = Field(default_factory=list)
    created_at: datetime


class LabUploadResponse(BaseModel):
    status: str
    message: str
