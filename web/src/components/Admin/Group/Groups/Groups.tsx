import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Group/GroupsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteGroupMutationVariables, FindGroups } from 'types/graphql'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

const GroupsList = ({ groups }: FindGroups) => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group deleted')
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

  const onDeleteClick = (id: DeleteGroupMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete group ' + id + '?')) {
      deleteGroup({ variables: { id } })
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
            <th>Name</th>
            <th>Type</th>
            <th>Visibility</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{truncate(group.id)}</td>
              <td>{timeTag(group.createdAt)}</td>
              <td>{timeTag(group.updatedAt)}</td>
              <td>{truncate(group.name)}</td>
              <td>{formatEnum(group.type)}</td>
              <td>{formatEnum(group.visibility)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminGroup({ id: group.id })}
                    title={'Show group ' + group.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditGroup({ id: group.id })}
                    title={'Edit group ' + group.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete group ' + group.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(group.id)}
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

export default GroupsList
