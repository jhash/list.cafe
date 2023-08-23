import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListGroupMembershipForm from 'src/components/Admin/ListGroupMembership/ListGroupMembershipForm'

import type { CreateListGroupMembershipInput } from 'types/graphql'

const CREATE_LIST_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation CreateListGroupMembershipMutation(
    $input: CreateListGroupMembershipInput!
  ) {
    createListGroupMembership(input: $input) {
      id
    }
  }
`

const NewListGroupMembership = () => {
  const [createListGroupMembership, { loading, error }] = useMutation(
    CREATE_LIST_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListGroupMembership created')
        navigate(routes.adminListGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateListGroupMembershipInput) => {
    createListGroupMembership({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          New ListGroupMembership
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListGroupMembershipForm
          onSave={onSave}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}

export default NewListGroupMembership
