import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupLists from 'src/components/DashboardGroupLists/DashboardGroupLists'
import GroupCell from 'src/components/GroupCell'

const DashboardGroupListsPage = ({ groupId }) => {
  if (!groupId) {
    return <DashboardGroup Child={DashboardGroupLists} />
  }

  return <GroupCell id={groupId} Child={DashboardGroupLists} dashboard />
}

export default DashboardGroupListsPage
