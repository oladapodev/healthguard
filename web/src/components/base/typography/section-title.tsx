import type { ReactNode } from 'react'

type SectionTitleProps = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => {
  return (
    <header className="space-y-1">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h2>
      {subtitle ? <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p> : null}
    </header>
  )
}

export const DisplayTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{children}</h1>
}
