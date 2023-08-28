import type { FindListMemberships } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListMemberships from 'src/components/Admin/ListMembership/ListMemberships'

export const QUERY = gql`
  query FindListMemberships {
    listMemberships {
      id
      createdAt
      updatedAt
      listRole
      listId
      userId
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No listMemberships yet. '}
      <Link to={routes.adminNewListMembership()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listMemberships,
}: CellSuccessProps<FindListMemberships>) => {
  return <ListMemberships listMemberships={listMemberships} />
}
