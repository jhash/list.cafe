import type { FindGroupMembershipById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GroupMembership from 'src/components/Admin/GroupMembership/GroupMembership'

export const QUERY = gql`
  query FindGroupMembershipById($id: Int!) {
    groupMembership: groupMembership(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupRole
      groupId
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => <div>GroupMembership not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  groupMembership,
}: CellSuccessProps<FindGroupMembershipById>) => {
  return <GroupMembership groupMembership={groupMembership} />
}
