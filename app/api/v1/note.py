from fastapi import APIRouter

from app.schemas.note import NoteRequest, NoteResponse

router = APIRouter(prefix="/api/v1/note", tags=["notes"])


@router.post("", response_model=NoteResponse)
def create_note(request: NoteRequest) -> NoteResponse:
    return NoteResponse(
        user_id=request.user_id,
        report_id=request.lab_id,
        doctor_note="Doctor note generation is scaffolded.",
    )
