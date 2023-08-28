import type { EditListById, UpdateListInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListForm from 'src/components/Admin/List/ListForm'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query EditListById($id: Int!) {
    list: list(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      type
    }
  }
`
export const UPDATE_LIST_MUTATION = gql`
  mutation UpdateListMutation($id: Int!, $input: UpdateListInput!) {
    updateList(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      description
      type
      identifier {
        id
      }
    }
  }
`

export const Loading = () => <Spinner />

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ list }: CellSuccessProps<EditListById>) => {
  const [updateList, { loading, error }] = useMutation(UPDATE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List updated')
      navigate(routes.adminLists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateListInput, id: EditListById['list']['id']) => {
    updateList({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit List {list?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListForm list={list} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
