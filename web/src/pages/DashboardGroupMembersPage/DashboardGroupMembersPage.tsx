import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupMembers from 'src/components/DashboardGroupMembers/DashboardGroupMembers'
import GroupCell from 'src/components/GroupCell'

const DashboardGroupMembersPage = ({ groupId }) => {
  if (!groupId) {
    return <DashboardGroup Child={DashboardGroupMembers} />
  }

  return <GroupCell id={groupId} Child={DashboardGroupMembers} dashboard />
}

export default DashboardGroupMembersPage
