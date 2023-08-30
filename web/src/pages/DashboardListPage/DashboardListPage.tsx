import EditListItems from 'src/components/EditListItems/EditListItems'
import ListCell from 'src/components/ListCell'
import NewList from 'src/components/NewList/NewList'
import DashboardListLayout from 'src/layouts/DashboardListLayout/DashboardListLayout'

interface DashboardListPage {
  id?: number
}
const DashboardListPage = ({ id }: DashboardListPage) => {
  if (!id) {
    return <DashboardListLayout Child={NewList} />
  }
  return <ListCell id={id} dashboard Child={EditListItems} />
}

export default DashboardListPage
