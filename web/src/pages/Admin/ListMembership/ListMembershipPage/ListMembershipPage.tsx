import ListMembershipCell from 'src/components/Admin/ListMembership/ListMembershipCell'

type ListMembershipPageProps = {
  id: number
}

const ListMembershipPage = ({ id }: ListMembershipPageProps) => {
  return <ListMembershipCell id={id} />
}

export default ListMembershipPage
