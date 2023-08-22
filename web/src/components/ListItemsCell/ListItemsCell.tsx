import { Link2 } from 'lucide-react'
import type { ListItemsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DashboardListItems from '../DashboardListItems/DashboardListItems'
import ExternalLink from '../ExternalLink/ExternalLink'

export const QUERY = gql`
  query ListItemsQuery($listId: Int!) {
    listItems: listItems(listId: $listId) {
      id
      title
      url
      description
      quantity
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

interface ListItemsCellProps {
  dashboard?: boolean
  editing?: boolean
}
export const Success = ({
  listItems,
  dashboard = false,
  editing = false,
}: CellSuccessProps<ListItemsQuery & ListItemsCellProps>) => {
  if (dashboard) {
    return <DashboardListItems listItems={listItems} editing={editing} />
  }

  return listItems.map(({ url, title }, index) => {
    return (
      <li key={index} className="flex items-center">
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
