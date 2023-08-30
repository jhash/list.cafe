import { MetaTags } from '@redwoodjs/web'

import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import PublicListsCell from 'src/components/PublicListsCell'
import HomeContainerLayout from 'src/layouts/HomeContainerLayout/HomeContainerLayout'

const ExplorePage = () => {
  return (
    <>
      <MetaTags title="Explore" description="Explore page" />
      <HomeContainerLayout>
        <h1 className="font-serif text-5xl leading-tight">{'Explore'}</h1>
        <PublicListsCell />
        <ListFadeOut />
      </HomeContainerLayout>
    </>
  )
}

export default ExplorePage
