import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipForm from 'src/components/Admin/Partnership/PartnershipForm'

import type { CreatePartnershipInput } from 'types/graphql'

const CREATE_PARTNERSHIP_MUTATION = gql`
  mutation CreatePartnershipMutation($input: CreatePartnershipInput!) {
    createPartnership(input: $input) {
      id
    }
  }
`

const NewPartnership = () => {
  const [createPartnership, { loading, error }] = useMutation(
    CREATE_PARTNERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Partnership created')
        navigate(routes.adminPartnerships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePartnershipInput) => {
    createPartnership({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Partnership</h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPartnership
