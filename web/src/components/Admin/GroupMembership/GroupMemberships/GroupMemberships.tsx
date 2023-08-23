import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/GroupMembership/GroupMembershipsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteGroupMembershipMutationVariables,
  FindGroupMemberships,
} from 'types/graphql'

const DELETE_GROUP_MEMBERSHIP_MUTATION = gql`
  mutation DeleteGroupMembershipMutation($id: Int!) {
    deleteGroupMembership(id: $id) {
      id
    }
  }
`

const GroupMembershipsList = ({ groupMemberships }: FindGroupMemberships) => {
  const [deleteGroupMembership] = useMutation(
    DELETE_GROUP_MEMBERSHIP_MUTATION,
    {
      onCompleted: () => {
        toast.success('GroupMembership deleted')
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

  const onDeleteClick = (id: DeleteGroupMembershipMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete groupMembership ' + id + '?')
    ) {
      deleteGroupMembership({ variables: { id } })
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
            <th>User id</th>
            <th>Group role</th>
            <th>Group id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groupMemberships.map((groupMembership) => (
            <tr key={groupMembership.id}>
              <td>{truncate(groupMembership.id)}</td>
              <td>{timeTag(groupMembership.createdAt)}</td>
              <td>{timeTag(groupMembership.updatedAt)}</td>
              <td>{truncate(groupMembership.userId)}</td>
              <td>{formatEnum(groupMembership.groupRole)}</td>
              <td>{truncate(groupMembership.groupId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminGroupMembership({ id: groupMembership.id })}
                    title={
                      'Show groupMembership ' + groupMembership.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditGroupMembership({
                      id: groupMembership.id,
                    })}
                    title={'Edit groupMembership ' + groupMembership.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete groupMembership ' + groupMembership.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(groupMembership.id)}
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

export default GroupMembershipsList
