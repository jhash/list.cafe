import ListCell from 'src/components/ListCell'

import { ListPageProps } from '../ListPage/ListPage'

const DashboardListPage = ({ id }: ListPageProps) => {
  return <ListCell id={id} dashboard />
}

export default DashboardListPage
