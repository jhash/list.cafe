import { MetaTags } from '@redwoodjs/web'

import DashboardPageTitle from 'src/components/DashboardPageTitle/DashboardPageTitle'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <DashboardPageTitle>Dashboard</DashboardPageTitle>
      <h2 className="font-serif text-lg font-semibold">Lists</h2>
      <h2 className="font-serif text-lg font-semibold">Groups</h2>
    </>
  )
}

export default DashboardPage
