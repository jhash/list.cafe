import classNames from 'classnames'
import { Coffee } from 'lucide-react'

import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { Link } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { DarkModeToggle } from 'src/components/DarkModeToggle'
import HomeAuthLinks from 'src/components/HomeAuthLinks/HomeAuthLinks'
import { useFontFacesLoaded } from 'src/hooks/useFontFacesLoaded'

const HomeLayout = ({ children }) => {
  const fontsLoaded = useFontFacesLoaded()

  return (
    <main
      className={classNames(
        'flex h-full min-h-full w-full max-w-full flex-grow flex-col overflow-x-hidden transition-opacity duration-500 ease-in',
        fontsLoaded ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000 }} />
      <nav className="flex h-16 flex-grow-0 items-center px-4">
        <Link
          to="/"
          className="flex flex-grow select-none flex-nowrap items-center gap-3"
        >
          <h1 className="font-bricolageGrotesque text-3xl">list.cafe</h1>
          <Coffee />
        </Link>
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
    </main>
  )
}

export default HomeLayout
