import type {
  FindListItemQuery,
  FindListItemQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindListItemQuery($id: Int!) {
    listItem: listItem(id: $id) {
      id
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindListItemQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  listItem,
}: CellSuccessProps<FindListItemQuery, FindListItemQueryVariables>) => {
  return <div>{JSON.stringify(listItem)}</div>
}
