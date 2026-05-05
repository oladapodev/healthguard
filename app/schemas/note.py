from pydantic import BaseModel


class NoteRequest(BaseModel):
    user_id: str
    lab_id: str


class NoteResponse(BaseModel):
    user_id: str
    report_id: str
    doctor_note: str
