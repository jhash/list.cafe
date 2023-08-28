import type {
  DeletePartnershipContactMutationVariables,
  FindPartnershipContacts,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/PartnershipContact/PartnershipContactsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_PARTNERSHIP_CONTACT_MUTATION = gql`
  mutation DeletePartnershipContactMutation($id: Int!) {
    deletePartnershipContact(id: $id) {
      id
    }
  }
`

const PartnershipContactsList = ({
  partnershipContacts,
}: FindPartnershipContacts) => {
  const [deletePartnershipContact] = useMutation(
    DELETE_PARTNERSHIP_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipContact deleted')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeletePartnershipContactMutationVariables['id']
  ) => {
    if (
      confirm('Are you sure you want to delete partnershipContact ' + id + '?')
    ) {
      deletePartnershipContact({ variables: { id } })
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
            <th>Person id</th>
            <th>Partnership id</th>
            <th>Added by user id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {partnershipContacts.map((partnershipContact) => (
            <tr key={partnershipContact.id}>
              <td>{truncate(partnershipContact.id)}</td>
              <td>{timeTag(partnershipContact.createdAt)}</td>
              <td>{timeTag(partnershipContact.updatedAt)}</td>
              <td>{truncate(partnershipContact.personId)}</td>
              <td>{truncate(partnershipContact.partnershipId)}</td>
              <td>{truncate(partnershipContact.addedByUserId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPartnershipContact({
                      id: partnershipContact.id,
                    })}
                    title={
                      'Show partnershipContact ' +
                      partnershipContact.id +
                      ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPartnershipContact({
                      id: partnershipContact.id,
                    })}
                    title={'Edit partnershipContact ' + partnershipContact.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete partnershipContact ' + partnershipContact.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(partnershipContact.id)}
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

export default PartnershipContactsList
