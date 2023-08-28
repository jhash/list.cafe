import type { FindGroupById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Group from 'src/components/Admin/Group/Group'
import Spinner from 'src/components/Loading'

export const QUERY = gql`
  query FindGroupById($id: Int!) {
    group: group(id: $id) {
      id
      createdAt
      updatedAt
      name
      type
      visibility
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Group not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ group }: CellSuccessProps<FindGroupById>) => {
  return <Group group={group} />
}
