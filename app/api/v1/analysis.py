from fastapi import APIRouter

from app.schemas.analysis import AnalysisRequest, AnalysisResponse

router = APIRouter(prefix="/api/v1/analysis", tags=["analysis"])


@router.post("", response_model=AnalysisResponse)
def analyze(request: AnalysisRequest) -> AnalysisResponse:
    return AnalysisResponse(
        lab_id=request.lab_id,
        summary="Clinical reasoning workflow stubbed.",
        risk_level="low",
        recommendations=["Hydrate and review results with a clinician"],
    )
