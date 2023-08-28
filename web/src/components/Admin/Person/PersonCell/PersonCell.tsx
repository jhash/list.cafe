import type { FindPersonById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Person from 'src/components/Admin/Person/Person'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindPersonById($id: Int!) {
    person: person(id: $id) {
      id
      createdAt
      updatedAt
      name
      email
      # defaultAddressId
      # createdByUserId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Person not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ person }: CellSuccessProps<FindPersonById>) => {
  return <Person person={person} />
}
