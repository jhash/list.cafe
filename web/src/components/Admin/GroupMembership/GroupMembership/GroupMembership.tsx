import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

import type {
  DeleteGroupMembershipMutationVariables,
  FindGroupMembershipById,
} from 'types/graphql'

const DELETE_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation DeleteGroupMembershipMutation($id: Int!) {
    deleteGroupMembership(id: $id) {
      id
    }
  }
`

interface Props {
  groupMembership: NonNullable<FindGroupMembershipById['groupMembership']>
}

const GroupMembership = ({ groupMembership }: Props) => {
  const [deleteGroupMembership] = useMutation(
    DELETE_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMembership deleted')
        navigate(routes.adminGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id: DeleteGroupMembershipMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete groupMembership ' + id + '?')
    ) {
      deleteGroupMembership({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            GroupMembership {groupMembership.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{groupMembership.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(groupMembership.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(groupMembership.updatedAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{groupMembership.userId}</td>
            </tr>
            <tr>
              <th>Group role</th>
              <td>{formatEnum(groupMembership.groupRole)}</td>
            </tr>
            <tr>
              <th>Group id</th>
              <td>{groupMembership.groupId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditGroupMembership({ id: groupMembership.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(groupMembership.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default GroupMembership
