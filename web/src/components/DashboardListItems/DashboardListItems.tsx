import { ListItemsQuery } from 'types/graphql'

import DashboardListItem from '../DashboardListItem/DashboardListItem'

type DashboardListItemsProps = ListItemsQuery & {
  editing?: boolean
  onListItemsUpdate?: () => void
  toggleEditing: () => void
}
const DashboardListItems: React.FC<DashboardListItemsProps> = ({
  listItems,
  editing = false,
  onListItemsUpdate,
  toggleEditing,
}) => {
  return listItems.map((listItem, index) => {
    return (
      <li
        key={listItem.id || index}
        className="flex w-full max-w-full items-center"
      >
        <DashboardListItem
          {...listItem}
          editing={editing}
          onListItemsUpdate={onListItemsUpdate}
          toggleEditing={toggleEditing}
        />
      </li>
    )
  })
}

export default DashboardListItems
