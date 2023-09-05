import type { ListItemsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

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
      images {
        id
        alt
        url
      }
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ListItemsCellProps {
  dashboard?: boolean
  deleteItem?: (index: number) => void
}
export const Success = ({
  listItems,
  dashboard = false,
  deleteItem,
}: CellSuccessProps<ListItemsQuery & ListItemsCellProps>) => {
  if (dashboard) {
    return <DashboardListItems listItems={listItems} deleteItem={deleteItem} />
  }

  return <ListItems listItems={listItems} />
}
