from pydantic import BaseModel


class LabUploadResponse(BaseModel):
    status: str
    message: str
