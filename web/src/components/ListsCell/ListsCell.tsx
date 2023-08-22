import type { ListsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ListsQuery {
    lists {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<ListsQuery>) => {
  return (
    <ul>
      {lists.map(({ id, name }, index) => {
        return (
          <Link
            key={index}
            to={routes.list({ id })}
            className="link flex h-10 flex-grow items-center gap-4 rounded-md border px-2 no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
          >
            {name}
          </Link>
        )
      })}
    </ul>
  )
}
