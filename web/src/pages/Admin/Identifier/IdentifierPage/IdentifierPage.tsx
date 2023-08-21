import IdentifierCell from 'src/components/Admin/Identifier/IdentifierCell'

type IdentifierPageProps = {
  id: string
}

const IdentifierPage = ({ id }: IdentifierPageProps) => {
  return <IdentifierCell id={id} />
}

export default IdentifierPage
