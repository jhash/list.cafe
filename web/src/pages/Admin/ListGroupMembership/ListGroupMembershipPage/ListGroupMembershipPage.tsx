import ListGroupMembershipCell from 'src/components/Admin/ListGroupMembership/ListGroupMembershipCell'

type ListGroupMembershipPageProps = {
  id: number
}

const ListGroupMembershipPage = ({ id }: ListGroupMembershipPageProps) => {
  return <ListGroupMembershipCell id={id} />
}

export default ListGroupMembershipPage
