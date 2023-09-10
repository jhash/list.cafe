import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupMembers from 'src/components/DashboardGroupMembers/DashboardGroupMembers'
import GroupCell from 'src/components/GroupCell'

const DashboardGroupMembersPage = ({ id }) => {
  if (!id) {
    return <DashboardGroup Child={DashboardGroupMembers} />
  }

  return <GroupCell id={id} Child={DashboardGroupMembers} dashboard />
}

export default DashboardGroupMembersPage
