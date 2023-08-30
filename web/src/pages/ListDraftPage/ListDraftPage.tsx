import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import NewList from 'src/components/NewList/NewList'
import DashboardListLayout from 'src/layouts/DashboardListLayout/DashboardListLayout'

const ListDraftPage = () => {
  const { isAuthenticated } = useAuth()

  if (!window.localStorage.getItem('listDraft')) {
    return <Redirect to={routes.home()} />
  }

  if (isAuthenticated) {
    return <Redirect to={routes.newList()} />
  }

  return (
    <>
      <MetaTags
        title={'Finish your list'}
        description={'Finish setting up your new list'}
      />
      <div className="flex w-full max-w-full flex-grow flex-col items-center">
        <div className="container flex w-full flex-grow flex-col">
          <DashboardListLayout Child={NewList} />
        </div>
      </div>
    </>
  )
}

export default ListDraftPage
