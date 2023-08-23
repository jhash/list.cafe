import DashboardGroup from 'src/components/DashboardGroup/DashboardGroup'
import GroupCell from 'src/components/GroupCell'

interface DashboardGroupPage {
  id?: number
}
const DashboardGroupPage = ({ id }: DashboardGroupPage) => {
  if (!id) {
    return <DashboardGroup />
  }

  return <GroupCell id={id} />
}

export default DashboardGroupPage
