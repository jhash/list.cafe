import ListCell from 'src/components/ListCell'

export interface ListPageProps {
  id: number
}
const ListPage = ({ id }: ListPageProps) => {
  return <ListCell id={id} dashboard={false} Child={undefined} />
}

export default ListPage
