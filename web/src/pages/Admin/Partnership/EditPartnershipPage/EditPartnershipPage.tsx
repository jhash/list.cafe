import EditPartnershipCell from 'src/components/Admin/Partnership/EditPartnershipCell'

type PartnershipPageProps = {
  id: number
}

const EditPartnershipPage = ({ id }: PartnershipPageProps) => {
  return <EditPartnershipCell id={id} />
}

export default EditPartnershipPage
