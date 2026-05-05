import { Button } from '@/components/base/buttons/button'
import { Moon01, Sun } from '@untitledui/icons'
import { useTheme } from '@/providers/theme-provider'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      aria-label="Toggle theme"
      className="h-8 w-8 p-0"
      iconLeading={theme === 'light' ? Moon01 : Sun}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      type="button"
    />
  )
}
