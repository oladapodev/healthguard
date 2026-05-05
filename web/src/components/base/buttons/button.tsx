import { type ButtonHTMLAttributes, type FC } from 'react'
import { cx } from '@/utils/cx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeading?: FC
}

export const Button = ({ className, children, iconLeading: Icon, ...props }: ButtonProps) => {
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className="mr-2 h-4 w-4" /> : null}
      {children}
    </button>
  )
}
