from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from uuid import uuid4

from app.schemas.lab import LabMarker, LabUploadStatus


@dataclass(frozen=True)
class ParsedLabDocument:
    lab_id: str
    status: LabUploadStatus
    filename: str
    content_type: str | None
    parser: str
    markers: list[LabMarker] = field(default_factory=list)
    raw_text: str | None = None


def extract_values(raw_text: str) -> dict[str, str]:
    """Heuristic placeholder to extract biomarker values from text."""
    return {"raw_preview": raw_text[:200]}


async def parse_uploaded_lab_document(
    *,
    filename: str,
    content_type: str | None,
    payload: bytes,
) -> ParsedLabDocument:
    """Parse an uploaded lab document into normalized markers."""

    lab_id = f"lab_{uuid4().hex}"
    suffix = Path(filename).suffix.lower()
    text = payload.decode("utf-8", errors="ignore") if suffix in {".txt", ".csv"} else None

    return ParsedLabDocument(
        lab_id=lab_id,
        status=LabUploadStatus.NEEDS_REVIEW,
        filename=filename,
        content_type=content_type,
        parser="docling-ready-fallback",
        markers=[],
        raw_text=text,
    )
