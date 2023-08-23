import { Link2 } from 'lucide-react'
import { ListItemsQuery } from 'types/graphql'

import ExternalLink from '../ExternalLink/ExternalLink'

const ListItems: React.FC<ListItemsQuery> = ({ listItems }) => {
  return listItems.map(({ id, url, title, description }, index) => {
    return (
      <li
        key={id || index}
        className="flex cursor-pointer items-center gap-3 rounded-lg border pr-3 leading-tight shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
      >
        {url ? (
          <ExternalLink
            href={url}
            className="link min-h-12 flex flex-grow items-center gap-3 px-3 py-1 text-lg no-underline"
          >
            {title}
            <Link2 size="1rem" className="flex-shrink-0" />
          </ExternalLink>
        ) : (
          <div className="link min-h-12 flex flex-grow items-center gap-3 px-3 py-1 text-lg no-underline">
            {title}
          </div>
        )}
        <div className="flex items-center justify-end gap-3">
          {!!description && (
            <span className="whitespace-normal text-right text-sm text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
        </div>
      </li>
    )
  })
}

export default ListItems
