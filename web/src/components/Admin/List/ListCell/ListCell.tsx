import type { FindListById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import List from 'src/components/Admin/List/List'

export const QUERY = gql`
  query FindListById($id: Int!) {
    list: list(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>List not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ list }: CellSuccessProps<FindListById>) => {
  return <List list={list} />
}
