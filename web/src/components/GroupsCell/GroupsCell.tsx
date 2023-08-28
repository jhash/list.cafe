import type { GroupType, GroupsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Badge } from '../Badge/Badge'
import { matchGroupTypeOption } from '../DashboardGroup/DashboardGroup'

export const QUERY = gql`
  query GroupsQuery {
    groups {
      id
      name
      type
      identifier {
        id
      }
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const GroupTypeBadge = ({ type }: { type: GroupType | undefined }) => {
  if (!type) {
    return null
  }

  const groupType = matchGroupTypeOption(type)

  return <Badge className={groupType.badgeColor}>{groupType.name}</Badge>
}

export const Success = ({ groups }: CellSuccessProps<GroupsQuery>) => {
  return (
    <ul className="flex flex-col gap-2">
      {groups.map(({ id, name, type }, index) => {
        return (
          <Link
            key={id || index}
            to={routes.group({ id })}
            className="link min-h-12 flex flex-grow items-center gap-4 rounded-md border px-4 no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
          >
            <div className="flex flex-grow items-center">{name}</div>
            <GroupTypeBadge type={type} />
          </Link>
        )
      })}
    </ul>
  )
}
