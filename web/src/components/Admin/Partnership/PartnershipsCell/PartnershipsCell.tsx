import type { FindPartnerships } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Partnerships from 'src/components/Admin/Partnership/Partnerships'

export const QUERY = gql`
  query FindPartnerships {
    partnerships {
      id
      createdAt
      updatedAt
      name
      notes
      status
      url
      affiliateId
      affiliateIdParam
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No partnerships yet. '}
      <Link to={routes.adminNewPartnership()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnerships,
}: CellSuccessProps<FindPartnerships>) => {
  return <Partnerships partnerships={partnerships} />
}
