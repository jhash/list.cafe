import PartnershipCell from 'src/components/Admin/Partnership/PartnershipCell'

type PartnershipPageProps = {
  id: number
}

const PartnershipPage = ({ id }: PartnershipPageProps) => {
  return <PartnershipCell id={id} />
}

export default PartnershipPage
