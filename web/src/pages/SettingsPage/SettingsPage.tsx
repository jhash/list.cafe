import { MetaTags } from '@redwoodjs/web'

import DashboardPageTitle from 'src/components/DashboardPageTitle/DashboardPageTitle'
import { DarkModeToggle } from 'src/components/ThemeProvider'

const SettingsPage = () => {
  const SETTINGS = [
    {
      name: 'Dark mode',
      Component: DarkModeToggle,
    },
  ]
  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      <DashboardPageTitle>Settings</DashboardPageTitle>
      <div className="flex flex-grow flex-col">
        <ul>
          {SETTINGS.map(({ name, Component }, index) => (
            <li
              key={index}
              className="flex h-9 items-center gap-x-5 font-medium"
            >
              {name}
              <Component />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SettingsPage
