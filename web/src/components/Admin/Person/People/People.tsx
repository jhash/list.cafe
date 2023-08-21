import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Person/PeopleCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeletePersonMutationVariables, FindPeople } from 'types/graphql'

const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: Int!) {
    deletePerson(id: $id) {
      id
    }
  }
`

const PeopleList = ({ people }: FindPeople) => {
  const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
    onCompleted: () => {
      toast.success('Person deleted')
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

  const onDeleteClick = (id: DeletePersonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete person ' + id + '?')) {
      deletePerson({ variables: { id } })
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
            <th>Email</th>
            <th>Default address id</th>
            <th>Created by user id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{truncate(person.id)}</td>
              <td>{timeTag(person.createdAt)}</td>
              <td>{timeTag(person.updatedAt)}</td>
              <td>{truncate(person.name)}</td>
              <td>{truncate(person.email)}</td>
              <td>{truncate(person.defaultAddressId)}</td>
              <td>{truncate(person.createdByUserId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPerson({ id: person.id })}
                    title={'Show person ' + person.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPerson({ id: person.id })}
                    title={'Edit person ' + person.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete person ' + person.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(person.id)}
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

export default PeopleList
