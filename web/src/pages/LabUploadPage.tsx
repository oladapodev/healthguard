import { useMemo, useRef, useState } from 'react'

import { Alert } from '@/components/base/alerts/alert'
import { Badge } from '@/components/base/badges/badge'
import { Button } from '@/components/base/buttons/button'
import { Card } from '@/components/base/cards/card'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  type LabDocumentUploadResponse,
  uploadLabDocumentApiV1LabsUploadPost,
} from '@/lib/generated/api-client.generated'
import { utilityClassExamples } from '@/lib/theme'

const acceptedFileTypes = '.pdf,.png,.jpg,.jpeg,.txt,.csv'

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function LabUploadPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<LabDocumentUploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const fileLabel = useMemo(() => {
    if (!file) {
      return 'PDF, image, CSV, or text lab document'
    }

    return `${file.name} · ${formatFileSize(file.size)}`
  }, [file])

  const handleUpload = async () => {
    if (!file) {
      setError('Choose a lab document first.')
      return
    }

    const body = new FormData()
    body.append('file', file)

    setIsUploading(true)
    setError(null)
    setResult(null)

    try {
      const payload = await uploadLabDocumentApiV1LabsUploadPost(body)
      setResult(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to upload lab document.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className={`${utilityClassExamples.appShell} space-y-5`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--color-text-tertiary)]">HealthGuard AI</p>
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Lab intake</h1>
        </div>
        <ThemeToggle />
      </div>

      <Card className="bg-[var(--color-bg-tertiary)]">
        <div className="space-y-4">
          <label
            htmlFor="lab-file"
            className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-4 py-6 text-center transition hover:border-[rgb(var(--color-brand-main))]"
          >
            <span className="text-base font-semibold text-[var(--color-text-primary)]">{file ? file.name : 'Choose lab document'}</span>
            <span className="mt-2 text-sm text-[var(--color-text-tertiary)]">{fileLabel}</span>
            <input
              ref={inputRef}
              id="lab-file"
              className="sr-only"
              type="file"
              accept={acceptedFileTypes}
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null)
                setError(null)
                setResult(null)
              }}
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-[rgb(var(--color-brand-main))] px-5 hover:bg-[rgb(var(--color-accent-green-600))]"
            >
              {isUploading ? 'Uploading...' : 'Upload lab'}
            </Button>
            <Button
              type="button"
              className="border border-[var(--color-border-primary)] bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-primary)]"
              onClick={() => inputRef.current?.click()}
            >
              Browse
            </Button>
          </div>
        </div>
      </Card>

      {error ? (
        <Alert title="Upload failed" tone="error">
          {error}
        </Alert>
      ) : null}

      {result ? (
        <Card className="bg-[var(--color-bg-tertiary)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{result.filename}</p>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">Parser: {result.parser}</p>
            </div>
            <Badge label={result.status.replace('_', ' ')} tone={result.status === 'parsed' ? 'success' : 'warning'} />
          </div>

          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3">
              <dt className="text-[var(--color-text-tertiary)]">Lab ID</dt>
              <dd className="mt-1 break-all font-medium text-[var(--color-text-primary)]">{result.lab_id}</dd>
            </div>
            <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3">
              <dt className="text-[var(--color-text-tertiary)]">Markers</dt>
              <dd className="mt-1 font-medium text-[var(--color-text-primary)]">{result.marker_count ?? 0}</dd>
            </div>
            <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3">
              <dt className="text-[var(--color-text-tertiary)]">Uploaded</dt>
              <dd className="mt-1 font-medium text-[var(--color-text-primary)]">
                {new Date(result.uploaded_at).toLocaleString()}
              </dd>
            </div>
          </dl>

          <Alert title="Safety note" tone="warning" className="mt-4">
            {result.disclaimer}
          </Alert>
        </Card>
      ) : null}
    </section>
  )
}
