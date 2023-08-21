import type { EditListItemById, UpdateListItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListItemForm from 'src/components/Admin/ListItem/ListItemForm'

export const QUERY = gql`
  query EditListItemById($id: Int!) {
    listItem: listItem(id: $id) {
      id
      createdAt
      updatedAt
      title
      description
      url
      listId
      quantity
      voting
      parentId
      order
      price
    }
  }
`
const UPDATE_LIST_ITEM_MUTATION = gql`
  mutation UpdateListItemMutation($id: Int!, $input: UpdateListItemInput!) {
    updateListItem(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      title
      description
      url
      listId
      quantity
      voting
      parentId
      order
      price
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ listItem }: CellSuccessProps<EditListItemById>) => {
  const [updateListItem, { loading, error }] = useMutation(
    UPDATE_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListItem updated')
        navigate(routes.adminListItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateListItemInput,
    id: EditListItemById['listItem']['id']
  ) => {
    updateListItem({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ListItem {listItem?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListItemForm
          listItem={listItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
