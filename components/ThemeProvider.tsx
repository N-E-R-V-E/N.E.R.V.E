'use client'

import { useEffect } from 'react'

// Apply theme instantly before paint to prevent flash
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply theme on hydration (in case script didn't run)
    const initTheme = () => {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const theme = stored || (prefersDark ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', theme)

      // Update icon
      updateThemeIcon(theme)
    }

    const updateThemeIcon = (theme: string) => {
      const icon = document.getElementById('themeIcon')
      if (!icon) return
      if (theme === 'dark') {
        // Moon icon
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      } else {
        // Sun icon
        icon.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'
      }
    }

    const toggleTheme = () => {
      const current = document.documentElement.getAttribute('data-theme')
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      updateThemeIcon(next)
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if no stored theme
      const stored = localStorage.getItem('theme')
      if (!stored) {
        const theme = e.matches ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
        updateThemeIcon(theme)
      }
    }

    initTheme()

    const themeBtn = document.getElementById('themeBtn')
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme)
    }

    // Use addEventListener for better compatibility
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      if (themeBtn) {
        themeBtn.removeEventListener('click', toggleTheme)
      }
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  return (
    <>
      {/* Inline script runs synchronously before any paint - prevents theme flash */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </>
  )
}
