import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupSettings from 'src/components/DashboardGroupSettings/DashboardGroupSettings'
import GroupCell from 'src/components/GroupCell'

interface DashboardGroupPage {
  groupId?: number
}
const DashboardGroupPage = ({ groupId }: DashboardGroupPage) => {
  if (!groupId) {
    return <DashboardGroup Child={DashboardGroupSettings} />
  }

  return <GroupCell id={groupId} Child={DashboardGroupSettings} dashboard />
}

export default DashboardGroupPage
