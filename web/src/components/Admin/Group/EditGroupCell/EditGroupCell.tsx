import type { EditGroupById, UpdateGroupInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GroupForm from 'src/components/Admin/Group/GroupForm'

export const QUERY = gql`
  query EditGroupById($id: Int!) {
    group: group(id: $id) {
      id
      createdAt
      updatedAt
      name
      type
      visibility
    }
  }
`
export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($id: Int!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      type
      visibility
      identifier {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ group }: CellSuccessProps<EditGroupById>) => {
  const [updateGroup, { loading, error }] = useMutation(UPDATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group updated')
      navigate(routes.adminGroups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateGroupInput,
    id: EditGroupById['group']['id']
  ) => {
    updateGroup({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Group {group?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GroupForm
          group={group}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
