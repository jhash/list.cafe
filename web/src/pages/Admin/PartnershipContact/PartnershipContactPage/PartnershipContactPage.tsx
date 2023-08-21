import PartnershipContactCell from 'src/components/Admin/PartnershipContact/PartnershipContactCell'

type PartnershipContactPageProps = {
  id: number
}

const PartnershipContactPage = ({ id }: PartnershipContactPageProps) => {
  return <PartnershipContactCell id={id} />
}

export default PartnershipContactPage
