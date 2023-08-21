import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'

import HomeAuthLinks from 'src/components/HomeAuthLinks/HomeAuthLinks'
import HomeLink from 'src/components/HomeLink/HomeLink'
import { DarkModeToggle } from 'src/components/ThemeProvider'

import MainLayout from '../MainLayout/MainLayout'

const HomeLayout = ({ children }) => {
  return (
    <MainLayout>
      <nav className="flex h-16 flex-grow-0 items-center px-4">
        <HomeLink />
        <div className="flex select-none flex-nowrap items-center gap-3">
          <BrowserOnly>
            <HomeAuthLinks />
          </BrowserOnly>
        </div>
      </nav>
      <div className="flex flex-grow flex-col px-4">{children}</div>
      <footer className="flex h-16 flex-grow-0 flex-row-reverse items-center px-4">
        <DarkModeToggle />
      </footer>
    </MainLayout>
  )
}

export default HomeLayout
