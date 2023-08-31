import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import NewList from 'src/components/NewList/NewList'
import DashboardListLayout from 'src/layouts/DashboardListLayout/DashboardListLayout'
import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

const ListDraftPage = () => {
  const { isAuthenticated } = useAuth()

  if (!window?.localStorage.getItem('listDraft')) {
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
      <HomeContainerLayout>
        <DashboardListLayout Child={NewList} />
      </HomeContainerLayout>
    </>
  )
}

export default ListDraftPage
