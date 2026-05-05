import { type ChangeEvent, type DragEvent, useId, useRef, useState } from 'react'
import { File02, UploadCloud01 } from '@untitledui/icons'

import { Button } from '@/components/base/buttons/button'
import { cx } from '@/utils/cx'

type FileUploadProps = {
  accept?: string
  disabled?: boolean
  file?: File | null
  helperText?: string
  label?: string
  onFileChange: (file: File | null) => void
}

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export const FileUpload = ({
  accept,
  disabled = false,
  file,
  helperText = 'PDF, PNG, JPG, CSV, or text file',
  label = 'Upload lab document',
  onFileChange,
}: FileUploadProps) => {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] ?? null)
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragging(false)

    if (disabled) {
      return
    }

    onFileChange(event.dataTransfer.files?.[0] ?? null)
  }

  return (
    <div className="space-y-3">
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cx(
          'group flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-6 py-8 text-center transition',
          'border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]',
          'hover:border-[rgb(var(--color-brand-main))] hover:bg-[var(--color-bg-secondary)]',
          isDragging && 'border-[rgb(var(--color-brand-main))] ring-4 ring-[rgb(var(--color-brand-main)/0.12)]',
          disabled && 'cursor-not-allowed opacity-60',
        )}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-secondary)] bg-[var(--color-bg-tertiary)] text-[rgb(var(--color-brand-main))]">
          {file ? <File02 className="h-5 w-5" /> : <UploadCloud01 className="h-5 w-5" />}
        </span>
        <span className="mt-4 text-sm font-semibold text-[var(--color-text-primary)]">
          {file ? file.name : label}
        </span>
        <span className="mt-1 text-sm text-[var(--color-text-tertiary)]">
          {file ? `${file.type || 'Unknown type'} · ${formatFileSize(file.size)}` : helperText}
        </span>
        <span className="mt-3 text-xs font-medium text-[rgb(var(--color-brand-main))]">
          Click to browse or drag and drop
        </span>
        <input
          ref={inputRef}
          id={inputId}
          className="sr-only"
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleFileInput}
        />
      </label>

      {file ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">{file.name}</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">{formatFileSize(file.size)}</p>
          </div>
          <Button
            type="button"
            className="border border-[var(--color-border-primary)] bg-transparent px-3 py-1.5 text-xs text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
            onClick={() => {
              onFileChange(null)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
          >
            Remove
          </Button>
        </div>
      ) : null}
    </div>
  )
}
