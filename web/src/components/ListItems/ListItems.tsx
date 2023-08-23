import { Link2 } from 'lucide-react'
import { ListItemsQuery } from 'types/graphql'

import ExternalLink from '../ExternalLink/ExternalLink'

const ListItems: React.FC<ListItemsQuery> = ({ listItems }) => {
  return listItems.map(({ id, url, title }, index) => {
    return (
      <li key={id || index} className="flex items-center">
        <ExternalLink
          href={url}
          className="link flex h-12 flex-grow items-center gap-3 rounded-lg border px-3 text-lg no-underline shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
        >
          <Link2 size="1rem" />
          {title}
        </ExternalLink>
      </li>
    )
  })
}

export default ListItems
