import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ListDraftPage = () => {
  return (
    <>
      <MetaTags title="ListDraft" description="ListDraft page" />

      <h1>ListDraftPage</h1>
      <p>
        Find me in <code>./web/src/pages/ListDraftPage/ListDraftPage.tsx</code>
      </p>
      <p>
        My default route is named <code>listDraft</code>, link to me with `
        <Link to={routes.listDraft()}>ListDraft</Link>`
      </p>
    </>
  )
}

export default ListDraftPage
