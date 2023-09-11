import type { PublicGroupsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import { GroupTypeBadge } from '../GroupsCell'

export const QUERY = gql`
  query PublicGroupsQuery($take: Int = 20, $skip: Int, $personId: Int) {
    publicGroups(take: $take, skip: $skip, personId: $personId) {
      id
      name
      type
      identifier {
        id
      }
    }
  }
`

const PAGE_SIZE = 20

export const Loading = () => <Spinner />

export const Empty = () => <div>No groups yet</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  publicGroups,
}: CellSuccessProps<PublicGroupsQuery>) => {
  return (
    <ul className="flex flex-col gap-2">
      {publicGroups.map(({ id, name, type, identifier }, index) => {
        return (
          <Link
            key={id || index}
            to={routes.identifier({ identifier: identifier?.id })}
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

export const beforeQuery = ({ page, personId }) => {
  page = page ? parseInt(page, PAGE_SIZE) : 1

  return {
    variables: {
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      personId,
    },
  }
}
