import type {
  DeleteListGroupMembershipMutationVariables,
  FindListGroupMembershipById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_LIST_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation DeleteListGroupMembershipMutation($id: Int!) {
    deleteListGroupMembership(id: $id) {
      id
    }
  }
`

interface Props {
  listGroupMembership: NonNullable<
    FindListGroupMembershipById['listGroupMembership']
  >
}

const ListGroupMembership = ({ listGroupMembership }: Props) => {
  const [deleteListGroupMembership] = useMutation(
    DELETE_LIST_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListGroupMembership deleted')
        navigate(routes.adminListGroupMemberships())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteListGroupMembershipMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete listGroupMembership ' + id + '?')
    ) {
      deleteListGroupMembership({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ListGroupMembership {listGroupMembership.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{listGroupMembership.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(listGroupMembership.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(listGroupMembership.updatedAt)}</td>
            </tr>
            <tr>
              <th>List role</th>
              <td>{formatEnum(listGroupMembership.listRole)}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{listGroupMembership.listId}</td>
            </tr>
            <tr>
              <th>Group id</th>
              <td>{listGroupMembership.groupId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditListGroupMembership({
            id: listGroupMembership.id,
          })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(listGroupMembership.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ListGroupMembership
