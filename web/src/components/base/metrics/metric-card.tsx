import type { ReactNode } from 'react'
import { Badge } from '@/components/base/badges/badge'
import { Card } from '@/components/base/cards/card'

type Tone = 'normal' | 'attention' | 'urgent'

type MetricCardProps = {
  title: string
  value: string
  unit?: string
  status?: Tone
  helperText?: string
  icon?: ReactNode
}

const statusToneText: Record<Tone, string> = {
  normal: 'normal',
  attention: 'attention',
  urgent: 'urgent',
}

export const MetricCard = ({ title, value, unit, status = 'normal', helperText, icon }: MetricCardProps) => {
  return (
    <Card title={title}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
            {value}
            {unit ? <span className="text-sm text-[var(--color-text-tertiary)]"> {unit}</span> : null}
          </p>
          {helperText ? <p className="mt-2 text-sm text-[var(--color-text-tertiary)]">{helperText}</p> : null}
        </div>
        <div>{icon}</div>
      </div>
      <Badge label={statusToneText[status]} tone={status === 'normal' ? 'success' : status === 'attention' ? 'warning' : 'danger'} />
    </Card>
  )
}
