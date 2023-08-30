import { ListType, ListsQuery, PublicListsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { matchListTypeOption } from 'src/lib/lists'

import { Badge } from '../Badge/Badge'

export const ListTypeBadge = ({ type }: { type: ListType | undefined }) => {
  if (!type) {
    return null
  }

  const listType = matchListTypeOption(type)

  return <Badge className={listType.badgeColor}>{listType.name}</Badge>
}

type ListsProps = {
  lists: ListsQuery['lists'] | PublicListsQuery['lists']
}
const Lists: React.FC<ListsProps> = ({ lists }) => {
  return (
    <ul className="flex flex-col gap-2">
      {lists.map(({ id, name, type, identifier }, index) => {
        return (
          <Link
            key={id || index}
            to={
              identifier
                ? routes.identifier({ identifier: identifier.id })
                : routes.list({ id })
            }
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

export default Lists
