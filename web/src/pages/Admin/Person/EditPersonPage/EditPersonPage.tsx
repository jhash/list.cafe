import EditPersonCell from 'src/components/Admin/Person/EditPersonCell'

type PersonPageProps = {
  id: number
}

const EditPersonPage = ({ id }: PersonPageProps) => {
  return <EditPersonCell id={id} />
}

export default EditPersonPage
