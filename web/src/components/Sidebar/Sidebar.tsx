import { LucideIcon } from 'lucide-react'

import { NavLink } from '@redwoodjs/router'

export interface SidebarLink {
  name: string
  Icon: LucideIcon
  path: string
}

interface SidebarProps {
  links: SidebarLink[]
}

const Sidebar = ({ links }: SidebarProps) => {
  return (
    <ul className="flex flex-col gap-y-0.5 px-0.5">
      {links.map(({ path, name, Icon }, index) => (
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
  )
}

export default Sidebar
