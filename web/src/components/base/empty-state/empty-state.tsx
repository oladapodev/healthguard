type EmptyStateProps = {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = ({ title, message, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-6 text-center">
      <p className="text-base font-semibold text-[var(--color-text-primary)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{message}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center rounded-md border border-[var(--color-border-brand)] bg-[var(--color-bg-brand-solid)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-bg-brand-solid_hover)]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
