from __future__ import annotations

import json
from pathlib import Path

from app.main import app

OUTPUT_API_DIR = Path("web/src/lib/generated")
OUTPUT_PAGE_DIR = Path("web/src/pages")
API_OUT = OUTPUT_API_DIR / "hello-api.generated.ts"
PAGE_OUT = OUTPUT_PAGE_DIR / "HelloWorldPage.generated.tsx"


def _ts_type(prop: dict) -> str:
    if "$ref" in prop:
        return prop["$ref"].rsplit("/", 1)[-1]

    prop_type = prop.get("type")

    if prop_type == "string":
        return "string"
    if prop_type in {"integer", "number"}:
        return "number"
    if prop_type == "boolean":
        return "boolean"
    if prop_type == "array":
        return f"Array<{_ts_type(prop.get('items', {}) or {})}>"
    if prop_type == "object":
        return "Record<string, unknown>"

    return "unknown"


def _build_interface(name: str, schema: dict) -> str:
    properties = schema.get("properties", {})
    required = set(schema.get("required", []))

    lines = [f"export interface {name} {{"]
    for field, definition in properties.items():
        optional = "" if field in required else "?"
        lines.append(f"  {field}{optional}: {_ts_type(definition)}")
    lines.append("}")
    return "\n".join(lines)


def _render_page() -> str:
    return """// Auto-generated from FastAPI OpenAPI schema.
// Do not edit directly; run: python3 scripts/generate_hello_frontend.py

import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/base/buttons/button'
import { cardTokens, statusToneClass, utilityClassExamples, utilityStyleExamples } from '@/lib/theme'
import { ThemeToggle } from '@/components/theme-toggle'
import { fetchHelloWorld, type HelloWorldResponse } from '@/lib/generated/hello-api.generated'
import { useTheme } from '@/providers/theme-provider'

type HelloStatusTone = 'normal' | 'attention' | 'urgent'

export function HelloWorldPage() {
  const [payload, setPayload] = useState<HelloWorldResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  const loadHello = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const value = await fetchHelloWorld()
      setPayload(value)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load hello endpoint')
      setPayload(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadHello()
  }, [loadHello])

  const statusTone: HelloStatusTone =
    payload?.status.toLowerCase() === 'ok'
      ? 'normal'
      : payload?.status.toLowerCase() === 'attention'
        ? 'attention'
        : 'urgent'

  const toneClass = statusToneClass(statusTone)

  if (loading) {
    return (
      <section className={utilityClassExamples.appShell}>
        <section className={cardTokens.containerClass} style={utilityStyleExamples.card}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              Loading hello endpoint payload…
            </p>
            <ThemeToggle />
          </div>
        </section>
      </section>
    )
  }

  if (error) {
    return (
      <section className={utilityClassExamples.appShell}>
        <section className={cardTokens.containerClass} style={utilityStyleExamples.card}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-red-700">{error}</p>
            <ThemeToggle />
          </div>
          <Button
            className="bg-[rgb(var(--color-brand-main))] hover:bg-[rgb(var(--color-accent-green-600))]"
            onClick={loadHello}
            disabled={loading}
            type="button"
          >
            Retry Hello World
          </Button>
        </section>
      </section>
    )
  }

  if (!payload) {
    return (
      <section className={utilityClassExamples.appShell}>
        <section className={cardTokens.containerClass} style={utilityStyleExamples.card}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-text-tertiary)]">No payload returned.</p>
            <ThemeToggle />
          </div>
          <Button
            className="bg-[rgb(var(--color-brand-main))] hover:bg-[rgb(var(--color-accent-green-600))]"
            onClick={loadHello}
            type="button"
          >
            Retry Hello World
          </Button>
        </section>
      </section>
    )
  }

  return (
    <section className={utilityClassExamples.appShell}>
      <section className={cardTokens.containerClass} style={utilityStyleExamples.card}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-[var(--color-text-tertiary)]">Current theme: {theme}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              className="bg-[rgb(var(--color-brand-main))] hover:bg-[rgb(var(--color-accent-green-600))]"
              onClick={loadHello}
              disabled={loading}
              type="button"
            >
              {loading ? 'Refreshing…' : 'Refresh Hello'}
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-primary)]">{payload.message}</p>

        <div className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}>
          Status: {payload.status}
        </div>

        <dl className="space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="font-medium text-[var(--color-text-primary)]">Service</dt>
            <dd className="text-[var(--color-text-tertiary)]">{payload.service}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-[var(--color-text-primary)]">Version</dt>
            <dd className="text-[var(--color-text-tertiary)]">{payload.version}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-medium text-[var(--color-text-primary)]">Generated</dt>
            <dd className="text-[var(--color-text-tertiary)]">{payload.generated_at}</dd>
          </div>
        </dl>

        <pre className="overflow-auto rounded-lg border border-[rgb(var(--color-border-secondary))] bg-[var(--color-bg-tertiary)] p-3 text-sm text-[var(--color-text-secondary)]">
          {JSON.stringify(payload, null, 2)}
        </pre>
      </section>
    </section>
  )
}
"""


def main() -> None:
    openapi = app.openapi()
    route = openapi["paths"]["/api/v1/hello"]["get"]
    response_schema = route["responses"]["200"]["content"]["application/json"]["schema"]
    schema_name = response_schema["$ref"].rsplit("/", 1)[-1]
    openapi_schema = openapi["components"]["schemas"][schema_name]

    OUTPUT_API_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PAGE_DIR.mkdir(parents=True, exist_ok=True)

    interface_text = _build_interface(schema_name, openapi_schema)

    API_OUT.write_text(
        "// Auto-generated from FastAPI OpenAPI schema.\n"
        "// Do not edit directly; run: python3 scripts/generate_hello_frontend.py\n\n"
        "export const helloWorldRoute = '/api/v1/hello' as const\n"
        "\n"
        f"{interface_text}\n\n"
        "export const helloApiDocs = {\n"
        f"  summary: {json.dumps(route.get('summary', ''))},\n"
        f"  description: {json.dumps(route.get('description', ''))},\n"
        "} as const\n\n"
        "const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''\n\n"
        f"export async function fetchHelloWorld(): Promise<{schema_name}> {{\n"
        "  const response = await fetch(`${API_BASE}${helloWorldRoute}`)\n"
        "  if (!response.ok) {\n"
        "    throw new Error(`Hello endpoint request failed: ${response.status}`)\n"
        "  }\n"
        f"  return (await response.json()) as {schema_name}\n"
        "}\n"
    )

    PAGE_OUT.write_text(_render_page())

    print(f"Generated: {API_OUT}")
    print(f"Generated: {PAGE_OUT}")


if __name__ == '__main__':
    main()
