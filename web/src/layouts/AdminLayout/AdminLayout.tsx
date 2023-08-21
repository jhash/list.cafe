import React from 'react'

import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AdminSidebar from 'src/components/AdminSidebar/AdminSidebar'

import MainLayout from '../MainLayout/MainLayout'
import SidebarLayout from '../SidebarLayout/SidebarLayout'

const AdminLayout = ({ children }) => {
  const { loading, isAuthenticated, hasRole } = useAuth()

  if (loading) {
    return <MainLayout>Loading...</MainLayout>
  }

  if (!loading && (!isAuthenticated || !hasRole(['ADMIN', 'SUPPORT']))) {
    return <Redirect to={routes.home()} />
  }

  return <SidebarLayout sidebar={<AdminSidebar />}>{children}</SidebarLayout>
}

export default AdminLayout
