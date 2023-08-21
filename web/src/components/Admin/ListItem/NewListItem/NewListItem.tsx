import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListItemForm from 'src/components/Admin/ListItem/ListItemForm'

import type { CreateListItemInput } from 'types/graphql'

const CREATE_LIST_ITEM_MUTATION = gql`
  mutation CreateListItemMutation($input: CreateListItemInput!) {
    createListItem(input: $input) {
      id
    }
  }
`

const NewListItem = () => {
  const [createListItem, { loading, error }] = useMutation(
    CREATE_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListItem created')
        navigate(routes.adminListItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateListItemInput) => {
    createListItem({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ListItem</h2>
      </header>
      <div className="rw-segment-main">
        <ListItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewListItem
