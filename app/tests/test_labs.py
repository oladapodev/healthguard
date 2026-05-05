import pytest

from app.main import app
from app.services.parsing import parse_uploaded_lab_document


@pytest.mark.asyncio
async def test_lab_parser_returns_typed_contract() -> None:
    parsed = await parse_uploaded_lab_document(
        filename="sample.txt",
        content_type="text/plain",
        payload=b"Hemoglobin 13.8 g/dL",
    )

    payload = {
        "lab_id": parsed.lab_id,
        "status": parsed.status,
        "filename": parsed.filename,
        "content_type": parsed.content_type,
        "parser": parsed.parser,
        "marker_count": len(parsed.markers),
    }
    assert payload["status"] == "needs_review"
    assert payload["filename"] == "sample.txt"
    assert payload["content_type"] == "text/plain"
    assert payload["parser"] == "docling-ready-fallback"
    assert payload["marker_count"] == 0
    assert payload["lab_id"].startswith("lab_")


def test_lab_upload_openapi_contract() -> None:
    openapi = app.openapi()
    route = openapi["paths"]["/api/v1/labs/upload"]["post"]

    assert route["summary"] == "Upload and parse a lab document"
    schema = route["responses"]["200"]["content"]["application/json"]["schema"]
    assert schema.get("$ref", "").endswith("/LabDocumentUploadResponse")
