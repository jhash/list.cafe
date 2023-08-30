import { ComponentType } from 'react'

import type {
  CreateListInput,
  CreateListItemInput,
  FindListQuery,
  FindListQueryVariables,
  ListItemsQuery,
  UpdateListInput,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import { type CellSuccessProps } from '@redwoodjs/web'

import Spinner from 'src/components/Loading'
import DashboardListLayout from 'src/layouts/DashboardListLayout/DashboardListLayout'

import PublicList from '../PublicList/PublicList'

export const QUERY = gql`
  query FindListQuery($id: Int!) {
    list: list(id: $id) {
      id
      name
      description
      identifier {
        id
      }
      type
      visibility
      listRoles
      listMemberships {
        id
      }
      listGroupMemberships {
        id
      }
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = ({ dashboard }: ListCellProps) => (
  <Redirect to={dashboard ? routes.lists() : routes.home()} />
)

export const Failure = ({ dashboard }: ListCellProps) => (
  // {
  //   error,
  // }: CellFailureProps<FindListQueryVariables>
  <Redirect to={dashboard ? routes.lists() : routes.home()} />
)

export type ListCellProps = FindListQuery & {
  dashboard?: boolean
  Child?: ListCellChild
}
export type ListCellType = ComponentType<ListCellProps>
export interface ListCellChildProps {
  list: FindListQuery['list']
  items?: ListItemsQuery['listItems']
  loading: boolean
  canSave: boolean
  canDelete: boolean
  onDelete: () => void
  onSave: (input: CreateListInput | UpdateListInput) => void
  deleteItem: () => void
  addItem: (input: CreateListItemInput) => void
}
export type ListCellChild = ComponentType<ListCellChildProps>

export const Success = ({
  list,
  Child,
  dashboard,
}: CellSuccessProps<ListCellProps, FindListQueryVariables>) => {
  if (dashboard && !list.listRoles.length) {
    return <Redirect to={routes.lists()} />
  }

  const childProps = { list, Child }

  if (dashboard) {
    return <DashboardListLayout {...childProps} />
  }

  return <PublicList {...childProps} />
}
