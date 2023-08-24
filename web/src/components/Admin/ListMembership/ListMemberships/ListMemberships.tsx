import type {
  DeleteListMembershipMutationVariables,
  FindListMemberships,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/ListMembership/ListMembershipsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

export const DELETE_LIST_MEMBERSHIP_MUTATION = gql`
  mutation DeleteListMembershipMutation($id: Int!) {
    deleteListMembership(id: $id) {
      id
    }
  }
`

const ListMembershipsList = ({ listMemberships }: FindListMemberships) => {
  const [deleteListMembership] = useMutation(DELETE_LIST_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('ListMembership deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteListMembershipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete listMembership ' + id + '?')) {
      deleteListMembership({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>List role</th>
            <th>List id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listMemberships.map((listMembership) => (
            <tr key={listMembership.id}>
              <td>{truncate(listMembership.id)}</td>
              <td>{timeTag(listMembership.createdAt)}</td>
              <td>{timeTag(listMembership.updatedAt)}</td>
              <td>{formatEnum(listMembership.listRole)}</td>
              <td>{truncate(listMembership.listId)}</td>
              <td>{truncate(listMembership.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminListMembership({ id: listMembership.id })}
                    title={
                      'Show listMembership ' + listMembership.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditListMembership({
                      id: listMembership.id,
                    })}
                    title={'Edit listMembership ' + listMembership.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete listMembership ' + listMembership.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(listMembership.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListMembershipsList
