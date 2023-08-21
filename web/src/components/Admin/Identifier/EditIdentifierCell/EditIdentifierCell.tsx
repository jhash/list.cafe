import type { EditIdentifierById, UpdateIdentifierInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import IdentifierForm from 'src/components/Admin/Identifier/IdentifierForm'

export const QUERY = gql`
  query EditIdentifierById($id: String!) {
    identifier: identifier(id: $id) {
      id
      personId
      listId
      groupId
    }
  }
`
const UPDATE_IDENTIFIER_MUTATION = gql`
  mutation UpdateIdentifierMutation(
    $id: String!
    $input: UpdateIdentifierInput!
  ) {
    updateIdentifier(id: $id, input: $input) {
      id
      personId
      listId
      groupId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  identifier,
}: CellSuccessProps<EditIdentifierById>) => {
  const [updateIdentifier, { loading, error }] = useMutation(
    UPDATE_IDENTIFIER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Identifier updated')
        navigate(routes.adminIdentifiers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateIdentifierInput,
    id: EditIdentifierById['identifier']['id']
  ) => {
    updateIdentifier({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Identifier {identifier?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <IdentifierForm
          identifier={identifier}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
