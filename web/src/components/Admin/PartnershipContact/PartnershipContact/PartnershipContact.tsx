import type {
  DeletePartnershipContactMutationVariables,
  FindPartnershipContactById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_PARTNERSHIP_CONTACT_MUTATION = gql`
  mutation DeletePartnershipContactMutation($id: Int!) {
    deletePartnershipContact(id: $id) {
      id
    }
  }
`

interface Props {
  partnershipContact: NonNullable<
    FindPartnershipContactById['partnershipContact']
  >
}

const PartnershipContact = ({ partnershipContact }: Props) => {
  const [deletePartnershipContact] = useMutation(
    DELETE_PARTNERSHIP_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipContact deleted')
        navigate(routes.adminPartnershipContacts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PartnershipContact {partnershipContact.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{partnershipContact.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(partnershipContact.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(partnershipContact.updatedAt)}</td>
            </tr>
            <tr>
              <th>Person id</th>
              <td>{partnershipContact.personId}</td>
            </tr>
            <tr>
              <th>Partnership id</th>
              <td>{partnershipContact.partnershipId}</td>
            </tr>
            <tr>
              <th>Added by user id</th>
              <td>{partnershipContact.addedByUserId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditPartnershipContact({ id: partnershipContact.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(partnershipContact.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PartnershipContact
