import type { ListMembershipsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DashboardListMemberships from '../DashboardListMemberships/DashboardListMemberships'

export const QUERY = gql`
  query ListMembershipsQuery($listId: Int!) {
    listMemberships: listMembershipsByListId(listId: $listId) {
      id
      listRole
      listId
      user {
        id
        person {
          name
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  listMemberships,
}: CellSuccessProps<ListMembershipsQuery>) => {
  return <DashboardListMemberships listMemberships={listMemberships} />
}