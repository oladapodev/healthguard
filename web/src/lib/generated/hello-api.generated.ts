// Auto-generated from FastAPI OpenAPI schema.
// Do not edit directly; run: python3 scripts/generate_hello_frontend.py

export const helloWorldRoute = '/api/v1/hello' as const

export interface HelloWorldResponse {
  message: string
  status: string
  service: string
  version: string
  generated_at: string
}

export const helloApiDocs = {
  summary: "Return a typed Hello World payload",
  description: "A smoke endpoint for connectivity checks between frontend and backend.",
} as const

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

export async function fetchHelloWorld(): Promise<HelloWorldResponse> {
  const response = await fetch(`${API_BASE}${helloWorldRoute}`)
  if (!response.ok) {
    throw new Error(`Hello endpoint request failed: ${response.status}`)
  }
  return (await response.json()) as HelloWorldResponse
}
