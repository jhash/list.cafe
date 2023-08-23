import { PlusCircle } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import ListsCell from 'src/components/ListsCell'
import PageTitle from 'src/components/PageTitle/PageTitle'

const ListsPage = () => {
  return (
    <>
      <MetaTags title="Lists" description="Lists page" />

      <PageTitle title="Lists">
        <Link
          className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
          to={routes.newList()}
        >
          <PlusCircle />
        </Link>
      </PageTitle>
      <ListsCell />
      <ListFadeOut />
    </>
  )
}

export default ListsPage
