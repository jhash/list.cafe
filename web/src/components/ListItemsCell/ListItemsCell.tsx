import type { ListItemsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DashboardListItems from '../DashboardListItems/DashboardListItems'
import ListItems from '../ListItems/ListItems'

export const QUERY = gql`
  query ListItemsQuery($listId: Int!) {
    listItems: listItems(listId: $listId) {
      id
      title
      url
      description
      quantity
      price
      listId
      listRoles
      list {
        type
      }
      reservations {
        id
        userId
        status
        quantity
        listItemId
        comment
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ListItemsCellProps {
  dashboard?: boolean
  editing?: boolean
  onListItemsUpdate?: () => void
  toggleEditing?: () => void
}
export const Success = ({
  listItems,
  dashboard = false,
  editing = false,
  onListItemsUpdate,
  toggleEditing,
}: CellSuccessProps<ListItemsQuery & ListItemsCellProps>) => {
  if (dashboard) {
    return (
      <DashboardListItems
        listItems={listItems}
        editing={editing}
        onListItemsUpdate={onListItemsUpdate}
        toggleEditing={toggleEditing}
      />
    )
  }

  return <ListItems listItems={listItems} />
}
