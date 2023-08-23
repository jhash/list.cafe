import { PlusCircle } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import GroupsCell from 'src/components/GroupsCell'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PageTitle from 'src/components/PageTitle/PageTitle'

const GroupsPage = () => {
  return (
    <>
      <MetaTags title="Groups" description="Groups page" />

      <PageTitle title="Groups">
        <Link
          className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
          to={routes.newGroup()}
        >
          <PlusCircle />
        </Link>
      </PageTitle>
      <GroupsCell />
      <ListFadeOut />
    </>
  )
}

export default GroupsPage
