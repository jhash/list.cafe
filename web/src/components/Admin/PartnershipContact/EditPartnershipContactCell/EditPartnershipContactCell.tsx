import type {
  EditPartnershipContactById,
  UpdatePartnershipContactInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipContactForm from 'src/components/Admin/PartnershipContact/PartnershipContactForm'

export const QUERY = gql`
  query EditPartnershipContactById($id: Int!) {
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
const UPDATE_PARTNERSHIP_CONTACT_MUTATION = gql`
  mutation UpdatePartnershipContactMutation(
    $id: Int!
    $input: UpdatePartnershipContactInput!
  ) {
    updatePartnershipContact(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      personId
      partnershipId
      addedByUserId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnershipContact,
}: CellSuccessProps<EditPartnershipContactById>) => {
  const [updatePartnershipContact, { loading, error }] = useMutation(
    UPDATE_PARTNERSHIP_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipContact updated')
        navigate(routes.adminPartnershipContacts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePartnershipContactInput,
    id: EditPartnershipContactById['partnershipContact']['id']
  ) => {
    updatePartnershipContact({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PartnershipContact {partnershipContact?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipContactForm
          partnershipContact={partnershipContact}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
