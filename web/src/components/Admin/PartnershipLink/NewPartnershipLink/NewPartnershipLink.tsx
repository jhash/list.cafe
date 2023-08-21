import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipLinkForm from 'src/components/Admin/PartnershipLink/PartnershipLinkForm'

import type { CreatePartnershipLinkInput } from 'types/graphql'

const CREATE_PARTNERSHIP_LINK_MUTATION = gql`
  mutation CreatePartnershipLinkMutation($input: CreatePartnershipLinkInput!) {
    createPartnershipLink(input: $input) {
      id
    }
  }
`

const NewPartnershipLink = () => {
  const [createPartnershipLink, { loading, error }] = useMutation(
    CREATE_PARTNERSHIP_LINK_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipLink created')
        navigate(routes.adminPartnershipLinks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePartnershipLinkInput) => {
    createPartnershipLink({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PartnershipLink</h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipLinkForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPartnershipLink
