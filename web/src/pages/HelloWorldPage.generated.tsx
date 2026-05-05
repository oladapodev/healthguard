// Auto-generated from FastAPI OpenAPI schema.
// Do not edit directly; run: python3 scripts/generate_hello_frontend.py

import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/base/buttons/button'
import { cardTokens, statusToneClass, utilityClassExamples, utilityStyleExamples } from '@/lib/theme'
import { ThemeToggle } from '@/components/theme-toggle'
import { helloWorldApiV1HelloGet, type HelloWorldResponse } from '@/lib/generated/api-client.generated'
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
      const value = await helloWorldApiV1HelloGet()
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
