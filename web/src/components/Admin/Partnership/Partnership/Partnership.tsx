import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

import type {
  DeletePartnershipMutationVariables,
  FindPartnershipById,
} from 'types/graphql'

const DELETE_PARTNERSHIP_MUTATION = gql`
  mutation DeletePartnershipMutation($id: Int!) {
    deletePartnership(id: $id) {
      id
    }
  }
`

interface Props {
  partnership: NonNullable<FindPartnershipById['partnership']>
}

const Partnership = ({ partnership }: Props) => {
  const [deletePartnership] = useMutation(DELETE_PARTNERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Partnership deleted')
      navigate(routes.adminPartnerships())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePartnershipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete partnership ' + id + '?')) {
      deletePartnership({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Partnership {partnership.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{partnership.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(partnership.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(partnership.updatedAt)}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{partnership.name}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{partnership.notes}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(partnership.status)}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{partnership.url}</td>
            </tr>
            <tr>
              <th>Affiliate id</th>
              <td>{partnership.affiliateId}</td>
            </tr>
            <tr>
              <th>Affiliate id param</th>
              <td>{partnership.affiliateIdParam}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditPartnership({ id: partnership.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(partnership.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Partnership
