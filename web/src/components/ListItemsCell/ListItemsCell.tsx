import { ExternalLink as OutsideLink } from 'lucide-react'
import type { ListItemsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ExternalLink from '../ExternalLink/ExternalLink'

export const QUERY = gql`
  query ListItemsQuery($listId: Int!) {
    listItems: listItems(listId: $listId) {
      id
      title
      url
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ listItems }: CellSuccessProps<ListItemsQuery>) => {
  return listItems.map(({ url, title }, index) => {
    return (
      <li key={index} className="flex items-center">
        <ExternalLink
          href={url}
          className="link flex h-16 flex-grow items-center gap-4 border-x border-transparent px-3 text-xl hover:scale-100 hover:border hover:border-b-0 hover:border-t-0 hover:border-neutral-200 hover:bg-neutral-200 hover:bg-opacity-5"
        >
          <OutsideLink />
          {title}
        </ExternalLink>
      </li>
    )
  })
}
