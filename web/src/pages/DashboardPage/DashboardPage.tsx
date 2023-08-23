import { PlusCircle } from 'lucide-react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import GroupsCell from 'src/components/GroupsCell'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import ListsCell from 'src/components/ListsCell'
import PageTitle from 'src/components/PageTitle/PageTitle'

import SectionTitle from '../../components/SectionTitle/SectionTitle'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <PageTitle>Dashboard</PageTitle>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-nowrap items-center gap-3">
            <div className="flex flex-grow flex-nowrap items-center gap-3">
              <SectionTitle>Lists</SectionTitle>
            </div>
            <Link
              className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
              to={routes.newList()}
            >
              <PlusCircle />
            </Link>
          </div>
          <ListsCell />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-nowrap items-center gap-3">
            <div className="flex flex-grow flex-nowrap items-center gap-3">
              <SectionTitle>Groups</SectionTitle>
            </div>
            <Link
              className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
              to={routes.newGroup()}
            >
              <PlusCircle />
            </Link>
          </div>
          <GroupsCell />
        </div>
      </div>
      <ListFadeOut />
    </>
  )
}

export default DashboardPage
