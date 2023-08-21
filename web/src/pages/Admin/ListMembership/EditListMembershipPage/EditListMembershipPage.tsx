import EditListMembershipCell from 'src/components/Admin/ListMembership/EditListMembershipCell'

type ListMembershipPageProps = {
  id: number
}

const EditListMembershipPage = ({ id }: ListMembershipPageProps) => {
  return <EditListMembershipCell id={id} />
}

export default EditListMembershipPage
