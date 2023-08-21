import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <PageTitle>Profile</PageTitle>
    </>
  )
}

export default ProfilePage
