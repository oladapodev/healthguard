import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'

type CardProps = {
  title?: string
  description?: string
  className?: string
  children?: ReactNode
}

export const Card = ({ title, description, className, children }: CardProps) => {
  return (
    <section
      className={cx(
        'rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] p-4 shadow-sm',
        className,
      )}
    >
      {title ? <p className="text-base font-semibold text-[var(--color-text-primary)]">{title}</p> : null}
      {description ? <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p> : null}
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  )
}
