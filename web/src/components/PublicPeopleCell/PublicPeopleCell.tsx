import type { PublicPeopleQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import { Link } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PersonAvatar from '../PersonAvatar/PersonAvatar'

export const QUERY = gql`
  query PublicPeopleQuery($groupId: Int) {
    people(groupId: $groupId) {
      id
      createdAt
      updatedAt
      visibility
      description
      pronouns
      name
      images {
        id
        alt
        url
      }
      identifier {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ people }: CellSuccessProps<PublicPeopleQuery>) => {
  return (
    <div className="flex flex-col gap-2">
      {people.map((person) => {
        const { id, name, identifier } = person

        return (
          <Link
            key={id}
            to={routes.identifier({
              identifier: identifier?.id,
            })}
            className={
              'link min-h-12 flex flex-grow items-center gap-4 rounded-md border px-4 py-1 no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20'
            }
          >
            <PersonAvatar person={person} className="h-8 w-8 text-[0.375rem]" />
            {!!name && (
              <div className="flex-shrink whitespace-normal">{name}</div>
            )}
          </Link>
        )
      })}
    </div>
  )
}
