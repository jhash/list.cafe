import type { FindIdentifiers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Identifiers from 'src/components/Admin/Identifier/Identifiers'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindIdentifiers {
    identifiers {
      id
      personId
      listId
      groupId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No identifiers yet. '}
      <Link to={routes.adminNewIdentifier()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ identifiers }: CellSuccessProps<FindIdentifiers>) => {
  return <Identifiers identifiers={identifiers} />
}
