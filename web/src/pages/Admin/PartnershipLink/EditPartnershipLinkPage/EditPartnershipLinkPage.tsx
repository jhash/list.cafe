import EditPartnershipLinkCell from 'src/components/Admin/PartnershipLink/EditPartnershipLinkCell'

type PartnershipLinkPageProps = {
  id: string
}

const EditPartnershipLinkPage = ({ id }: PartnershipLinkPageProps) => {
  return <EditPartnershipLinkCell id={id} />
}

export default EditPartnershipLinkPage
