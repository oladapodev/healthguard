from typing import Any

from fastapi import APIRouter

router = APIRouter(prefix="/api/v1/labs", tags=["labs"])


@router.post("/upload")
def upload_lab_document() -> dict[str, str]:
    return {"status": "received", "message": "Lab upload endpoint stub."}


@router.get("/{lab_id}")
def get_lab_result(lab_id: str) -> dict[str, Any]:
    return {"lab_id": lab_id, "status": "stubbed"}
