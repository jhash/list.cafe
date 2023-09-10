import { PublicListsQuery } from 'types/graphql'

import { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import Lists from '../Lists/Lists'

export const QUERY = gql`
  query PublicListsQuery($take: Int = 100, $skip: Int, $personId: Int) {
    lists: publicLists(take: $take, skip: $skip, personId: $personId) {
      id
      createdAt
      updatedAt
      name
      description
      type
      identifier {
        id
      }
      groupOwners {
        id
        name
      }
    }
  }
`

const PAGE_SIZE = 100

export const Loading = () => <Spinner />

export const Empty = () => <div>No lists match this query</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<PublicListsQuery>) => {
  return <Lists lists={lists} />
}

export const beforeQuery = ({ page, personId }) => {
  page = page ? parseInt(page, PAGE_SIZE) : 1

  return {
    variables: {
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      personId: personId ? +personId : undefined,
    },
  }
}
