import './DashboardLayout.scss'

import { LayoutDashboardIcon, List, Settings, User, Users } from 'lucide-react'

import { NavLink, Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import HomeLink from 'src/components/HomeLink/HomeLink'

import MainLayout from '../MainLayout/MainLayout'

const DashboardLayout = ({ children }) => {
  const LINKS = [
    {
      name: 'Dashboard',
      Icon: LayoutDashboardIcon,
      path: routes.dashboard(),
    },
    {
      name: 'Lists',
      Icon: List,
      path: routes.lists(),
    },
    {
      name: 'Groups',
      Icon: Users,
      path: routes.groups(),
    },
    {
      name: 'Profile',
      Icon: User,
      path: routes.profile(),
    },
    {
      name: 'Settings',
      Icon: Settings,
      path: routes.settings(),
    },
  ]

  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <MainLayout>Loading...</MainLayout>
  }

  if (!loading && !isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  return (
    <MainLayout>
      <div className="flex flex-grow divide-x">
        <div className="flex w-52 flex-shrink-0 flex-grow-0 flex-col gap-y-2">
          <div className="flex h-16 flex-grow-0 items-center justify-start px-4">
            <HomeLink />
          </div>
          <ul className="flex flex-col gap-y-0.5 px-0.5">
            {LINKS.map(({ path, name, Icon }, index) => (
              <NavLink
                to={path}
                key={index}
                className="dashboard__sidebar__link flex h-9 flex-nowrap items-center gap-x-3.5 whitespace-nowrap rounded-sm px-3"
                activeClassName="dashboard__sidebar__link--active"
              >
                <Icon size={'1.25rem'} />
                <span>{name}</span>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex flex-grow flex-col gap-y-2 px-4">{children}</div>
      </div>
    </MainLayout>
  )
}

export default DashboardLayout
