// Auto-generated from FastAPI OpenAPI schema.
// Do not edit directly; run: make gen

export type ApiRequestOptions = Omit<RequestInit, 'body' | 'method'>

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, init)
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `API request failed: ${response.status}`)
  }
  return (await response.json()) as T
}

export interface AnalysisRequest {
  lab_id: string
  include_environment?: boolean
}

export interface AnalysisResponse {
  lab_id: string
  summary: string
  risk_level: string
  recommendations: Array<string>
}

export interface AuthPayload {
  email: string
  password: string
}

export interface Body_upload_lab_document_api_v1_labs_upload_post {
  file: string
}

export interface HTTPValidationError {
  detail?: Array<ValidationError>
}

export interface HelloWorldResponse {
  message: string
  status: string
  service: string
  version: string
  generated_at: string
}

export interface LabDocumentUploadResponse {
  lab_id: string
  status: LabUploadStatus
  filename: string
  content_type?: string | null
  marker_count?: number
  markers?: Array<LabMarker>
  parser: string
  uploaded_at: string
  disclaimer: string
}

export interface LabMarker {
  name: string
  value: string
  unit?: string | null
  reference_range?: string | null
  flag?: LabMarkerFlag
  loinc_code?: string | null
  source_text?: string | null
}

export type LabMarkerFlag = "normal" | "low" | "high" | "critical" | "unknown"

export type LabUploadStatus = "received" | "parsed" | "needs_review" | "failed"

export interface NoteRequest {
  user_id: string
  lab_id: string
}

export interface NoteResponse {
  user_id: string
  report_id: string
  doctor_note: string
}

export interface ProfilePayload {
  age?: number | null
  gender?: string | null
  cycle_phase?: string | null
  preferences?: Record<string, string>
}

export interface ProfileResponse {
  age?: number | null
  gender?: string | null
  cycle_phase?: string | null
  preferences?: Record<string, string>
  user_id: string
}

export interface ValidationError {
  loc: Array<string | number>
  msg: string
  type: string
  input?: unknown
  ctx?: Record<string, unknown>
}

export async function analyzeApiV1AnalysisPost(body: AnalysisRequest, options: ApiRequestOptions = {}): Promise<AnalysisResponse> {
  return apiRequest<AnalysisResponse>("/api/v1/analysis", {
    method: "POST",
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export async function loginApiV1AuthLoginPost(body: AuthPayload, options: ApiRequestOptions = {}): Promise<Record<string, unknown>> {
  return apiRequest<Record<string, unknown>>("/api/v1/auth/login", {
    method: "POST",
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export async function registerApiV1AuthRegisterPost(body: AuthPayload, options: ApiRequestOptions = {}): Promise<Record<string, string>> {
  return apiRequest<Record<string, string>>("/api/v1/auth/register", {
    method: "POST",
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export async function helloWorldApiV1HelloGet(options: ApiRequestOptions = {}): Promise<HelloWorldResponse> {
  return apiRequest<HelloWorldResponse>("/api/v1/hello", {
    method: "GET",
    ...options,
  })
}

export async function uploadLabDocumentApiV1LabsUploadPost(body: FormData, options: ApiRequestOptions = {}): Promise<LabDocumentUploadResponse> {
  return apiRequest<LabDocumentUploadResponse>("/api/v1/labs/upload", {
    method: "POST",
    ...options,
    body,
  })
}

export async function getLabResultApiV1LabsLabIdGet(params: { lab_id: string | number }, options: ApiRequestOptions = {}): Promise<Record<string, unknown>> {
  return apiRequest<Record<string, unknown>>(`/api/v1/labs/${params.lab_id}`, {
    method: "GET",
    ...options,
  })
}

export async function createNoteApiV1NotePost(body: NoteRequest, options: ApiRequestOptions = {}): Promise<NoteResponse> {
  return apiRequest<NoteResponse>("/api/v1/note", {
    method: "POST",
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export async function getProfileApiV1ProfileMeGet(options: ApiRequestOptions = {}): Promise<ProfileResponse> {
  return apiRequest<ProfileResponse>("/api/v1/profile/me", {
    method: "GET",
    ...options,
  })
}

export async function updateProfileApiV1ProfileMePatch(body: ProfilePayload, options: ApiRequestOptions = {}): Promise<Record<string, unknown>> {
  return apiRequest<Record<string, unknown>>("/api/v1/profile/me", {
    method: "PATCH",
    ...options,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
}

export async function healthCheckHealthGet(options: ApiRequestOptions = {}): Promise<Record<string, string>> {
  return apiRequest<Record<string, string>>("/health", {
    method: "GET",
    ...options,
  })
}
