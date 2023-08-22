import React from 'react'

import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import DashboardSidebar from 'src/components/DashboardSidebar/DashboardSidebar'

import MainLayout from '../MainLayout/MainLayout'
import SidebarLayout from '../SidebarLayout/SidebarLayout'

const DashboardLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return <MainLayout>Loading...</MainLayout>
  }

  if (!loading && !isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  return <SidebarLayout Sidebar={DashboardSidebar}>{children}</SidebarLayout>
}

export default DashboardLayout
