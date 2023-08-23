import type { FindListGroupMembershipById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListGroupMembership from 'src/components/Admin/ListGroupMembership/ListGroupMembership'

export const QUERY = gql`
  query FindListGroupMembershipById($id: Int!) {
    listGroupMembership: listGroupMembership(id: $id) {
      id
      createdAt
      updatedAt
      listRole
      listId
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ListGroupMembership not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listGroupMembership,
}: CellSuccessProps<FindListGroupMembershipById>) => {
  return <ListGroupMembership listGroupMembership={listGroupMembership} />
}
