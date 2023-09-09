import { Redirect, routes } from '@redwoodjs/router'

import ListCell from 'src/components/ListCell'
import ListMembers from 'src/components/ListMembers/ListMembers'

interface ListMembersPage {
  id?: number
}
const ListMembersPage = ({ id }: ListMembersPage) => {
  if (!id) {
    return <Redirect to={routes.lists()} options={{ replace: true }} />
  }
  return <ListCell id={id} dashboard Child={ListMembers} />
}

export default ListMembersPage
