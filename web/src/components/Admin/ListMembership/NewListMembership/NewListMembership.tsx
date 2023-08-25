import type { CreateListMembershipInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListMembershipForm from 'src/components/Admin/ListMembership/ListMembershipForm'

export const CREATE_LIST_MEMBERSHIP_MUTATION = gql`
  mutation CreateListMembershipMutation($input: CreateListMembershipInput!) {
    createListMembership(input: $input) {
      id
    }
  }
`

const NewListMembership = () => {
  const [createListMembership, { loading, error }] = useMutation(
    CREATE_LIST_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListMembership created')
        navigate(routes.adminListMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateListMembershipInput) => {
    createListMembership({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ListMembership</h2>
      </header>
      <div className="rw-segment-main">
        <ListMembershipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewListMembership
