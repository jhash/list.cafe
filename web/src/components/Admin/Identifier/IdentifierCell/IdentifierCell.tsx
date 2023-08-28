import type { FindIdentifierById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Identifier from 'src/components/Admin/Identifier/Identifier'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindIdentifierById($id: String!) {
    identifier: identifier(id: $id) {
      id
      personId
      listId
      groupId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Identifier not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  identifier,
}: CellSuccessProps<FindIdentifierById>) => {
  return <Identifier identifier={identifier} />
}
