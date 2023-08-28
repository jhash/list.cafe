import type {
  DeletePartnershipLinkMutationVariables,
  FindPartnershipLinks,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/PartnershipLink/PartnershipLinksCell'
import { formatEnum, timeTag, truncate } from 'src/lib/formatters'

const DELETE_PARTNERSHIP_LINK_MUTATION = gql`
  mutation DeletePartnershipLinkMutation($id: String!) {
    deletePartnershipLink(id: $id) {
      id
    }
  }
`

const PartnershipLinksList = ({ partnershipLinks }: FindPartnershipLinks) => {
  const [deletePartnershipLink] = useMutation(
    DELETE_PARTNERSHIP_LINK_MUTATION,
    {
      onCompleted: () => {
        toast.success('PartnershipLink deleted')
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

  const onDeleteClick = (id: DeletePartnershipLinkMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete partnershipLink ' + id + '?')
    ) {
      deletePartnershipLink({ variables: { id } })
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
            <th>Status</th>
            <th>Original url</th>
            <th>Partnership id</th>
            <th>List item id</th>
            <th>Created by user id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {partnershipLinks.map((partnershipLink) => (
            <tr key={partnershipLink.id}>
              <td>{truncate(partnershipLink.id)}</td>
              <td>{timeTag(partnershipLink.createdAt)}</td>
              <td>{timeTag(partnershipLink.updatedAt)}</td>
              <td>{formatEnum(partnershipLink.status)}</td>
              <td>{truncate(partnershipLink.originalUrl)}</td>
              <td>{truncate(partnershipLink.partnershipId)}</td>
              <td>{truncate(partnershipLink.listItemId)}</td>
              <td>{truncate(partnershipLink.createdByUserId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminPartnershipLink({ id: partnershipLink.id })}
                    title={
                      'Show partnershipLink ' + partnershipLink.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditPartnershipLink({
                      id: partnershipLink.id,
                    })}
                    title={'Edit partnershipLink ' + partnershipLink.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete partnershipLink ' + partnershipLink.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(partnershipLink.id)}
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

export default PartnershipLinksList
