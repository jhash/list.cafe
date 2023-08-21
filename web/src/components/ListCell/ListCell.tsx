import type { FindListQuery, FindListQueryVariables } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  MetaTags,
} from '@redwoodjs/web'

import ListItemsCell from 'src/components/ListItemsCell'

import ListFadeOut from '../ListFadeOut/ListFadeOut'

export const QUERY = gql`
  query FindListQuery($id: Int!) {
    list: list(id: $id) {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindListQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  list,
}: CellSuccessProps<FindListQuery, FindListQueryVariables>) => {
  const { id, name, description } = list
  return (
    <>
      <MetaTags title={name} description={description} />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col gap-7">
            <div className="flex font-serif text-5xl">{name}</div>
            {!!description && (
              <p className="font-sans text-xl">{description}</p>
            )}
          </div>
          <ul className="flex flex-col divide-y border-y">
            <ListItemsCell listId={id} />
          </ul>
          <ListFadeOut />
        </div>
      </div>
    </>
  )
}
