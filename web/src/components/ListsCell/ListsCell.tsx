import type { ListsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import Lists from '../Lists/Lists'

export const QUERY = gql`
  query ListsQuery($groupId: Int) {
    lists(groupId: $groupId) {
      id
      createdAt
      updatedAt
      name
      description
      type
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>No lists yet. Add the first one!</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<ListsQuery>) => {
  return <Lists lists={lists} />
}
