import type { FindPartnershipContacts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PartnershipContacts from 'src/components/Admin/PartnershipContact/PartnershipContacts'

export const QUERY = gql`
  query FindPartnershipContacts {
    partnershipContacts {
      id
      createdAt
      updatedAt
      personId
      partnershipId
      addedByUserId
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No partnershipContacts yet. '}
      <Link to={routes.adminNewPartnershipContact()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipContacts,
}: CellSuccessProps<FindPartnershipContacts>) => {
  return <PartnershipContacts partnershipContacts={partnershipContacts} />
}
