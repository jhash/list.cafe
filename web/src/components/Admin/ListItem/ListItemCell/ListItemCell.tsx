import type { FindListItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListItem from 'src/components/Admin/ListItem/ListItem'

export const QUERY = gql`
  query FindListItemById($id: Int!) {
    listItem: listItem(id: $id) {
      id
      createdAt
      updatedAt
      title
      description
      url
      listId
      quantity
      voting
      parentId
      order
      price
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ListItem not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ listItem }: CellSuccessProps<FindListItemById>) => {
  return <ListItem listItem={listItem} />
}
