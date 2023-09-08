import type {
  FindIdentifierQuery,
  FindIdentifierQueryVariables,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

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

export const Empty = () => <Redirect to={routes.home()} />

export const Failure = () => (
  // {
  //   error,
  // }: CellFailureProps<FindIdentifierQueryVariables>
  <Redirect to={routes.home()} />
)

export const Success = ({
  identifier,
}: CellSuccessProps<FindIdentifierQuery, FindIdentifierQueryVariables>) => {
  if (!identifier.listId && !identifier.groupId && !identifier.personId) {
    return <Redirect to={routes.home()} />
  }

  return identifier.listId ? (
    <ListPage id={identifier.listId} />
  ) : identifier.personId ? (
    <PersonPage id={identifier.personId} />
  ) : (
    <div>Group Page not created yet</div>
  )
}
