import type {
  EditGroupMembershipById,
  UpdateGroupMembershipInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GroupMembershipForm from 'src/components/Admin/GroupMembership/GroupMembershipForm'

export const QUERY = gql`
  query EditGroupMembershipById($id: Int!) {
    groupMembership: groupMembership(id: $id) {
      id
      createdAt
      updatedAt
      userId
      groupRole
      groupId
    }
  }
`
const UPDATE_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation UpdateGroupMembershipMutation(
    $id: Int!
    $input: UpdateGroupMembershipInput!
  ) {
    updateGroupMembership(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      userId
      groupRole
      groupId
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  groupMembership,
}: CellSuccessProps<EditGroupMembershipById>) => {
  const [updateGroupMembership, { loading, error }] = useMutation(
    UPDATE_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMembership updated')
        navigate(routes.adminGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateGroupMembershipInput,
    id: EditGroupMembershipById['groupMembership']['id']
  ) => {
    updateGroupMembership({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit GroupMembership {groupMembership?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GroupMembershipForm
          groupMembership={groupMembership}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
