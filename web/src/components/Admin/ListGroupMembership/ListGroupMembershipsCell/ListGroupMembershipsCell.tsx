import type { FindListGroupMemberships } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListGroupMemberships from 'src/components/Admin/ListGroupMembership/ListGroupMemberships'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindListGroupMemberships {
    listGroupMemberships {
      id
      createdAt
      updatedAt
      listRole
      listId
      groupId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No listGroupMemberships yet. '}
      <Link to={routes.adminNewListGroupMembership()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listGroupMemberships,
}: CellSuccessProps<FindListGroupMemberships>) => {
  return <ListGroupMemberships listGroupMemberships={listGroupMemberships} />
}
