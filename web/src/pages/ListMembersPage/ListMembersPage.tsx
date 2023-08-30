import DashboardList from 'src/components/DashboardList/DashboardList'
import ListCell from 'src/components/ListCell'

interface ListMembersPage {
  id?: number
}
const ListMembersPage = ({ id }: ListMembersPage) => {
  if (!id) {
    return <DashboardList />
  }
  return <ListCell id={id} dashboard Child={DashboardList} />
}

export default ListMembersPage
