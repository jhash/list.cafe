import classNames from 'classnames'
import { LucideIcon } from 'lucide-react'

import { NavLink } from '@redwoodjs/router'

import { SidebarProps } from '../../layouts/SidebarLayout/SidebarLayout'

export interface SidebarLink {
  name: string
  Icon: LucideIcon
  path: string
}

type SidebarTypeProps = SidebarProps & {
  links: SidebarLink[]
}

const Sidebar: React.FC<SidebarTypeProps> = ({ links }) => {
  return (
    <ul className={classNames('flex flex-grow flex-col gap-y-0.5 px-0.5')}>
      {links.map(({ path, name, Icon }, index) => (
        <NavLink
          to={path}
          key={path || index}
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
