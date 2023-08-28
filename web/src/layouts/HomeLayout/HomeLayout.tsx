import { Suspense, lazy } from 'react'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'

const HomeAuthLinks = lazy(
  () => import('src/components/HomeAuthLinks/HomeAuthLinks')
)
import HomeLink from 'src/components/HomeLink/HomeLink'
import Loading from 'src/components/Loading'
import { DarkModeToggle } from 'src/components/ThemeProvider'

import MainLayout from '../MainLayout/MainLayout'

const HomeLayout = ({ children }) => {
  return (
    <MainLayout>
      <nav className="min-h-16 flex w-full max-w-full flex-grow-0 items-center px-4 py-2">
        <HomeLink />
        <div className="flex flex-shrink select-none flex-wrap items-center justify-end gap-x-3 sm:flex-nowrap">
          <BrowserOnly>
            <Suspense fallback={<Loading />}>
              <HomeAuthLinks />
            </Suspense>
          </BrowserOnly>
        </div>
      </nav>
      <div className="flex w-full max-w-full flex-grow flex-col p-4">
        {children}
      </div>
      <footer className="flex h-16 flex-shrink-0 flex-grow-0 flex-row-reverse items-center px-4">
        <DarkModeToggle />
      </footer>
    </MainLayout>
  )
}

export default HomeLayout
