import ListCell from 'src/components/Admin/List/ListCell'

type ListPageProps = {
  id: number
}

const ListPage = ({ id }: ListPageProps) => {
  return <ListCell id={id} />
}

export default ListPage
