import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import ListsCell from 'src/components/ListsCell'
import PageTitle from 'src/components/PageTitle/PageTitle'

const ListsPage = () => {
  return (
    <>
      <MetaTags title="Lists" description="Lists page" />

      <PageTitle>Lists</PageTitle>
      <ListsCell />
      <ListFadeOut />
    </>
  )
}

export default ListsPage
