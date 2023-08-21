import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HomeAuthLinks = () => {
  const { isAuthenticated, logOut, hasRole, loading } = useAuth()

  if (loading) {
    return null
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link
            className="link font-semibold no-underline hover:underline"
            to={routes.dashboard()}
          >
            dashboard
          </Link>
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
    </>
  )
}

export default HomeAuthLinks
