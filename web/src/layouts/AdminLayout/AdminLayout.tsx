import React from 'react'

import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AdminSidebar from 'src/components/AdminSidebar/AdminSidebar'

import LoadingLayout from '../LoadingLayout/LoadingLayout'
import SidebarLayout from '../SidebarLayout/SidebarLayout'

const AdminLayout = ({ children }) => {
  const { loading, isAuthenticated, hasRole } = useAuth()

  if (loading) {
    return <LoadingLayout />
  }

  if (!loading && (!isAuthenticated || !hasRole(['ADMIN', 'SUPPORT']))) {
    return <Redirect to={routes.home()} options={{ replace: true }} />
  }

  return <SidebarLayout Sidebar={AdminSidebar}>{children}</SidebarLayout>
}

export default AdminLayout
