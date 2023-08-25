import { useMemo, useState } from 'react'

import classNames from 'classnames'
import { Link2, Lock, Save, Unlock, X } from 'lucide-react'
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
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

import { reservationsEnabled } from '../DashboardList/DashboardList'
import ExternalLink from '../ExternalLink/ExternalLink'
import FormItem from '../FormItem/FormItem'
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
  const { list, reservations } = listItem
  const [reservation, setReservation] = useState<
    Partial<Reservation> | undefined
  >()

  const { currentUser } = useAuth()

  const reservationsAllowed = useMemo(
    () => reservationsEnabled(list?.type),
    [list?.type]
  )

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
  const reservedByUser = useMemo(
    () =>
      !!userReservations.length &&
      !!userReservations.filter(
        (reservation) => reservation.status !== 'RELEASED'
      ).length,
    [userReservations]
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
        input,
      },
    })
  }

  const InnerForm = () => {
    const { field } = useController({
      name: 'status',
    })

    const status: ReservationStatus = field.value

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
        {!!reservedByOthers && (
          <p className="text-lg font-bold leading-normal text-warning">{`WARNING: it looks like ${quantityReserved} of these items ${
            quantityReserved === 1 ? 'has' : 'have'
          } been reserved by someone else. You might want to hold off on reserving this item as well`}</p>
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
              validation={{ required: true }}
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
          id="reserveItem"
        >
          {!!listItem.title && (
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">{'Item'}</div>
              <div>{listItem.title}</div>
            </div>
          )}
          <Form<CreateReservationInput>
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
      <button
        className={classNames(
          'btn flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0',
          reservedByOthers
            ? 'btn-warning'
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
    </>
  )
}

const ListItems: React.FC<ListItemsQuery> = ({ listItems }) => {
  return listItems.map((listItem, index) => {
    const { id, url, title, description, quantity, list } = listItem

    const reservations = reservationsEnabled(list.type)

    const QuantityText = () => {
      if (!quantity || !reservations) {
        return null
      }

      return (
        <div className="flex items-center gap-[0.15rem] text-sm font-medium text-gray-400">
          <X size="0.75rem" />
          {quantity}
        </div>
      )
    }

    return (
      <li
        key={id || index}
        className="flex cursor-pointer items-center gap-3 rounded-lg border pr-3 leading-tight shadow-sm hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-600 dark:hover:bg-opacity-20"
      >
        {url ? (
          <ExternalLink
            href={url}
            className="link min-h-12 flex flex-grow items-center gap-3 px-3 py-1 text-lg no-underline"
          >
            {title}
            <Link2 size="1rem" className="flex-shrink-0" />
            <QuantityText />
          </ExternalLink>
        ) : (
          <div className="link min-h-12 flex flex-grow items-center gap-3 px-3 py-1 text-lg no-underline">
            {title}
            <QuantityText />
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {!!description && (
            <span className="whitespace-normal text-right text-sm text-gray-500 dark:text-gray-400">
              {description}
            </span>
          )}
          <ListItemReservationButtons listItem={listItem} />
        </div>
      </li>
    )
  })
}

export default ListItems
