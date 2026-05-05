import { useMemo, useState } from 'react'
import { ActivityHeart, CheckCircle, File02, User01 } from '@untitledui/icons'

import { Alert } from '@/components/base/alerts/alert'
import { Badge } from '@/components/base/badges/badge'
import { Button } from '@/components/base/buttons/button'
import { Card } from '@/components/base/cards/card'
import { FileUpload } from '@/components/base/file-upload/file-upload'
import { Input } from '@/components/base/input/input'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  type LabDocumentUploadResponse,
  uploadLabDocumentApiV1LabsUploadPost,
} from '@/lib/generated/api-client.generated'
import { utilityClassExamples } from '@/lib/theme'

const acceptedFileTypes = '.pdf,.png,.jpg,.jpeg,.txt,.csv'

const steps = [
  { title: 'Profile', icon: User01 },
  { title: 'Upload', icon: File02 },
  { title: 'Review', icon: CheckCircle },
]

export function LabUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<LabDocumentUploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('prefer_not_to_say')
  const [cycleContext, setCycleContext] = useState(false)

  const activeStep = useMemo(() => {
    if (result) {
      return 2
    }

    if (file) {
      return 1
    }

    return 0
  }, [file, result])

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
    <section className={`${utilityClassExamples.appShell} space-y-6`}>
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] px-3 py-1 text-xs font-semibold text-[var(--color-text-tertiary)]">
            <ActivityHeart className="h-4 w-4 text-[rgb(var(--color-brand-main))]" />
            HealthGuard intake
          </div>
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Start with your lab result</h1>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-tertiary)]">
            Add the minimum context needed for safer interpretation, then upload the lab document.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <nav aria-label="Onboarding progress" className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index === activeStep
          const isDone = index < activeStep

          return (
            <div
              key={step.title}
              className={[
                'flex items-center gap-3 rounded-lg border px-3 py-3 text-sm',
                isActive || isDone
                  ? 'border-[rgb(var(--color-brand-main))] bg-[var(--color-bg-brand-primary)] text-[var(--color-text-primary)]'
                  : 'border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]',
              ].join(' ')}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-primary)]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-semibold">{step.title}</span>
            </div>
          )
        })}
      </nav>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="bg-[var(--color-bg-tertiary)]">
          <div className="space-y-5">
            <div>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">Patient context</p>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">Optional now, editable later.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Input
                label="Age"
                inputMode="numeric"
                value={age}
                placeholder="e.g. 34"
                onChange={(event) => setAge(event.target.value)}
                className="border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
              />

              <label className="block">
                <span className="mb-1 block text-sm text-[var(--color-text-secondary)]">Gender</span>
                <select
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className="w-full rounded-md border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[rgb(var(--color-brand-main))] focus:ring-2 focus:ring-[rgb(var(--color-brand-main)/0.16)]"
                >
                  <option value="prefer_not_to_say">Prefer not to say</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3">
              <input
                type="checkbox"
                checked={cycleContext}
                onChange={(event) => setCycleContext(event.target.checked)}
                className="mt-1 h-4 w-4 accent-[rgb(var(--color-brand-main))]"
              />
              <span>
                <span className="block text-sm font-medium text-[var(--color-text-primary)]">Include menstrual cycle context</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--color-text-tertiary)]">
                  Optional. Used only where relevant, such as iron or blood-count interpretation.
                </span>
              </span>
            </label>
          </div>
        </Card>

        <Card className="bg-[var(--color-bg-tertiary)]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">Lab document</p>
                <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">The parser accepts documents now; marker extraction comes next.</p>
              </div>
              <Badge label={file ? 'Ready' : 'Waiting'} tone={file ? 'success' : 'neutral'} />
            </div>

            <FileUpload accept={acceptedFileTypes} file={file} onFileChange={(nextFile) => {
              setFile(nextFile)
              setError(null)
              setResult(null)
            }} />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-[rgb(var(--color-brand-main))] px-5 hover:bg-[rgb(var(--color-accent-green-600))]"
              >
                {isUploading ? 'Uploading...' : 'Continue'}
              </Button>
              <span className="text-sm text-[var(--color-text-tertiary)]">PDF, image, CSV, and text files are supported.</span>
            </div>
          </div>
        </Card>
      </div>

      {error ? (
        <Alert title="Upload failed" tone="error">
          {error}
        </Alert>
      ) : null}

      {result ? (
        <Card className="bg-[var(--color-bg-tertiary)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">Upload received</p>
              <p className="mt-1 text-sm text-[var(--color-text-tertiary)]">{result.filename}</p>
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
