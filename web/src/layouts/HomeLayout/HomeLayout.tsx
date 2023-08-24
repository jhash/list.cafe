import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'

import HomeAuthLinks from 'src/components/HomeAuthLinks/HomeAuthLinks'
import HomeLink from 'src/components/HomeLink/HomeLink'
import { DarkModeToggle } from 'src/components/ThemeProvider'

import MainLayout from '../MainLayout/MainLayout'

const HomeLayout = ({ children }) => {
  return (
    <MainLayout>
      <nav className="min-h-16 flex w-full max-w-full flex-grow-0 items-center px-4 py-2">
        <HomeLink />
        <div className="flex flex-shrink select-none flex-wrap items-center justify-end gap-x-3 sm:flex-nowrap">
          <BrowserOnly>
            <HomeAuthLinks />
          </BrowserOnly>
        </div>
      </nav>
      <div className="flex w-full max-w-full flex-grow flex-col p-4">
        {children}
      </div>
      <footer className="flex h-16 flex-grow-0 flex-row-reverse items-center px-4">
        <DarkModeToggle />
      </footer>
    </MainLayout>
  )
}

export default HomeLayout
