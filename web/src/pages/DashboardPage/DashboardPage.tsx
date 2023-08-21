import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <PageTitle>Dashboard</PageTitle>
      <h2 className="font-serif text-lg font-semibold">Lists</h2>
      <h2 className="font-serif text-lg font-semibold">Groups</h2>
    </>
  )
}

export default DashboardPage
