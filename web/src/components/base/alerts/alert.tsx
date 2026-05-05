import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

type AlertTone = 'info' | 'success' | 'warning' | 'error'

type AlertProps = {
  title: string
  children?: ReactNode
  tone?: AlertTone
  className?: string
}

const toneClasses: Record<AlertTone, string> = {
  info: 'border-blue-200/80 bg-blue-50 text-blue-900',
  success: 'border-emerald-200/80 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-200/80 bg-amber-50 text-amber-900',
  error: 'border-red-200/80 bg-red-50 text-red-900',
}

export const Alert = ({ title, children, tone = 'info', className }: AlertProps) => {
  return (
    <div
      role="status"
      className={cx(
        'rounded-lg border px-4 py-3 text-sm',
        toneClasses[tone],
        className,
      )}
    >
      <p className="mb-1 font-semibold">{title}</p>
      {children ? <div className="text-sm/6 text-black/80">{children}</div> : null}
    </div>
  )
}
