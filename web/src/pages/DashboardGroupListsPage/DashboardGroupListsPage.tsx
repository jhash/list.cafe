import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupLists from 'src/components/DashboardGroupLists/DashboardGroupLists'
import GroupCell from 'src/components/GroupCell'

const DashboardGroupListsPage = ({ id }) => {
  if (!id) {
    return <DashboardGroup Child={DashboardGroupLists} />
  }

  return <GroupCell id={id} Child={DashboardGroupLists} dashboard />
}

export default DashboardGroupListsPage
