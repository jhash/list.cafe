import { ListItemsQuery } from 'types/graphql'

import DashboardListItem from '../DashboardListItem/DashboardListItem'

type DashboardListItemsProps = ListItemsQuery & {
  editing?: boolean
  onListItemsUpdate?: () => void
}
const DashboardListItems: React.FC<DashboardListItemsProps> = ({
  listItems,
  editing = false,
  onListItemsUpdate,
}) => {
  return listItems.map((listItem, index) => {
    return (
      <li key={listItem.id || index} className="flex items-center">
        <DashboardListItem
          {...listItem}
          editing={editing}
          onListItemsUpdate={onListItemsUpdate}
        />
      </li>
    )
  })
}

export default DashboardListItems
