import type { DeleteListMutationVariables, FindLists } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/List/ListsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: Int!) {
    deleteList(id: $id) {
      id
    }
  }
`

const ListsList = ({ lists }: FindLists) => {
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List deleted')
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

  const onDeleteClick = (id: DeleteListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } })
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
            <th>Description</th>
            <th>Type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{truncate(list.id)}</td>
              <td>{timeTag(list.createdAt)}</td>
              <td>{timeTag(list.updatedAt)}</td>
              <td>{truncate(list.name)}</td>
              <td>{truncate(list.description)}</td>
              <td>{formatEnum(list.type)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminList({ id: list.id })}
                    title={'Show list ' + list.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditList({ id: list.id })}
                    title={'Edit list ' + list.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete list ' + list.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(list.id)}
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

export default ListsList
