import type { FindListMembershipById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListMembership from 'src/components/Admin/ListMembership/ListMembership'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindListMembershipById($id: Int!) {
    listMembership: listMembership(id: $id) {
      id
      createdAt
      updatedAt
      listRole
      listId
      userId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>ListMembership not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listMembership,
}: CellSuccessProps<FindListMembershipById>) => {
  return <ListMembership listMembership={listMembership} />
}
