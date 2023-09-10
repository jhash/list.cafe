import GroupCell from 'src/components/Admin/Group/GroupCell'

type GroupPageProps = {
  groupId: number
}

const GroupPage = ({ groupId }: GroupPageProps) => {
  return <GroupCell id={groupId} />
}

export default GroupPage
