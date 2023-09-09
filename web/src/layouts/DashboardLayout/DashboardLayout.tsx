import React from 'react'

import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import DashboardSidebar from 'src/components/DashboardSidebar/DashboardSidebar'

import LoadingLayout from '../LoadingLayout/LoadingLayout'
import SidebarLayout from '../SidebarLayout/SidebarLayout'

export const DashboardLoading = () => <DashboardLayout skeleton />

type DashboardLayoutProps = {
  skeleton?: boolean
  children?: React.ReactNode
}
const DashboardLayout = ({ children, skeleton }: DashboardLayoutProps) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading && !skeleton) {
    return <LoadingLayout />
  }

  if (!loading && !isAuthenticated && !skeleton) {
    return <Redirect to={routes.home()} options={{ replace: true }} />
  }

  return (
    <SidebarLayout skeleton={skeleton} Sidebar={DashboardSidebar}>
      {children}
    </SidebarLayout>
  )
}

export default DashboardLayout
