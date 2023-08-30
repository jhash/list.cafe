import { HTMLProps } from 'react'

import classNames from 'classnames'

import { NavLink } from '@redwoodjs/router'

import { SidebarLink } from '../Sidebar/Sidebar'

type TabsProps = HTMLProps<HTMLDivElement> & {
  links: SidebarLink[]
}
const Tabs: React.FC<TabsProps> = ({ links, className }) => {
  return (
    <div className={classNames('tabs flex items-end py-2', className)}>
      <div
        className="flex flex-shrink border-b-2 border-gray-200 dark:border-b dark:border-black sm:w-1
      "
      />
      {links.map(({ path, name }, index) => (
        <NavLink
          className="tab tab-lifted flex flex-nowrap items-center gap-x-3.5 whitespace-nowrap px-3 font-semibold dark:font-medium"
          activeClassName="tab-active"
          to={path}
          key={index}
        >
          {name}
        </NavLink>
      ))}
      <div
        className="flex flex-shrink flex-grow border-b-2 border-gray-200 dark:border-b dark:border-black sm:w-12
      "
      />
    </div>
  )
}

export default Tabs
