import type { ListMembershipsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

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
          visibility
          images {
            id
            url
            alt
          }
          identifier {
            id
          }
        }
      }
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>No members added yet</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  listMemberships,
}: CellSuccessProps<ListMembershipsQuery>) => {
  return <DashboardListMemberships listMemberships={listMemberships} />
}
