import type { FindPartnershipById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Partnership from 'src/components/Admin/Partnership/Partnership'

export const QUERY = gql`
  query FindPartnershipById($id: Int!) {
    partnership: partnership(id: $id) {
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

export const Empty = () => <div>Partnership not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnership,
}: CellSuccessProps<FindPartnershipById>) => {
  return <Partnership partnership={partnership} />
}
