import EditPartnershipContactCell from 'src/components/Admin/PartnershipContact/EditPartnershipContactCell'

type PartnershipContactPageProps = {
  id: number
}

const EditPartnershipContactPage = ({ id }: PartnershipContactPageProps) => {
  return <EditPartnershipContactCell id={id} />
}

export default EditPartnershipContactPage
