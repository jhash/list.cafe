import type { FindPartnershipLinkById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PartnershipLink from 'src/components/Admin/PartnershipLink/PartnershipLink'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindPartnershipLinkById($id: String!) {
    partnershipLink: partnershipLink(id: $id) {
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

export const Empty = () => <div>PartnershipLink not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipLink,
}: CellSuccessProps<FindPartnershipLinkById>) => {
  return <PartnershipLink partnershipLink={partnershipLink} />
}
