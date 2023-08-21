import IdentifierCell from 'src/components/IdentifierCell'

interface IdentifierPageProps {
  identifier: string
}
const IdentifierPage = ({ identifier }: IdentifierPageProps) => {
  return <IdentifierCell id={identifier} />
}

export default IdentifierPage
