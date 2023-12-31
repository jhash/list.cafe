import { ComponentType } from 'react'

import type {
  CreateListInput,
  CreateListItemInput,
  FindListQuery,
  FindListQueryVariables,
  ListItemsQuery,
  UpdateListInput,
} from 'types/graphql'

import { SignupAttributes } from '@redwoodjs/auth-dbauth-web'
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
      owners {
        name
        images {
          id
          alt
          url
        }
        identifier {
          id
        }
      }
      groupOwners {
        name
        identifier {
          id
        }
      }
      groupRoles
      groupListRoles
    }
  }
`

export const Loading = () => <Spinner />

export const Empty = ({ dashboard }: ListCellProps) => (
  <Redirect
    to={dashboard ? routes.lists() : routes.home()}
    options={{ replace: true }}
  />
)

export const Failure = ({ dashboard }: ListCellProps) => (
  // {
  //   error,
  // }: CellFailureProps<FindListQueryVariables>
  <Redirect
    to={dashboard ? routes.lists() : routes.home()}
    options={{ replace: true }}
  />
)

export type ListCellProps = FindListQuery & {
  dashboard?: boolean
  Child?: ListCellChild
}
export type ListCellType = ComponentType<ListCellProps>
export interface ListCellChildProps {
  list: FindListQuery['list']
  items?: ListItemsQuery['listItems'] | CreateListItemInput[]
  loading: boolean
  canSave: boolean
  canEdit: boolean
  canDelete: boolean
  canAddMembers: boolean
  onDelete: () => void
  onSave: (input: CreateListInput | UpdateListInput) => void
  deleteItem: () => void
  addItem: (input: CreateListItemInput) => void
  signUpAndCreateList: (input: SignupAttributes) => Promise<void>
  pendingList: CreateListInput
  resetPendingList: () => void
}
export type ListCellChild = ComponentType<ListCellChildProps>

export const Success = ({
  list,
  Child,
  dashboard,
}: CellSuccessProps<ListCellProps, FindListQueryVariables>) => {
  if (dashboard && !list.listRoles.length && !list.groupListRoles?.length) {
    return <Redirect to={routes.lists()} options={{ replace: true }} />
  }

  const childProps = { list, Child }

  if (dashboard) {
    return <DashboardListLayout {...childProps} />
  }

  return <PublicList {...childProps} />
}
