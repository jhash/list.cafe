import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PublicGroupsCell from 'src/components/PublicGroupsCell'
import PublicListsCell from 'src/components/PublicListsCell'
import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

const ExplorePage = ({ page, groupsPage }) => {
  return (
    <>
      <MetaTags title="Explore" description="Explore page" />
      <HomeContainerLayout>
        <h1 className="font-serif text-5xl leading-tight">{'Explore'}</h1>
        <div className="flex w-full max-w-full flex-grow flex-col gap-y-5">
          <div className="text-2xl font-semibold">Lists</div>
          <PublicListsCell page={page} />
        </div>
        <div className="flex w-full max-w-full flex-grow flex-col gap-y-5">
          <div className="text-2xl font-semibold">Groups</div>
          <PublicGroupsCell page={groupsPage} />
        </div>
        <ListFadeOut />
      </HomeContainerLayout>
    </>
  )
}

export default ExplorePage
