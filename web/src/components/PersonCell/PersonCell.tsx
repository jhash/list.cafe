import type { FindPersonQuery, FindPersonQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Profile from '../Profile/Profile'

export const QUERY = gql`
  query FindPersonQuery($id: Int!) {
    person: person(id: $id) {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPersonQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  person,
}: CellSuccessProps<FindPersonQuery, FindPersonQueryVariables>) => {
  return <Profile person={person} />
}
