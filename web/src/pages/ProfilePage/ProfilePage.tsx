import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PageTitle from 'src/components/PageTitle/PageTitle'

const ProfilePage = () => {
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <PageTitle>Profile</PageTitle>
      <ListFadeOut />
    </>
  )
}

export default ProfilePage
