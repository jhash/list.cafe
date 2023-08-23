import type { FindListQuery, FindListQueryVariables } from 'types/graphql'

import { Redirect, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  // type CellFailureProps,
  MetaTags,
} from '@redwoodjs/web'

import ListItemsCell from 'src/components/ListItemsCell'

import DashboardList from '../DashboardList/DashboardList'
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

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
}
export const Success = ({
  list,
  dashboard = false,
}: CellSuccessProps<FindListQuery & ListCellProps, FindListQueryVariables>) => {
  if (dashboard) {
    return <DashboardList list={list} />
  }

  const { id, name, description } = list

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
              editing={false}
              onListItemsUpdate={() => {
                //
              }}
            />
          </ul>
          <ListFadeOut noHeight />
        </div>
      </div>
    </>
  )
}
