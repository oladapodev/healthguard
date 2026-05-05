from pydantic import BaseModel


class AnalysisRequest(BaseModel):
    lab_id: str
    include_environment: bool = True


class AnalysisResponse(BaseModel):
    lab_id: str
    summary: str
    risk_level: str
    recommendations: list[str]
