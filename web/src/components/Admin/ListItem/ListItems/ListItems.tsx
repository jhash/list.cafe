import type {
  DeleteListItemMutationVariables,
  FindListItems,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/ListItem/ListItemsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: Int!) {
    deleteListItem(id: $id) {
      id
    }
  }
`

const ListItemsList = ({ listItems }: FindListItems) => {
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('ListItem deleted')
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

  const onDeleteClick = (id: DeleteListItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete listItem ' + id + '?')) {
      deleteListItem({ variables: { id } })
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
            <th>Title</th>
            <th>Description</th>
            <th>Url</th>
            <th>List id</th>
            <th>Quantity</th>
            <th>Voting</th>
            <th>Parent id</th>
            <th>Order</th>
            <th>Price</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listItems.map((listItem) => (
            <tr key={listItem.id}>
              <td>{truncate(listItem.id)}</td>
              <td>{timeTag(listItem.createdAt)}</td>
              <td>{timeTag(listItem.updatedAt)}</td>
              <td>{truncate(listItem.title)}</td>
              <td>{truncate(listItem.description)}</td>
              <td>{truncate(listItem.url)}</td>
              <td>{truncate(listItem.listId)}</td>
              <td>{truncate(listItem.quantity)}</td>
              <td>{checkboxInputTag(listItem.voting)}</td>
              <td>{truncate(listItem.parentId)}</td>
              <td>{truncate(listItem.order)}</td>
              <td>{truncate(listItem.price)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminListItem({ id: listItem.id })}
                    title={'Show listItem ' + listItem.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditListItem({ id: listItem.id })}
                    title={'Edit listItem ' + listItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete listItem ' + listItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(listItem.id)}
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

export default ListItemsList
