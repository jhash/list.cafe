import type { FindPartnershipContactById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PartnershipContact from 'src/components/Admin/PartnershipContact/PartnershipContact'

export const QUERY = gql`
  query FindPartnershipContactById($id: Int!) {
    partnershipContact: partnershipContact(id: $id) {
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

export const Empty = () => <div>PartnershipContact not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipContact,
}: CellSuccessProps<FindPartnershipContactById>) => {
  return <PartnershipContact partnershipContact={partnershipContact} />
}
