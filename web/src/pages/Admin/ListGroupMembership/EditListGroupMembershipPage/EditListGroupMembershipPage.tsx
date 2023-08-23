import EditListGroupMembershipCell from 'src/components/Admin/ListGroupMembership/EditListGroupMembershipCell'

type ListGroupMembershipPageProps = {
  id: number
}

const EditListGroupMembershipPage = ({ id }: ListGroupMembershipPageProps) => {
  return <EditListGroupMembershipCell id={id} />
}

export default EditListGroupMembershipPage
