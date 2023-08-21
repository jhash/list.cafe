import PartnershipLinkCell from 'src/components/Admin/PartnershipLink/PartnershipLinkCell'

type PartnershipLinkPageProps = {
  id: string
}

const PartnershipLinkPage = ({ id }: PartnershipLinkPageProps) => {
  return <PartnershipLinkCell id={id} />
}

export default PartnershipLinkPage
