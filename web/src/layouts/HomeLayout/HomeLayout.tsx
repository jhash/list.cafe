import { Suspense, lazy } from 'react'

import { Coffee, Globe2, MailQuestion } from 'lucide-react'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { NavLink, routes } from '@redwoodjs/router'

import HomeLink from 'src/components/HomeLink/HomeLink'
import Loading from 'src/components/Loading'
import { DarkModeToggle } from 'src/components/ThemeProvider'

import MainLayout from '../MainLayout/MainLayout'
const HomeAuthLinks = lazy(
  () => import('src/components/HomeAuthLinks/HomeAuthLinks')
)

const HomeLayout = ({ children }) => {
  return (
    <MainLayout>
      <nav className="min-h-16 flex max-h-16 w-full max-w-full flex-grow-0 items-center gap-x-3 px-4 py-2">
        <div className="flex flex-grow items-center gap-x-3">
          <HomeLink />
        </div>
        <div className="flex flex-shrink select-none flex-nowrap items-stretch justify-end gap-x-3 overflow-visible">
          <NavLink
            className="link flex items-center rounded-md font-semibold no-underline hover:underline"
            activeClassName="font-bold"
            to={routes.explore()}
            title="Explore"
          >
            <Globe2 size="1.25rem" />
          </NavLink>
          <BrowserOnly>
            <Suspense fallback={<Loading />}>
              <HomeAuthLinks />
            </Suspense>
          </BrowserOnly>
        </div>
      </nav>
      <div className="flex w-full max-w-full flex-grow flex-col px-4 py-8">
        {children}
      </div>
      <footer className="flex h-16 flex-shrink-0 flex-grow-0 items-center px-4">
        <div className="flex flex-grow items-center gap-3">
          <NavLink
            to={routes.contact()}
            className="link flex items-center rounded-md font-semibold no-underline hover:underline"
            activeClassName="font-bold"
            title="Contact us"
          >
            <MailQuestion size="1.25rem" />
          </NavLink>
          <NavLink
            to={routes.about()}
            className="link flex items-center rounded-md font-semibold no-underline hover:underline"
            activeClassName="font-bold"
            title="About list.cafe"
          >
            <Coffee size="1.25rem" />
          </NavLink>
        </div>
        <DarkModeToggle />
      </footer>
    </MainLayout>
  )
}

export default HomeLayout
