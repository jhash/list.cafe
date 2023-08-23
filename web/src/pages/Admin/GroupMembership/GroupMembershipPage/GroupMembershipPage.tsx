import GroupMembershipCell from 'src/components/Admin/GroupMembership/GroupMembershipCell'

type GroupMembershipPageProps = {
  id: number
}

const GroupMembershipPage = ({ id }: GroupMembershipPageProps) => {
  return <GroupMembershipCell id={id} />
}

export default GroupMembershipPage
