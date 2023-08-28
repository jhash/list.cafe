import type { FindGroupQuery, FindGroupQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import DashboardGroup from '../DashboardGroup/DashboardGroup'

export const QUERY = gql`
  query FindGroupQuery($id: Int!) {
    group: group(id: $id) {
      id
      name
      visibility
      identifier {
        id
      }
      type
      groupRoles
    }
  }
`

import Spinner from 'src/components/Loading'
export const Loading = () => <Spinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGroupQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  group,
}: CellSuccessProps<FindGroupQuery, FindGroupQueryVariables>) => {
  return <DashboardGroup group={group} />
}
