import type { FindGroups } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Groups from 'src/components/Admin/Group/Groups'

export const QUERY = gql`
  query FindGroups {
    groups {
      id
      createdAt
      updatedAt
      name
      type
      visibility
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No groups yet. '}
      <Link to={routes.adminNewGroup()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ groups }: CellSuccessProps<FindGroups>) => {
  return <Groups groups={groups} />
}
