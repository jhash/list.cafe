import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage?.getItem('theme') === 'dracula'
  )

  useEffect(() => {
    if (
      !localStorage?.getItem('theme') &&
      !!window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ) {
      document?.documentElement?.setAttribute('data-theme', 'dracula')
      setDarkMode(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-nowrap items-center gap-1">
      <Sun size="1rem" />
      <button data-toggle-theme="dracula,cupcake" className="flex items-center">
        <input
          className="toggle"
          type="checkbox"
          checked={darkMode}
          onChange={() => {
            // themeChange(true)
            setDarkMode(!darkMode)
          }}
        />
      </button>
      <Moon size="1rem" />
    </div>
  )
}
