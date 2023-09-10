import type { CreateGroupMembershipInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GroupMembershipForm from 'src/components/Admin/GroupMembership/GroupMembershipForm'

export const CREATE_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation CreateGroupMembershipMutation($input: CreateGroupMembershipInput!) {
    createGroupMembership(input: $input) {
      id
    }
  }
`

const NewGroupMembership = () => {
  const [createGroupMembership, { loading, error }] = useMutation(
    CREATE_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMembership created')
        navigate(routes.adminGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateGroupMembershipInput) => {
    createGroupMembership({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New GroupMembership</h2>
      </header>
      <div className="rw-segment-main">
        <GroupMembershipForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGroupMembership
