import EditListCell from 'src/components/Admin/List/EditListCell'

type ListPageProps = {
  id: number
}

const EditListPage = ({ id }: ListPageProps) => {
  return <EditListCell id={id} />
}

export default EditListPage
