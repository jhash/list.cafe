import { ChefHat } from 'lucide-react'

import { routes } from '@redwoodjs/router'

import { SidebarType } from 'src/layouts/SidebarLayout/SidebarLayout'

import Sidebar from '../Sidebar/Sidebar'

const AdminSidebar: SidebarType = (props) => (
  <Sidebar
    {...props}
    links={[
      {
        name: 'Admin',
        Icon: ChefHat,
        path: routes.admin(),
      },
    ]}
  />
)

export default AdminSidebar
