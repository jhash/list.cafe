import classNames from 'classnames'
import { LucideIcon, PlusCircle } from 'lucide-react'

import { Link, NavLink } from '@redwoodjs/router'

import { SidebarProps } from '../../layouts/SidebarLayout/SidebarLayout'

export interface SidebarLink {
  name: string
  Icon: LucideIcon
  path: string
  toNewUrl?: string
}

type SidebarTypeProps = SidebarProps & {
  links: SidebarLink[]
}

const Sidebar: React.FC<SidebarTypeProps> = ({ links }) => {
  return (
    <ul className={classNames('flex flex-grow flex-col gap-y-0.5 px-0.5')}>
      {links.map(({ path, name, Icon, toNewUrl }, index) => (
        <NavLink
          to={path}
          key={path || index}
          className="dashboard__sidebar__link flex h-9 flex-nowrap items-center gap-x-3.5 whitespace-nowrap rounded-sm px-3"
          activeClassName="dashboard__sidebar__link--active"
        >
          <Icon size={'1.25rem'} />
          <span className="flex-grow">{name}</span>
          {!!toNewUrl && (
            <Link
              className="btn btn-secondary flex h-6 min-h-0 w-6 flex-grow-0 items-center justify-center rounded-full p-0"
              to={toNewUrl}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            >
              <PlusCircle size="0.85rem" />
            </Link>
          )}
        </NavLink>
      ))}
    </ul>
  )
}

export default Sidebar
