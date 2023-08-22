import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PageTitle from 'src/components/PageTitle/PageTitle'

const GroupsPage = () => {
  return (
    <>
      <MetaTags title="Groups" description="Groups page" />

      <PageTitle>Groups</PageTitle>
      <ListFadeOut />
    </>
  )
}

export default GroupsPage
