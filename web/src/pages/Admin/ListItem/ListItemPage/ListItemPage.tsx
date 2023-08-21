import ListItemCell from 'src/components/Admin/ListItem/ListItemCell'

type ListItemPageProps = {
  id: number
}

const ListItemPage = ({ id }: ListItemPageProps) => {
  return <ListItemCell id={id} />
}

export default ListItemPage
