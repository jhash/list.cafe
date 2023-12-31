import type {
  FindIdentifierQuery,
  FindIdentifierQueryVariables,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import GroupPage from '../../pages/GroupPage/GroupPage'
import ListPage from '../../pages/ListPage/ListPage'
import PersonPage from '../../pages/PersonPage/PersonPage'

export const QUERY = gql`
  query FindIdentifierQuery($id: String!) {
    identifier: identifier(id: $id) {
      id
      personId
      groupId
      listId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => (
  <Redirect to={routes.home()} options={{ replace: true }} />
)

export const Failure = () => (
  // {
  //   error,
  // }: CellFailureProps<FindIdentifierQueryVariables>
  <Redirect to={routes.home()} options={{ replace: true }} />
)

export const Success = ({
  identifier,
}: CellSuccessProps<FindIdentifierQuery, FindIdentifierQueryVariables>) => {
  if (!identifier.listId && !identifier.groupId && !identifier.personId) {
    return <Redirect to={routes.home()} options={{ replace: true }} />
  }

  return identifier.listId ? (
    <ListPage id={identifier.listId} />
  ) : identifier.personId ? (
    <PersonPage id={identifier.personId} identifier={identifier.id} />
  ) : (
    <GroupPage id={identifier.groupId} identifier={identifier.id} />
  )
}
