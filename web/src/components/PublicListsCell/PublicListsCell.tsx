import { PublicListsQuery } from 'types/graphql'

import { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import Lists from '../Lists/Lists'

export const QUERY = gql`
  query PublicListsQuery($take: Int = 100, $skip: Int) {
    lists: publicLists(take: $take, skip: $skip) {
      id
      createdAt
      updatedAt
      name
      description
      type
      identifier {
        id
      }
    }
  }
`

const PAGE_SIZE = 100

export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<PublicListsQuery>) => {
  return <Lists lists={lists} />
}

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, PAGE_SIZE) : 1

  return { variables: { take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE } }
}
