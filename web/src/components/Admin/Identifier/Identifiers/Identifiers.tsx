import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Identifier/IdentifiersCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteIdentifierMutationVariables,
  FindIdentifiers,
} from 'types/graphql'

const DELETE_IDENTIFIER_MUTATION = gql`
  mutation DeleteIdentifierMutation($id: String!) {
    deleteIdentifier(id: $id) {
      id
    }
  }
`

const IdentifiersList = ({ identifiers }: FindIdentifiers) => {
  const [deleteIdentifier] = useMutation(DELETE_IDENTIFIER_MUTATION, {
    onCompleted: () => {
      toast.success('Identifier deleted')
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

  const onDeleteClick = (id: DeleteIdentifierMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete identifier ' + id + '?')) {
      deleteIdentifier({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Person id</th>
            <th>List id</th>
            <th>Group id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {identifiers.map((identifier) => (
            <tr key={identifier.id}>
              <td>{truncate(identifier.id)}</td>
              <td>{truncate(identifier.personId)}</td>
              <td>{truncate(identifier.listId)}</td>
              <td>{truncate(identifier.groupId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminIdentifier({ id: identifier.id })}
                    title={'Show identifier ' + identifier.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditIdentifier({ id: identifier.id })}
                    title={'Edit identifier ' + identifier.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete identifier ' + identifier.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(identifier.id)}
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

export default IdentifiersList
