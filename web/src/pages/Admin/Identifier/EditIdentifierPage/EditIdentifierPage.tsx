import EditIdentifierCell from 'src/components/Admin/Identifier/EditIdentifierCell'

type IdentifierPageProps = {
  id: string
}

const EditIdentifierPage = ({ id }: IdentifierPageProps) => {
  return <EditIdentifierCell id={id} />
}

export default EditIdentifierPage
