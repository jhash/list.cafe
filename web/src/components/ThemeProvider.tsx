import { createContext, useContext, useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'

import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'

export const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const browser = useIsBrowser()

  const [darkMode, setDarkMode] = useState<boolean>(
    browser && localStorage?.getItem('theme') === 'dracula'
  )

  useEffect(() => {
    if (
      browser &&
      !localStorage?.getItem('theme') &&
      !!window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!browser) {
      return
    }

    if (darkMode) {
      document?.documentElement?.setAttribute('data-theme', 'dracula')
      localStorage?.setItem('theme', 'dracula')
      document?.documentElement?.classList?.add('dark')
    } else {
      document?.documentElement?.setAttribute('data-theme', 'cupcake')
      localStorage?.setItem('theme', 'cupcake')
      document?.documentElement?.classList?.remove('dark')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext) || {}

  return (
    <div className="flex flex-nowrap items-center gap-1">
      <Sun size="1rem" />
      <input
        className="toggle"
        type="checkbox"
        checked={darkMode}
        onChange={() => {
          // themeChange(true)
          setDarkMode(!darkMode)
        }}
      />
      <Moon size="1rem" />
    </div>
  )
}
