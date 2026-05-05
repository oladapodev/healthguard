from app.main import app
from app.api.v1.hello import hello_world


def test_hello_world_endpoint() -> None:
    payload = hello_world().model_dump()

    assert payload["message"] == "Hello world"
    assert payload["status"] == "ok"
    assert payload["service"] == "API"
    assert payload["version"] == "0.1.0"


def test_hello_world_openapi_contract() -> None:
    openapi = app.openapi()
    route = openapi["paths"]["/api/v1/hello"]["get"]

    assert route["summary"] == "Return a typed Hello World payload"
    assert route["description"] == "A smoke endpoint for connectivity checks between frontend and backend."
    schema = route["responses"]["200"]["content"]["application/json"]["schema"]
    assert schema.get("$ref", "").endswith("/HelloWorldResponse")
