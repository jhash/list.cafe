import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/ListGroupMembership/ListGroupMembershipsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteListGroupMembershipMutationVariables,
  FindListGroupMemberships,
} from 'types/graphql'

const DELETE_LIST_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation DeleteListGroupMembershipMutation($id: Int!) {
    deleteListGroupMembership(id: $id) {
      id
    }
  }
`

const ListGroupMembershipsList = ({
  listGroupMemberships,
}: FindListGroupMemberships) => {
  const [deleteListGroupMembership] = useMutation(
    DELETE_LIST_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListGroupMembership deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
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
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>List role</th>
            <th>List id</th>
            <th>Group id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listGroupMemberships.map((listGroupMembership) => (
            <tr key={listGroupMembership.id}>
              <td>{truncate(listGroupMembership.id)}</td>
              <td>{timeTag(listGroupMembership.createdAt)}</td>
              <td>{timeTag(listGroupMembership.updatedAt)}</td>
              <td>{formatEnum(listGroupMembership.listRole)}</td>
              <td>{truncate(listGroupMembership.listId)}</td>
              <td>{truncate(listGroupMembership.groupId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminListGroupMembership({
                      id: listGroupMembership.id,
                    })}
                    title={
                      'Show listGroupMembership ' +
                      listGroupMembership.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditListGroupMembership({
                      id: listGroupMembership.id,
                    })}
                    title={'Edit listGroupMembership ' + listGroupMembership.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={
                      'Delete listGroupMembership ' + listGroupMembership.id
                    }
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(listGroupMembership.id)}
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

export default ListGroupMembershipsList
