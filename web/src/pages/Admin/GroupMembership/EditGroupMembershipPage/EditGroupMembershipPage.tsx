import EditGroupMembershipCell from 'src/components/Admin/GroupMembership/EditGroupMembershipCell'

type GroupMembershipPageProps = {
  id: number
}

const EditGroupMembershipPage = ({ id }: GroupMembershipPageProps) => {
  return <EditGroupMembershipCell id={id} />
}

export default EditGroupMembershipPage
