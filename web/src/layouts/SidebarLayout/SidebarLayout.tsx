import './SidebarLayout.scss'

import React from 'react'

import HomeLink from 'src/components/HomeLink/HomeLink'

import MainLayout from '../MainLayout/MainLayout'

type SidebarLayoutProps = React.HTMLProps<HTMLDivElement> & {
  sidebar: React.ReactNode
}
const SidebarLayout = ({ children, sidebar }: SidebarLayoutProps) => {
  return (
    <MainLayout>
      <div className="flex flex-grow divide-x">
        <div className="flex w-52 flex-shrink-0 flex-grow-0 flex-col gap-y-2">
          <div className="flex h-16 flex-grow-0 items-center justify-start px-4">
            <HomeLink />
          </div>
          {sidebar}
        </div>
        <div className="flex flex-grow flex-col gap-y-2 px-4">{children}</div>
      </div>
    </MainLayout>
  )
}

export default SidebarLayout
