import { cx } from '@/utils/cx'

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger'

type BadgeProps = {
  label: string
  tone?: BadgeTone
  className?: string
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border-[var(--color-border-secondary)]',
  success: 'bg-[var(--color-bg-success-primary)] text-[var(--color-text-success-primary)] border-[var(--color-border-brand)]',
  warning: 'bg-[var(--color-bg-warning-primary)] text-[var(--color-text-warning-primary)] border-[var(--color-border-brand_alt)]',
  danger: 'bg-[var(--color-bg-error-primary)] text-[var(--color-text-error-primary)] border-[var(--color-border-error)]',
}

export const Badge = ({ label, tone = 'neutral', className }: BadgeProps) => {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  )
}
