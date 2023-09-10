import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import DashboardGroupSettings from 'src/components/DashboardGroupSettings/DashboardGroupSettings'
import GroupCell from 'src/components/GroupCell'

interface DashboardGroupPage {
  id?: number
}
const DashboardGroupPage = ({ id }: DashboardGroupPage) => {
  if (!id) {
    return <DashboardGroup Child={DashboardGroupSettings} />
  }

  return <GroupCell id={id} Child={DashboardGroupSettings} dashboard />
}

export default DashboardGroupPage
