import { MetaTags } from '@redwoodjs/web'

import DashboardPageTitle from 'src/components/DashboardPageTitle/DashboardPageTitle'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <DashboardPageTitle>Profile</DashboardPageTitle>
    </>
  )
}

export default ProfilePage
