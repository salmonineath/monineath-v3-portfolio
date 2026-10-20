import { useCallback, useState } from 'react'

type Theme = 'dark' | 'light'

/** Keep in sync with the pre-paint script in index.html. */
const STORAGE_KEY = 'theme'

function readCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/**
 * The theme lives on `<html data-theme>` so CSS tokens switch without
 * re-rendering the tree. This hook mirrors it for the toggle button.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readCurrentTheme)

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = readCurrentTheme() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
    setTheme(nextTheme)
  }, [])

  return { theme, toggleTheme }
}
