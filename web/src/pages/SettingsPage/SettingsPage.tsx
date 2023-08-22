import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PageTitle from 'src/components/PageTitle/PageTitle'
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
      <PageTitle>Settings</PageTitle>
      <ul>
        {SETTINGS.map(({ name, Component }, index) => (
          <li key={index} className="flex h-9 items-center gap-x-5 font-medium">
            {name}
            <Component />
          </li>
        ))}
      </ul>
      <ListFadeOut />
    </>
  )
}

export default SettingsPage
