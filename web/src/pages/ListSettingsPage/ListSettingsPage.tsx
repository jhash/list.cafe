import DashboardList from 'src/components/DashboardList/DashboardList'
import ListCell from 'src/components/ListCell'

interface ListSettingsPage {
  id?: number
}
const ListSettingsPage = ({ id }: ListSettingsPage) => {
  if (!id) {
    return <DashboardList />
  }
  return <ListCell id={id} dashboard Child={DashboardList} />
}

export default ListSettingsPage
