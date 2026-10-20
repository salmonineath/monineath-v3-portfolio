import { useTheme } from '../../hooks/useTheme'
import { Icon } from '../ui/Icon'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="grid size-9 place-items-center rounded-full border border-line bg-surface-raised text-fg-muted transition-colors hover:text-fg"
    >
      <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
    </button>
  )
}
