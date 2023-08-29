import type { ListType, ListsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'
import { matchListTypeOption } from 'src/lib/lists'

import { Badge } from '../Badge/Badge'

export const QUERY = gql`
  query ListsQuery {
    lists {
      id
      name
      description
      type
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const ListTypeBadge = ({ type }: { type: ListType | undefined }) => {
  if (!type) {
    return null
  }

  const listType = matchListTypeOption(type)

  return <Badge className={listType.badgeColor}>{listType.name}</Badge>
}

export const Success = ({ lists }: CellSuccessProps<ListsQuery>) => {
  return (
    <ul className="flex flex-col gap-2">
      {lists.map(({ id, name, type }, index) => {
        return (
          <Link
            key={id || index}
            to={routes.list({ id })}
            className="link min-h-12 flex flex-grow items-center gap-4 rounded-md border px-4 no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
          >
            <div className="flex flex-grow items-center">{name}</div>
            <ListTypeBadge type={type} />
          </Link>
        )
      })}
    </ul>
  )
}
