import { ComponentType } from 'react'

import type {
  FindListQuery,
  FindListQueryVariables,
  ListItemsQuery,
} from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  // type CellFailureProps,
  MetaTags,
  useQuery,
} from '@redwoodjs/web'

import ListItemsCell from 'src/components/ListItemsCell'
import { QUERY as LIST_ITEMS_CELL_QUERY } from 'src/components/ListItemsCell'
import Spinner from 'src/components/Loading'

import ListFadeOut from '../ListFadeOut/ListFadeOut'

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

interface ListCellProps {
  dashboard?: boolean
  Child?: ListCellChild
}
export interface ListCellChildProps {
  list?: FindListQuery['list']
  items?: ListItemsQuery['listItems']
}
export type ListCellChild = ComponentType<ListCellChildProps>

export const Success = ({
  list,
  Child,
  dashboard,
}: CellSuccessProps<FindListQuery & ListCellProps, FindListQueryVariables>) => {
  const { id, name, description } = list

  const { data } = useQuery(LIST_ITEMS_CELL_QUERY, {
    variables: { listId: id },
  })

  if (dashboard && !list.listRoles.length) {
    return <Redirect to={routes.lists()} />
  }

  if (Child) {
    return <Child list={list} items={data?.listItems} />
  }

  return (
    <>
      <MetaTags title={name} description={description} />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col gap-7">
            <div className="flex font-serif text-5xl leading-tight">{name}</div>
            {!!description && (
              <p className="font-sans text-xl">{description}</p>
            )}
          </div>
          <ul className="flex flex-col gap-2">
            <ListItemsCell
              listId={id}
              dashboard={dashboard}
              // TODO: why does the cell make these required?
              deleteItem={undefined}
            />
          </ul>
          <ListFadeOut noHeight />
        </div>
      </div>
    </>
  )
}
