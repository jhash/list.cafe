import { NavLink, Link, routes } from '@redwoodjs/router'

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
          <NavLink
            className="link font-semibold no-underline hover:underline"
            activeClassName="font-bold"
            to={routes.login()}
          >
            log in
          </NavLink>
          <NavLink
            className="link font-semibold no-underline hover:underline"
            activeClassName="font-bold"
            to={routes.signup()}
          >
            sign up
          </NavLink>
        </>
      )}
    </>
  )
}

export default HomeAuthLinks
