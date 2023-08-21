import EditGroupCell from 'src/components/Admin/Group/EditGroupCell'

type GroupPageProps = {
  id: number
}

const EditGroupPage = ({ id }: GroupPageProps) => {
  return <EditGroupCell id={id} />
}

export default EditGroupPage
