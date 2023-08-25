import type { FindListItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListItems from 'src/components/Admin/ListItem/ListItems'

export const QUERY = gql`
  query FindListItems($listId: Int!) {
    listItems: listItems(listId: $listId) {
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
      reservations {
        status
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No listItems yet. '}
      <Link to={routes.adminNewListItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ listItems }: CellSuccessProps<FindListItems>) => {
  return <ListItems listItems={listItems} />
}
