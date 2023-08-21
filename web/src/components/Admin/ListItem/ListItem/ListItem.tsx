import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

import type {
  DeleteListItemMutationVariables,
  FindListItemById,
} from 'types/graphql'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: Int!) {
    deleteListItem(id: $id) {
      id
    }
  }
`

interface Props {
  listItem: NonNullable<FindListItemById['listItem']>
}

const ListItem = ({ listItem }: Props) => {
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('ListItem deleted')
      navigate(routes.adminListItems())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteListItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete listItem ' + id + '?')) {
      deleteListItem({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ListItem {listItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{listItem.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(listItem.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(listItem.updatedAt)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{listItem.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{listItem.description}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{listItem.url}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{listItem.listId}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{listItem.quantity}</td>
            </tr>
            <tr>
              <th>Voting</th>
              <td>{checkboxInputTag(listItem.voting)}</td>
            </tr>
            <tr>
              <th>Parent id</th>
              <td>{listItem.parentId}</td>
            </tr>
            <tr>
              <th>Order</th>
              <td>{listItem.order}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{listItem.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditListItem({ id: listItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(listItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ListItem
