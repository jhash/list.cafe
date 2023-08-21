import { MetaTags } from '@redwoodjs/web'

import DashboardPageTitle from 'src/components/DashboardPageTitle/DashboardPageTitle'

const ListsPage = () => {
  return (
    <>
      <MetaTags title="Lists" description="Lists page" />

      <DashboardPageTitle>Lists</DashboardPageTitle>
    </>
  )
}

export default ListsPage
