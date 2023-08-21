import EditListItemCell from 'src/components/Admin/ListItem/EditListItemCell'

type ListItemPageProps = {
  id: number
}

const EditListItemPage = ({ id }: ListItemPageProps) => {
  return <EditListItemCell id={id} />
}

export default EditListItemPage
