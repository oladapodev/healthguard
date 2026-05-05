import { useCallback, useState } from 'react'

type UseClipboardReturnType = {
  copied: string | boolean
  copy: (text: string, id?: string) => Promise<{ success: boolean; error?: Error }>
}

const DEFAULT_TIMEOUT = 2000

export const useClipboard = (): UseClipboardReturnType => {
  const [copied, setCopied] = useState<string | boolean>(false)

  const fallback = (text: string, id?: string) => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-99999px'
      document.body.appendChild(textArea)
      textArea.select()

      const success = document.execCommand('copy')
      textArea.remove()

      if (success) {
        setCopied(id || true)
        setTimeout(() => setCopied(false), DEFAULT_TIMEOUT)
      }

      return success
        ? { success: true }
        : { success: false, error: new Error('execCommand returned false') }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Fallback copy failed'),
      }
    }
  }

  const copy = useCallback(async (text: string, id?: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(id || true)
        setTimeout(() => setCopied(false), DEFAULT_TIMEOUT)
        return { success: true }
      } catch {
        return fallback(text, id)
      }
    }

    return fallback(text, id)
  }, [])

  return { copied, copy }
}
