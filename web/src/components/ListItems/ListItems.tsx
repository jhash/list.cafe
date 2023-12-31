import { useMemo, useState } from 'react'

import classNames from 'classnames'
import { Lock, Save, Unlock, X } from 'lucide-react'
import {
  CreateReservationInput,
  ListItemsQuery,
  Reservation,
  ReservationStatus,
  UpdateReservationInput,
} from 'types/graphql'

import { Form, NumberField, useController } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { reservationsEnabled } from 'src/lib/lists'

import ExternalLink from '../ExternalLink/ExternalLink'
import FormItem from '../FormItem/FormItem'
import { QUERY as LIST_ITEMS_CELL_QUERY } from '../ListItemsCell'
import Modal from '../Modal/Modal'
import SectionTitle from '../SectionTitle/SectionTitle'

const CREATE_RESERVATION_MUTATION = gql`
  mutation CreateReservationMutation($input: CreateReservationInput!) {
    createReservation(input: $input) {
      id
      status
    }
  }
`

const UPDATE_RESERVATION_MUTATION = gql`
  mutation UpdateReservationMutation(
    $id: Int!
    $input: UpdateReservationInput!
  ) {
    updateReservation(id: $id, input: $input) {
      id
      status
    }
  }
`

const FormSaveButton = ({ ...props }) => (
  <button
    className="btn btn-secondary mt-4 flex min-h-0 w-full flex-grow items-center justify-center self-start rounded p-0 px-4"
    type="submit"
    {...props}
  >
    <Save />
    Save
  </button>
)

const useListItemReservations = ({
  reservations,
  listItem,
}: {
  reservations: ListItemsQuery['listItems'][number]['reservations']
  listItem: ListItemsQuery['listItems'][number]
}) => {
  const { currentUser } = useAuth()

  const nonReleasedReservations = useMemo(
    () =>
      (reservations || []).filter(
        (reservation) => reservation.status !== 'RELEASED'
      ),
    [reservations]
  )

  const userReservations = useMemo(
    () =>
      currentUser
        ? reservations.filter(
            (reservation) => reservation.userId === currentUser?.id
          )
        : [],
    [currentUser, reservations]
  )

  const reserved = !!nonReleasedReservations.length
  const nonReleasedUserReservations = useMemo(
    () =>
      userReservations.filter(
        (reservation) => reservation.status !== 'RELEASED'
      ),
    [userReservations]
  )
  const quantityReservedByUser = useMemo(
    () =>
      nonReleasedUserReservations.reduce(
        (total, reservation) => total + (reservation.quantity || 1),
        0
      ),
    [nonReleasedUserReservations]
  )
  const reservedByUser = useMemo(
    () => !!quantityReservedByUser,
    [quantityReservedByUser]
  )
  const reservedByOthers = !userReservations?.length && !!reserved
  const quantityReserved = useMemo(
    () =>
      nonReleasedReservations.reduce(
        (total, reservation) => total + (reservation.quantity || 1),
        0
      ),
    [nonReleasedReservations]
  )
  const quantityReservedByOthers = quantityReserved - quantityReservedByUser
  const allReserved = quantityReserved >= listItem.quantity
  const remaining = Math.max(listItem.quantity - quantityReserved, 0)

  return {
    remaining,
    nonReleasedReservations,
    userReservations,
    reservedByUser,
    reservedByOthers,
    quantityReserved,
    allReserved,
    quantityReservedByUser,
    nonReleasedUserReservations,
    quantityReservedByOthers,
  }
}

const RESERVATION_STATUS_OPTIONS: {
  value: ReservationStatus
  name: string
  description: string
}[] = [
  {
    value: 'RESERVED',
    name: 'Reserved',
    description: 'You plan to acquire this item',
  },
  {
    value: 'RELEASED',
    name: 'Released',
    description: 'You no longer plan to acquire this item',
  },
  {
    value: 'FULFILLED',
    name: 'Fulfilled',
    description: "You've successfully acquired this item",
  },
]

type ListItemReservationsButtons = {
  listItem: ListItemsQuery['listItems'][number]
}
const ListItemReservationButtons: React.FC<ListItemReservationsButtons> = ({
  listItem,
}) => {
  const { list, reservations, listId } = listItem
  const [reservation, setReservation] = useState<
    Partial<Reservation> | undefined
  >()

  const reservationsAllowed = useMemo(
    () => reservationsEnabled(list?.type),
    [list?.type]
  )

  const {
    userReservations,
    reservedByUser,
    reservedByOthers,
    quantityReserved,
    allReserved,
  } = useListItemReservations({ reservations, listItem })

  const [createReservationMutation, { loading: createLoading }] = useMutation(
    CREATE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Item reserved')
        setReservation(undefined)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: LIST_ITEMS_CELL_QUERY, variables: { listId } }],
      awaitRefetchQueries: true,
    }
  )

  const [updateReservationMutation, { loading: updateLoading }] = useMutation(
    UPDATE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Item reserved')
        setReservation(undefined)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: LIST_ITEMS_CELL_QUERY, variables: { listId } }],
      awaitRefetchQueries: true,
    }
  )

  const loading = createLoading || updateLoading

  const reserve = (input: CreateReservationInput | UpdateReservationInput) => {
    if (reservation.id) {
      return updateReservationMutation({
        variables: {
          id: reservation.id,
          input,
        },
      })
    }

    createReservationMutation({
      variables: {
        input: {
          ...input,
          user: (input as CreateReservationInput).user
            ? {
                email: (input as CreateReservationInput).user?.person?.email,
                ...(input as CreateReservationInput).user,
              }
            : undefined,
        },
      },
    })
  }

  const InnerForm = () => {
    const { field } = useController({
      name: 'status',
    })

    const status: ReservationStatus = field.value

    const { currentUser } = useAuth()

    return (
      <>
        {!reservation.id && (
          <>
            <NumberField
              hidden
              name="listItemId"
              defaultValue={reservation.listItemId || listItem.id}
            />
            <NumberField hidden name="userId" defaultValue={currentUser?.id} />
          </>
        )}
        <FormItem
          type="select"
          name="status"
          options={RESERVATION_STATUS_OPTIONS.map((option) => ({
            ...option,
            disabled: !reservation.id && option.value === 'RELEASED',
          }))}
          defaultValue={
            reservedByUser
              ? 'RELEASED'
              : userReservations.length
              ? 'RESERVED'
              : reservation.status
          }
          label="Status"
        />
        {status !== 'RELEASED' && (
          <FormItem
            name="quantity"
            type="number"
            defaultValue={reservation.quantity}
            label="Quantity"
            description={
              status === 'FULFILLED'
                ? 'How many of these did you acquire?'
                : 'How many of these do you plan to acquire?'
            }
          />
        )}
        {status === 'FULFILLED' && (
          <FormItem
            name="price"
            type="number"
            label="Price"
            step="0.01"
            defaultValue={reservation.price}
            description="How much did you pay for this item? Only you will be able to see this"
            placeholder="N/A"
          />
        )}

        <FormItem
          name="comment"
          type="textarea"
          label="Comment"
          placeholder="Leave a comment about why you're reserving this item"
          description="Only you can see this"
          defaultValue={reservation.comment}
        />
        {!currentUser && (
          <div className="flex flex-col gap-3 pt-4">
            <SectionTitle>Welcome!</SectionTitle>
            <p className="leading-normal">
              {`In order to reserve this item, enter your information here to continue as a guest `}
              <Link to={routes.login()} className="link-info link">
                {/* TODO: or login nested */}
                {`or click here to login`}
              </Link>
            </p>
            <FormItem
              name="user.person.email"
              type="email"
              label="Email"
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />
            <FormItem name="user.person.name" type="text" label="Name" />
          </div>
        )}
        <FormSaveButton disabled={loading} />
      </>
    )
  }

  if (!reservationsAllowed) {
    return null
  }

  return (
    <>
      {!!reservation && (
        <Modal
          onClose={() => setReservation(undefined)}
          title={reservedByUser ? 'Change reservation' : 'Reserve item'}
          open={!!reservation}
        >
          {!!reservedByOthers && (
            <p
              className={classNames(
                'text-lg font-bold leading-normal',
                allReserved ? 'text-warning' : 'text-info'
              )}
            >{`${allReserved ? 'WARNING: it looks like ' : ''}${
              allReserved && listItem.quantity > 1
                ? 'all'
                : `${quantityReserved}${
                    listItem.quantity > 1 ? ` out of ${listItem.quantity}` : ''
                  }`
            } of these items ${
              quantityReserved === 1 ? 'has' : 'have'
            } been reserved.${
              allReserved
                ? ' You might want to hold off on reserving this item as well.'
                : ''
            }`}</p>
          )}
          {!!listItem.title && (
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">{'Item'}</div>
              <div>{listItem.title}</div>
            </div>
          )}
          <Form<CreateReservationInput | UpdateReservationInput>
            className="flex flex-grow flex-col gap-3"
            onSubmit={reserve}
          >
            <InnerForm />
          </Form>
        </Modal>
      )}
      {/* {reservedByOthers && (
        <div className="text-gray-500 dark:text-gray-400">
          <Lock size="1.25rem" />
        </div>
      )} */}
      <div>
        <button
          className={classNames(
            'btn flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0',
            reservedByOthers
              ? allReserved
                ? 'btn-warning'
                : 'btn-info'
              : reservedByUser
              ? 'btn-primary'
              : 'btn-secondary'
          )}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setReservation(
              userReservations?.[0] || {
                status: 'RESERVED',
                quantity: listItem.quantity || 1,
                listItemId: listItem.id,
                price: listItem.price,
              }
            )
          }}
          // disabled={loading}
        >
          {reservedByUser ? <Unlock size="1.25rem" /> : <Lock size="1.25rem" />}
        </button>
      </div>
    </>
  )
}

const ListItem: React.FC<{ listItem: ListItemsQuery['listItems'][number] }> = ({
  listItem,
}) => {
  const { id, url, title, description, quantity, list, reservations, images } =
    listItem

  const reservationsAllowed = reservationsEnabled(list.type)

  const { allReserved, quantityReservedByUser, quantityReserved, remaining } =
    useListItemReservations({ reservations, listItem })

  const QuantityText = () => {
    if (!quantity || !reservationsAllowed) {
      return null
    }

    return (
      <div className="flex flex-shrink flex-wrap justify-center gap-x-3 gap-y-1 px-1">
        {quantity > 1 && (
          <div
            className={classNames(
              'flex items-center gap-[0.15rem] text-sm font-medium',
              'text-gray-400'
            )}
          >
            <X size="0.75rem" />
            {quantity}
          </div>
        )}
        {allReserved ? (
          <div
            className={classNames(
              'flex items-center text-sm font-medium uppercase text-success'
            )}
          >
            {`reserved`}
          </div>
        ) : (
          <>
            {!!quantityReservedByUser && (
              <div
                className={classNames(
                  'flex items-center whitespace-nowrap text-sm font-medium text-info'
                )}
              >
                {`${quantityReservedByUser} reserved`}
              </div>
            )}
            {!!quantityReserved && !!remaining && (
              <div
                className={classNames(
                  'flex items-center whitespace-nowrap text-sm font-medium',
                  'text-secondary'
                )}
              >
                {`${remaining} to go`}
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  const titleText = (
    <>
      {!!images?.length && (
        // TODO: remove -ml - quick and dirty hack
        <div className="-ml-2 flex max-h-14 w-14 flex-shrink-0 items-center justify-center self-start overflow-hidden rounded-sm py-1">
          <img src={images[0].url} alt={images[0]?.alt} className="w-full" />
        </div>
      )}
      {title}
    </>
  )

  const descriptionText = (
    <>
      {!!description && (
        <span className="ml-auto flex flex-shrink flex-grow-0 items-center overflow-hidden overflow-ellipsis whitespace-normal text-right text-sm text-gray-500 dark:text-gray-400">
          <span className="overflow-hidden overflow-ellipsis">
            {description}
          </span>
        </span>
      )}
    </>
  )

  return (
    <li
      key={id}
      className="flex cursor-pointer items-center gap-3 overflow-hidden overflow-ellipsis rounded-lg border pr-3 leading-tight shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
    >
      {url ? (
        <ExternalLink
          href={url}
          className="link min-h-12 flex min-w-[8rem] flex-grow items-center gap-3 py-1 pl-3 text-lg leading-tight no-underline"
        >
          {titleText}
          <QuantityText />
          {descriptionText}
          {/* <Link2 size="1rem" className="flex-shrink-0" /> */}
        </ExternalLink>
      ) : (
        <div className="link min-h-12 flex min-w-[8rem] flex-grow items-center gap-3 py-1 pl-3 text-lg leading-tight no-underline">
          {titleText}
          <QuantityText />
          {descriptionText}
        </div>
      )}

      <ListItemReservationButtons listItem={listItem} />
    </li>
  )
}

const ListItems: React.FC<ListItemsQuery> = ({ listItems }) => {
  return listItems.map((listItem, index) => (
    <ListItem key={index} listItem={listItem} />
  ))
}

export default ListItems
