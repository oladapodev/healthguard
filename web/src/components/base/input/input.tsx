import { useId, type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = ({ label, className, id, ...props }: InputProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label htmlFor={inputId} className="mb-2 block">
      {label ? <span className="mb-1 block text-sm text-slate-700">{label}</span> : null}
      <input
        id={inputId}
        className={
          [
            'w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
            className,
          ].join(' ')
        }
        {...props}
      />
    </label>
  )
}
