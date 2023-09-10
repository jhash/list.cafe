import type { FindGroupMemberships } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GroupMemberships from 'src/components/Admin/GroupMembership/GroupMemberships'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindGroupMemberships {
    groupMemberships: adminGroupMemberships {
      id
      createdAt
      updatedAt
      userId
      groupRole
      groupId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No groupMemberships yet. '}
      <Link to={routes.adminNewGroupMembership()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  groupMemberships,
}: CellSuccessProps<FindGroupMemberships>) => {
  return <GroupMemberships groupMemberships={groupMemberships} />
}
