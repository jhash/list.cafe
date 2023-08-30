import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import DashboardList from 'src/components/DashboardList/DashboardList'

const ListDraftPage = () => {
  const { isAuthenticated } = useAuth()

  if (!window.localStorage.getItem('listDraft')) {
    return <Redirect to={routes.home()} />
  }

  if (isAuthenticated) {
    return <Redirect to={routes.newList()} />
  }

  return (
    <div className="flex w-full max-w-full flex-grow flex-col items-center">
      <div className="container flex w-full flex-grow flex-col">
        <DashboardList />
      </div>
    </div>
  )
}

export default ListDraftPage
