import type {
  EditListGroupMembershipById,
  UpdateListGroupMembershipInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListGroupMembershipForm from 'src/components/Admin/ListGroupMembership/ListGroupMembershipForm'

export const QUERY = gql`
  query EditListGroupMembershipById($id: Int!) {
    listGroupMembership: listGroupMembership(id: $id) {
      id
      createdAt
      updatedAt
      listRole
      listId
      groupId
    }
  }
`
const UPDATE_LIST_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation UpdateListGroupMembershipMutation(
    $id: Int!
    $input: UpdateListGroupMembershipInput!
  ) {
    updateListGroupMembership(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      listRole
      listId
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
  listGroupMembership,
}: CellSuccessProps<EditListGroupMembershipById>) => {
  const [updateListGroupMembership, { loading, error }] = useMutation(
    UPDATE_LIST_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListGroupMembership updated')
        navigate(routes.adminListGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateListGroupMembershipInput,
    id: EditListGroupMembershipById['listGroupMembership']['id']
  ) => {
    updateListGroupMembership({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ListGroupMembership {listGroupMembership?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListGroupMembershipForm
          listGroupMembership={listGroupMembership}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
