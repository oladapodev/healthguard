from datetime import datetime

from fastapi import APIRouter, status

from app.schemas.hello import HelloWorldResponse

router = APIRouter(prefix="/api/v1", tags=["hello"]) 


@router.get(
    "/hello",
    response_model=HelloWorldResponse,
    summary="Return a typed Hello World payload",
    description="A smoke endpoint for connectivity checks between frontend and backend.",
    response_description="A typed greeting with service metadata and timestamp.",
    status_code=status.HTTP_200_OK,
)
def hello_world() -> HelloWorldResponse:
    return HelloWorldResponse(
        message="Hello world",
        status="ok",
        service="API",
        version="0.1.0",
        generated_at=datetime.utcnow().isoformat(),
    )
