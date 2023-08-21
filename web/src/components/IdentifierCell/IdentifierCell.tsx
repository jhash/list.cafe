import type {
  FindIdentifierQuery,
  FindIdentifierQueryVariables,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import type { CellSuccessProps } from '@redwoodjs/web'

import ListPage from '../../pages/ListPage/ListPage'

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

export const Loading = () => <div>Loading...</div>

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
  return identifier.listId ? (
    <ListPage id={identifier.listId} />
  ) : (
    <div>Person and Group Pages not created yet</div>
  )
}
