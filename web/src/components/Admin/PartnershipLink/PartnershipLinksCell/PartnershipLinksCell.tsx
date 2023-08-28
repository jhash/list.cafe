import type { FindPartnershipLinks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PartnershipLinks from 'src/components/Admin/PartnershipLink/PartnershipLinks'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindPartnershipLinks {
    partnershipLinks {
      id
      createdAt
      updatedAt
      status
      originalUrl
      partnershipId
      listItemId
      createdByUserId
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No partnershipLinks yet. '}
      <Link to={routes.adminNewPartnershipLink()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipLinks,
}: CellSuccessProps<FindPartnershipLinks>) => {
  return <PartnershipLinks partnershipLinks={partnershipLinks} />
}
