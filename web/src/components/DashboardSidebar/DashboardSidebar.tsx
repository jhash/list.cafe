import { LayoutDashboardIcon, List, Settings, User, Users } from 'lucide-react'

import { routes } from '@redwoodjs/router'

import Sidebar from '../Sidebar/Sidebar'

const DashboardSidebar = () => {
  return (
    <Sidebar
      links={[
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
      ]}
    />
  )
}

export default DashboardSidebar
