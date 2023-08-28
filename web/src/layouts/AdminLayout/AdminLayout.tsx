import React from 'react'

import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AdminSidebar from 'src/components/AdminSidebar/AdminSidebar'

import SidebarLayout from '../SidebarLayout/SidebarLayout'
import LoadingLayout from '../LoadingLayout/LoadingLayout';

const AdminLayout = ({ children }) => {
  const { loading, isAuthenticated, hasRole } = useAuth()

  if (loading) {
    return <LoadingLayout />
  }

  if (!loading && (!isAuthenticated || !hasRole(['ADMIN', 'SUPPORT']))) {
    return <Redirect to={routes.home()} />
  }

  return <SidebarLayout Sidebar={AdminSidebar}>{children}</SidebarLayout>
}

export default AdminLayout
