import DashboardList from 'src/components/DashboardList/DashboardList'
import ListCell from 'src/components/ListCell'

interface DashboardListPage {
  id?: number
}
const DashboardListPage = ({ id }: DashboardListPage) => {
  if (!id) {
    return <DashboardList />
  }
  return <ListCell id={id} dashboard />
}

export default DashboardListPage
