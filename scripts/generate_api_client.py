from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from app.main import app

OUTPUT_API_DIR = Path("web/src/lib/generated")
API_OUT = OUTPUT_API_DIR / "api-client.generated.ts"

HTTP_METHODS = {"get", "post", "put", "patch", "delete"}


def _schema_name(ref: str) -> str:
    return ref.rsplit("/", 1)[-1]


def _ts_type(schema: dict[str, Any]) -> str:
    if "$ref" in schema:
        return _schema_name(schema["$ref"])

    if "anyOf" in schema:
        return " | ".join(_ts_type(item) for item in schema["anyOf"])

    if "allOf" in schema:
        return " & ".join(_ts_type(item) for item in schema["allOf"])

    schema_type = schema.get("type")

    if schema_type == "string":
        return "string"
    if schema_type in {"integer", "number"}:
        return "number"
    if schema_type == "boolean":
        return "boolean"
    if schema_type == "array":
        return f"Array<{_ts_type(schema.get('items', {}) or {})}>"
    if schema_type == "object":
        additional = schema.get("additionalProperties")
        if isinstance(additional, dict):
            return f"Record<string, {_ts_type(additional)}>"
        return "Record<string, unknown>"
    if schema_type == "null":
        return "null"

    return "unknown"


def _build_interface(name: str, schema: dict[str, Any]) -> str:
    if "enum" in schema:
        values = " | ".join(json.dumps(value) for value in schema["enum"])
        return f"export type {name} = {values}"

    properties = schema.get("properties", {})
    required = set(schema.get("required", []))

    lines = [f"export interface {name} {{"]
    for field, definition in properties.items():
        optional = "" if field in required else "?"
        lines.append(f"  {field}{optional}: {_ts_type(definition)}")
    lines.append("}")
    return "\n".join(lines)


def _operation_name(method: str, path: str, operation: dict[str, Any]) -> str:
    operation_id = operation.get("operationId")
    if operation_id:
        name = re.sub(r"[^a-zA-Z0-9_]", "_", operation_id)
    else:
        name = f"{method}_{path.strip('/').replace('/', '_').replace('-', '_')}"

    parts = [part for part in re.split(r"[_\s]+", name) if part]
    if not parts:
        return "requestApi"

    return parts[0] + "".join(part[:1].upper() + part[1:] for part in parts[1:])


def _response_type(operation: dict[str, Any]) -> str:
    response = operation.get("responses", {}).get("200") or operation.get("responses", {}).get("201")
    schema = response and response.get("content", {}).get("application/json", {}).get("schema")
    return _ts_type(schema or {})


def _request_body_type(operation: dict[str, Any]) -> str | None:
    content = operation.get("requestBody", {}).get("content", {})
    for media_type in ("application/json", "multipart/form-data"):
        schema = content.get(media_type, {}).get("schema")
        if schema:
            return "FormData" if media_type == "multipart/form-data" else _ts_type(schema)
    return None


def _request_body_media_type(operation: dict[str, Any]) -> str | None:
    content = operation.get("requestBody", {}).get("content", {})
    for media_type in ("application/json", "multipart/form-data"):
        if content.get(media_type, {}).get("schema"):
            return media_type
    return None


def _path_param_names(path: str) -> list[str]:
    return re.findall(r"{([^}]+)}", path)


def _path_template(path: str) -> str:
    return re.sub(r"{([^}]+)}", r"${params.\1}", path)


def _render_operation(method: str, path: str, operation: dict[str, Any]) -> str:
    fn_name = _operation_name(method, path, operation)
    response = _response_type(operation)
    body_type = _request_body_type(operation)
    body_media_type = _request_body_media_type(operation)
    path_params = _path_param_names(path)
    route_value = f"`{_path_template(path)}`" if path_params else json.dumps(path)
    method_upper = method.upper()

    params = ["options: ApiRequestOptions = {}"]
    if path_params:
        shape = "; ".join(f"{name}: string | number" for name in path_params)
        params.insert(0, f"params: {{ {shape} }}")
    if body_type:
        params.insert(0, f"body: {body_type}")

    body_lines = [
        f"export async function {fn_name}({', '.join(params)}): Promise<{response}> {{",
        f"  return apiRequest<{response}>({route_value}, {{",
        f"    method: {json.dumps(method_upper)},",
        "    ...options,",
    ]

    if body_type and body_media_type == "application/json":
        body_lines.append("    body: JSON.stringify(body),")
        body_lines.append("    headers: { 'Content-Type': 'application/json', ...options.headers },")
    elif body_type:
        body_lines.append("    body,")

    body_lines.extend(
        [
            "  })",
            "}",
        ]
    )

    return "\n".join(body_lines)


def main() -> None:
    openapi = app.openapi()
    schemas = openapi.get("components", {}).get("schemas", {})
    schema_blocks = [_build_interface(name, schema) for name, schema in sorted(schemas.items())]

    operations: list[str] = []
    for path, path_config in sorted(openapi.get("paths", {}).items()):
        for method, operation in sorted(path_config.items()):
            if method in HTTP_METHODS:
                operations.append(_render_operation(method, path, operation))

    OUTPUT_API_DIR.mkdir(parents=True, exist_ok=True)
    API_OUT.write_text(
        "// Auto-generated from FastAPI OpenAPI schema.\n"
        "// Do not edit directly; run: make gen\n\n"
        "export type ApiRequestOptions = Omit<RequestInit, 'body' | 'method'>\n\n"
        "const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''\n\n"
        "async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {\n"
        "  const response = await fetch(`${API_BASE}${path}`, init)\n"
        "  if (!response.ok) {\n"
        "    const message = await response.text()\n"
        "    throw new Error(message || `API request failed: ${response.status}`)\n"
        "  }\n"
        "  return (await response.json()) as T\n"
        "}\n\n"
        + "\n\n".join(schema_blocks)
        + "\n\n"
        + "\n\n".join(operations)
        + "\n"
    )

    print(f"Generated: {API_OUT}")


if __name__ == "__main__":
    main()
