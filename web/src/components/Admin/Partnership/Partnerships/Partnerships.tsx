import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Partnership/PartnershipsCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeletePartnershipMutationVariables,
  FindPartnerships,
} from 'types/graphql'

const DELETE_PARTNERSHIP_MUTATION = gql`
  mutation DeletePartnershipMutation($id: Int!) {
    deletePartnership(id: $id) {
      id
    }
  }
`

const PartnershipsList = ({ partnerships }: FindPartnerships) => {
  const [deletePartnership] = useMutation(DELETE_PARTNERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Partnership deleted')
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

  const onDeleteClick = (id: DeletePartnershipMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete partnership ' + id + '?')) {
      deletePartnership({ variables: { id } })
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
            <th>Notes</th>
            <th>Status</th>
            <th>Url</th>
            <th>Affiliate id</th>
            <th>Affiliate id param</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {partnerships.map((partnership) => (
            <tr key={partnership.id}>
              <td>{truncate(partnership.id)}</td>
              <td>{timeTag(partnership.createdAt)}</td>
              <td>{timeTag(partnership.updatedAt)}</td>
              <td>{truncate(partnership.name)}</td>
              <td>{truncate(partnership.notes)}</td>
              <td>{formatEnum(partnership.status)}</td>
              <td>{truncate(partnership.url)}</td>
              <td>{truncate(partnership.affiliateId)}</td>
              <td>{truncate(partnership.affiliateIdParam)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPartnership({ id: partnership.id })}
                    title={'Show partnership ' + partnership.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPartnership({ id: partnership.id })}
                    title={'Edit partnership ' + partnership.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete partnership ' + partnership.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(partnership.id)}
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

export default PartnershipsList
