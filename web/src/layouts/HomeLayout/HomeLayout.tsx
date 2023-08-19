import classNames from 'classnames'
import { Coffee } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { DarkModeToggle } from 'src/components/DarkModeToggle'
import { useFontFacesLoaded } from 'src/hooks/useFontFacesLoaded'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const fontsLoaded = useFontFacesLoaded()

  const { isAuthenticated, logOut, hasRole } = useAuth()

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
          {isAuthenticated ? (
            <>
              {hasRole(['ADMIN', 'SUPPORT']) && (
                <Link
                  className="link font-semibold no-underline hover:underline"
                  to={routes.admin()}
                >
                  admin
                </Link>
              )}
              <button
                className="btn btn-link p-0 text-base lowercase text-black no-underline dark:text-white"
                onClick={() => logOut()}
              >
                log out
              </button>
            </>
          ) : (
            <>
              <Link
                className="link font-semibold no-underline hover:underline"
                to={routes.login()}
              >
                log in
              </Link>
              <Link
                className="link font-semibold no-underline hover:underline"
                to={routes.signup()}
              >
                sign up
              </Link>
            </>
          )}
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
