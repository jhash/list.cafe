import type { CreatePartnershipContactInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PartnershipContactForm from 'src/components/Admin/PartnershipContact/PartnershipContactForm'

const CREATE_PARTNERSHIP_CONTACT_MUTATION = gql`
  mutation CreatePartnershipContactMutation(
    $input: CreatePartnershipContactInput!
  ) {
    createPartnershipContact(input: $input) {
      id
    }
  }
`

const NewPartnershipContact = () => {
  const [createPartnershipContact, { loading, error }] = useMutation(
    CREATE_PARTNERSHIP_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipContact created')
        navigate(routes.adminPartnershipContacts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePartnershipContactInput) => {
    createPartnershipContact({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New PartnershipContact
        </h2>
      </header>
      <div className="rw-segment-main">
        <PartnershipContactForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewPartnershipContact
