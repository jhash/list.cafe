import { DashboardGroupChild } from '../DashboardGroupSettings/DashboardGroupSettings'
import ListsCell from '../ListsCell'

const DashboardGroupLists: DashboardGroupChild = ({ group: { id } }) => {
  return <ListsCell groupId={id} />
}

export default DashboardGroupLists
