import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import ListsCell from 'src/components/ListsCell'
import PageTitle from 'src/components/PageTitle/PageTitle'

import SectionTitle from '../../components/SectionTitle/SectionTitle'

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <PageTitle>Dashboard</PageTitle>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SectionTitle>Lists</SectionTitle>
          <ListsCell />
        </div>
        <div className="flex flex-col gap-3">
          <SectionTitle>Groups</SectionTitle>
        </div>
      </div>
      <ListFadeOut />
    </>
  )
}

export default DashboardPage
