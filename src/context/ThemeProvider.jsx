import { useEffect, useState } from 'react'
import { ThemeContext } from './themeContext'

const STORAGE_KEY = 'user-directory-theme'

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }, [dark])

  const toggleTheme = () => setDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
