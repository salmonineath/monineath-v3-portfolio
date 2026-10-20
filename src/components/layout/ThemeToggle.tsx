'use client'

import { Moon, Sun } from 'lucide-react'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

function toggleTheme() {
  const root = document.documentElement
  const nextTheme: Theme = root.dataset.theme === 'light' ? 'dark' : 'light'
  root.dataset.theme = nextTheme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
}

/**
 * The theme lives on `<html data-theme>`, so the icon is switched with CSS
 * rather than React state. That keeps server and client markup identical.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="grid size-10 place-items-center rounded-full border border-line bg-surface-raised text-fg-muted transition-colors hover:text-fg sm:size-9"
    >
      <Moon className="size-4 dark:block hidden" aria-hidden="true" />
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  )
}
