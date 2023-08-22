import { ListItemsQuery } from 'types/graphql'

import DashboardListItem from '../DashboardListItem/DashboardListItem'

type DashboardListItemsProps = ListItemsQuery & {
  editing?: boolean
}
const DashboardListItems: React.FC<DashboardListItemsProps> = ({
  listItems,
  editing = false,
}) => {
  return listItems.map((listItem, index) => {
    return (
      <li key={index} className="flex items-center">
        <DashboardListItem {...listItem} editing={editing} />
      </li>
    )
  })
}

export default DashboardListItems
