import ListCell from 'src/components/ListCell'

interface ListPageProps {
  id: number
}
const ListPage = ({ id }: ListPageProps) => {
  return <ListCell id={id} />
}

export default ListPage
