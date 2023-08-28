import type {
  EditListMembershipById,
  UpdateListMembershipInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListMembershipForm from 'src/components/Admin/ListMembership/ListMembershipForm'

export const QUERY = gql`
  query EditListMembershipById($id: Int!) {
    listMembership: listMembership(id: $id) {
      id
      createdAt
      updatedAt
      listRole
      listId
      userId
    }
  }
`
export const UPDATE_LIST_MEMBERSHIP_MUTATION = gql`
  mutation UpdateListMembershipMutation(
    $id: Int!
    $input: UpdateListMembershipInput!
  ) {
    updateListMembership(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      listRole
      listId
      userId
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listMembership,
}: CellSuccessProps<EditListMembershipById>) => {
  const [updateListMembership, { loading, error }] = useMutation(
    UPDATE_LIST_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListMembership updated')
        navigate(routes.adminListMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateListMembershipInput,
    id: EditListMembershipById['listMembership']['id']
  ) => {
    updateListMembership({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ListMembership {listMembership?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListMembershipForm
          listMembership={listMembership}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
