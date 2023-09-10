import type { FindGroupQuery, FindGroupQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'

import DashboardGroup from '../DashboardGroup/DashboardGroup'
import { DashboardGroupChild } from '../DashboardGroupSettings/DashboardGroupSettings'
import GroupProfile from '../GroupProfile/GroupProfile'

export const QUERY = gql`
  query FindGroupQuery($id: Int!) {
    group: group(id: $id) {
      id
      name
      description
      visibility
      identifier {
        id
      }
      type
      groupRoles
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = () => <div>Nothing to see here</div>

export const Failure = ({
  error,
}: CellFailureProps<FindGroupQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export type ListCellProps = FindGroupQuery & {
  dashboard: boolean
  Child?: DashboardGroupChild
}
export const Success = (
  props: CellSuccessProps<ListCellProps, FindGroupQueryVariables>
) => {
  if (!props.dashboard) {
    return <GroupProfile group={props.group} />
  }
  return <DashboardGroup {...props} />
}
