from pydantic import BaseModel


class HelloWorldResponse(BaseModel):
    """Typed payload for hello world smoke endpoint."""

    message: str
    status: str
    service: str
    version: str
    generated_at: str
