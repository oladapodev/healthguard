from typing import Any

from datetime import datetime

from fastapi import APIRouter, File, UploadFile

from app.schemas.lab import LabDocumentUploadResponse
from app.services.parsing import parse_uploaded_lab_document

router = APIRouter(prefix="/api/v1/labs", tags=["labs"])


@router.post(
    "/upload",
    response_model=LabDocumentUploadResponse,
    summary="Upload and parse a lab document",
    description=(
        "Accepts a lab PDF, image, CSV, or text file and returns a typed parsing "
        "result. The current implementation exposes the stable API contract while "
        "the Docling parser is wired behind the service boundary."
    ),
)
async def upload_lab_document(file: UploadFile = File(...)) -> LabDocumentUploadResponse:
    payload = await file.read()
    parsed = await parse_uploaded_lab_document(
        filename=file.filename or "lab-document",
        content_type=file.content_type,
        payload=payload,
    )

    return LabDocumentUploadResponse(
        lab_id=parsed.lab_id,
        status=parsed.status,
        filename=parsed.filename,
        content_type=parsed.content_type,
        marker_count=len(parsed.markers),
        markers=parsed.markers,
        parser=parsed.parser,
        uploaded_at=datetime.utcnow(),
        disclaimer=(
            "HealthGuard AI is not a diagnosis and is not a substitute for "
            "professional medical care. Review lab results with a qualified clinician."
        ),
    )


@router.get("/{lab_id}")
def get_lab_result(lab_id: str) -> dict[str, Any]:
    return {"lab_id": lab_id, "status": "stubbed"}
