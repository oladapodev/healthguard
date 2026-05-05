export const tokens = {
  brand: {
    mainBlue: '#0F766E',
    accentGreen: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    softBackground: '#F8FAFC',
    neutralGray: '#64748B',
  },
  // Tailwind utility token mirrors for direct class composition
  twColorTuples: {
    brand: '15 118 110',
    accentGreen: '16 185 129',
    warning: '245 158 11',
    danger: '239 68 68',
    softBackground: '248 250 252',
    neutralGray: '100 116 139',
    neutral900: '15 23 42',
  },
  spacing: {
    containerMaxWidth: '1280px',
  },
} as const

export const semanticPalette = {
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    success: 'var(--color-text-success-primary)',
    warning: 'var(--color-text-warning-primary)',
    danger: 'var(--color-text-error-primary)',
  },
  bg: {
    page: 'var(--color-bg-primary)',
    surface: 'var(--color-bg-tertiary)',
    success: 'var(--color-bg-success-primary)',
    warning: 'var(--color-bg-warning-primary)',
    danger: 'var(--color-bg-error-primary)',
  },
  border: {
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    brand: 'var(--color-border-brand)',
    error: 'var(--color-border-error)',
  },
} as const

export const utilityClassExamples = {
  appShell: 'min-h-screen bg-[var(--color-bg-primary)] px-4 py-6 text-[var(--color-text-primary)]',
  card: 'rounded-2xl border border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)] p-4 shadow-sm',
  sectionTitle: 'text-[1.1rem] font-semibold leading-tight tracking-tight',
  panelMuted: 'rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] px-4 py-3',
  successBadge: 'inline-flex items-center rounded-full bg-[var(--color-bg-success-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-success-primary)]',
  warningBadge: 'inline-flex items-center rounded-full bg-[var(--color-bg-warning-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-warning-primary)]',
  dangerBadge: 'inline-flex items-center rounded-full bg-[var(--color-bg-error-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-error-primary)]',
  link: 'text-[var(--color-fg-brand-primary)] underline-offset-2 hover:underline',
} as const

export const statusToneClass = (tone: 'normal' | 'attention' | 'urgent') => {
  if (tone === 'normal') {
    return 'text-emerald-700 bg-emerald-50 border-emerald-200'
  }

  if (tone === 'attention') {
    return 'text-amber-700 bg-amber-50 border-amber-200'
  }

  return 'text-red-700 bg-red-50 border-red-200'
}

export const utilityStyleExamples = {
  appShell: {
    backgroundColor: 'var(--color-bg-primary)',
    color: 'var(--color-text-primary)',
  },
  card: {
    backgroundColor: 'var(--color-bg-tertiary)',
    borderColor: 'var(--color-border-primary)',
    color: 'var(--color-text-primary)',
  },
  mutedSurface: {
    backgroundColor: 'var(--color-bg-tertiary)',
    borderColor: 'var(--color-border-secondary)',
    color: 'var(--color-text-secondary)',
  },
  sectionTitle: {
    color: 'var(--color-text-primary)',
  },
} as const

export const cardTokens = {
  containerClass: `${utilityClassExamples.card} space-y-3`,
  mutedSurfaceClass: `${utilityClassExamples.panelMuted} space-y-2`,
  sectionHeaderClass: `${utilityClassExamples.sectionTitle} flex items-center justify-between`,
} as const
