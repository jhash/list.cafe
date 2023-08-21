import type {
  EditPartnershipLinkById,
  UpdatePartnershipLinkInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipLinkForm from 'src/components/Admin/PartnershipLink/PartnershipLinkForm'

export const QUERY = gql`
  query EditPartnershipLinkById($id: String!) {
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
const UPDATE_PARTNERSHIP_LINK_MUTATION = gql`
  mutation UpdatePartnershipLinkMutation(
    $id: String!
    $input: UpdatePartnershipLinkInput!
  ) {
    updatePartnershipLink(id: $id, input: $input) {
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipLink,
}: CellSuccessProps<EditPartnershipLinkById>) => {
  const [updatePartnershipLink, { loading, error }] = useMutation(
    UPDATE_PARTNERSHIP_LINK_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipLink updated')
        navigate(routes.adminPartnershipLinks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePartnershipLinkInput,
    id: EditPartnershipLinkById['partnershipLink']['id']
  ) => {
    updatePartnershipLink({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PartnershipLink {partnershipLink?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipLinkForm
          partnershipLink={partnershipLink}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
