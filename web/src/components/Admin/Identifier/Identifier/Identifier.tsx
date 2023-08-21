import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteIdentifierMutationVariables,
  FindIdentifierById,
} from 'types/graphql'

const DELETE_IDENTIFIER_MUTATION = gql`
  mutation DeleteIdentifierMutation($id: String!) {
    deleteIdentifier(id: $id) {
      id
    }
  }
`

interface Props {
  identifier: NonNullable<FindIdentifierById['identifier']>
}

const Identifier = ({ identifier }: Props) => {
  const [deleteIdentifier] = useMutation(DELETE_IDENTIFIER_MUTATION, {
    onCompleted: () => {
      toast.success('Identifier deleted')
      navigate(routes.adminIdentifiers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteIdentifierMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete identifier ' + id + '?')) {
      deleteIdentifier({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Identifier {identifier.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{identifier.id}</td>
            </tr>
            <tr>
              <th>Person id</th>
              <td>{identifier.personId}</td>
            </tr>
            <tr>
              <th>List id</th>
              <td>{identifier.listId}</td>
            </tr>
            <tr>
              <th>Group id</th>
              <td>{identifier.groupId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditIdentifier({ id: identifier.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(identifier.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Identifier
