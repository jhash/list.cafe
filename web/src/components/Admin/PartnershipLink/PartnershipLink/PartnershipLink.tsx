import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

import type {
  DeletePartnershipLinkMutationVariables,
  FindPartnershipLinkById,
} from 'types/graphql'

const DELETE_PARTNERSHIP_LINK_MUTATION = gql`
  mutation DeletePartnershipLinkMutation($id: String!) {
    deletePartnershipLink(id: $id) {
      id
    }
  }
`

interface Props {
  partnershipLink: NonNullable<FindPartnershipLinkById['partnershipLink']>
}

const PartnershipLink = ({ partnershipLink }: Props) => {
  const [deletePartnershipLink] = useMutation(
    DELETE_PARTNERSHIP_LINK_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipLink deleted')
        navigate(routes.adminPartnershipLinks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id: DeletePartnershipLinkMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete partnershipLink ' + id + '?')
    ) {
      deletePartnershipLink({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PartnershipLink {partnershipLink.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{partnershipLink.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(partnershipLink.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(partnershipLink.updatedAt)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(partnershipLink.status)}</td>
            </tr>
            <tr>
              <th>Original url</th>
              <td>{partnershipLink.originalUrl}</td>
            </tr>
            <tr>
              <th>Partnership id</th>
              <td>{partnershipLink.partnershipId}</td>
            </tr>
            <tr>
              <th>List item id</th>
              <td>{partnershipLink.listItemId}</td>
            </tr>
            <tr>
              <th>Created by user id</th>
              <td>{partnershipLink.createdByUserId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditPartnershipLink({ id: partnershipLink.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(partnershipLink.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PartnershipLink
