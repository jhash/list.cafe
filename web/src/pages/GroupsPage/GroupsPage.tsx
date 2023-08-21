import { MetaTags } from '@redwoodjs/web'

import DashboardPageTitle from 'src/components/DashboardPageTitle/DashboardPageTitle'

const GroupsPage = () => {
  return (
    <>
      <MetaTags title="Groups" description="Groups page" />

      <DashboardPageTitle>Groups</DashboardPageTitle>
    </>
  )
}

export default GroupsPage
