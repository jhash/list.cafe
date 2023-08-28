import type {
  DeleteListMembershipMutationVariables,
  FindListMembershipById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_LIST_MEMBERSHIP_MUTATION = gql`
  mutation DeleteListMembershipMutation($id: Int!) {
    deleteListMembership(id: $id) {
      id
    }
  }
`

interface Props {
  listMembership: NonNullable<FindListMembershipById['listMembership']>
}

const ListMembership = ({ listMembership }: Props) => {
  const [deleteListMembership] = useMutation(DELETE_LIST_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('ListMembership deleted')
      navigate(routes.adminListMemberships())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteListMembershipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete listMembership ' + id + '?')) {
      deleteListMembership({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ListMembership {listMembership.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{listMembership.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(listMembership.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(listMembership.updatedAt)}</td>
            </tr>
            <tr>
              <th>List role</th>
              <td>{formatEnum(listMembership.listRole)}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{listMembership.listId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{listMembership.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditListMembership({ id: listMembership.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(listMembership.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ListMembership
