import type { GroupMembershipsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DashboardGroupMemberships from '../DashboardGroupMemberships/DashboardGroupMemberships'

export const QUERY = gql`
  query GroupMembershipsQuery($groupId: Int!) {
    groupMemberships(groupId: $groupId) {
      id
      groupRole
      groupId
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  groupMemberships,
}: CellSuccessProps<GroupMembershipsQuery>) => {
  return <DashboardGroupMemberships groupMemberships={groupMemberships} />
}
