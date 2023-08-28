import type { EditPartnershipById, UpdatePartnershipInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipForm from 'src/components/Admin/Partnership/PartnershipForm'

export const QUERY = gql`
  query EditPartnershipById($id: Int!) {
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
const UPDATE_PARTNERSHIP_MUTATION = gql`
  mutation UpdatePartnershipMutation(
    $id: Int!
    $input: UpdatePartnershipInput!
  ) {
    updatePartnership(id: $id, input: $input) {
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

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  partnership,
}: CellSuccessProps<EditPartnershipById>) => {
  const [updatePartnership, { loading, error }] = useMutation(
    UPDATE_PARTNERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Partnership updated')
        navigate(routes.adminPartnerships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePartnershipInput,
    id: EditPartnershipById['partnership']['id']
  ) => {
    updatePartnership({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Partnership {partnership?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipForm
          partnership={partnership}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
