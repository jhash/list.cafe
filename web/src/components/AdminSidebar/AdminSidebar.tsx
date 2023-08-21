import { LayoutDashboardIcon } from 'lucide-react'

import { routes } from '@redwoodjs/router'

import Sidebar from '../Sidebar/Sidebar'

const AdminSidebar = () => {
  return (
    <Sidebar
      links={[
        {
          name: 'Admin',
          Icon: LayoutDashboardIcon,
          path: routes.admin(),
        },
      ]}
    />
  )
}

export default AdminSidebar
