import { ListItemsQuery } from 'types/graphql'

import DashboardListItem from '../DashboardListItem/DashboardListItem'

type DashboardListItemsProps = ListItemsQuery & {
  deleteItem?: (index: number) => void
}
const DashboardListItems: React.FC<DashboardListItemsProps> = ({
  listItems,
  deleteItem,
}) => {
  return listItems.map((listItem, index) => {
    return (
      <li
        key={listItem.id || index}
        className="flex w-full max-w-full items-center"
      >
        <DashboardListItem
          {...listItem}
          modal={false}
          index={index}
          deleteItem={deleteItem}
        />
      </li>
    )
  })
}

export default DashboardListItems
