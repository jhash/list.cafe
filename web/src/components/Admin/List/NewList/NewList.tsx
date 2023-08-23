import type { CreateListInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListForm from 'src/components/Admin/List/ListForm'

export const CREATE_LIST_MUTATION = gql`
  mutation CreateListMutation($input: CreateListInput!) {
    createList(input: $input) {
      id
      name
      identifier {
        id
      }
      description
      type
    }
  }
`

const NewList = () => {
  const [createList, { loading, error }] = useMutation(CREATE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List created')
      navigate(routes.adminLists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateListInput) => {
    createList({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New List</h2>
      </header>
      <div className="rw-segment-main">
        <ListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewList
