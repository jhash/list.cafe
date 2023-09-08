import { ChefHat, LayoutDashboard, LogOut } from 'lucide-react'

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
            title="Dashboard"
          >
            <LayoutDashboard size="1.25rem" />
          </Link>
          {hasRole(['ADMIN', 'SUPPORT']) && (
            <Link
              className="link font-semibold no-underline hover:underline"
              to={routes.admin()}
              title="Admin"
            >
              <ChefHat size="1.25rem" />
            </Link>
          )}
          <button
            className="btn btn-link p-0 text-base lowercase text-black no-underline dark:text-white"
            onClick={() =>
              window?.confirm('Are you sure you want to log out?') && logOut()
            }
            title="Log out"
          >
            <LogOut size="1.25rem" />
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
