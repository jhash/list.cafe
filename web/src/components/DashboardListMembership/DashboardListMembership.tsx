import classNames from 'classnames'
import { Trash2 } from 'lucide-react'
import { ListMembershipsQuery } from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import { UPDATE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/EditListMembershipCell'
import { DELETE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/ListMemberships'
import FormInput from '../FormInput/FormInput'
import { QUERY as LIST_MEMBERSHIPS_CELL_QUERY } from '../ListMembershipsCell'
import PersonAvatar from '../PersonAvatar/PersonAvatar'

export const LIST_ROLE_TYPES = [
  { value: 'VIEW', name: 'View', description: 'Member can view the list' },
  {
    value: 'CONTRIBUTE',
    name: 'Contribute',
    description: 'Member can add, remove, and change items',
  },
  {
    value: 'EDIT',
    name: 'Edit',
    description: 'Member can contribute to items and edit list details',
  },
  {
    value: 'ADMIN',
    name: 'Admin',
    description:
      'Member can contribute to items, edit list details, and change or add members',
  },
  {
    value: 'OWNER',
    name: 'Owner',
    disabled: true,
    description:
      'Member can do everything admins can do as well as delete the list',
  },
]

type DashboardListMembershipProps = {
  membership: ListMembershipsQuery['listMemberships'][number]
  canEdit: boolean
  canDelete: boolean
}
const DashboardListMembership = ({
  membership,
  canEdit,
  canDelete,
}: DashboardListMembershipProps) => {
  const { id, user, listRole, listId } = membership

  const { currentUser } = useAuth()

  const [updateListMembership, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_LIST_MEMBERSHIP_MUTATION, {
      onCompleted: () => {
        toast.success('Member updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        { query: LIST_MEMBERSHIPS_CELL_QUERY, variables: { listId } },
      ],
      awaitRefetchQueries: true,
    })

  // TODO: update memberships list?
  const [deleteListMembership, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LIST_MEMBERSHIP_MUTATION, {
      onCompleted: () => {
        toast.success('Member removed')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        { query: LIST_MEMBERSHIPS_CELL_QUERY, variables: { listId } },
      ],
      awaitRefetchQueries: true,
    })

  const loading = updateLoading || deleteLoading

  const error = updateError || deleteError

  const PersonWrapper = (props) =>
    user?.person?.identifier?.id && user?.person?.visibility === 'PUBLIC' ? (
      <Link
        {...props}
        to={routes.identifier({ identifier: user?.person?.identifier?.id })}
        className={classNames(
          props.className,
          'link no-underline hover:no-underline'
        )}
      />
    ) : (
      <div {...props} />
    )

  return (
    <li
      key={id}
      className="min-h-12 flex w-full max-w-full flex-grow flex-nowrap items-center gap-3 overflow-x-hidden rounded-lg border px-4 leading-none shadow-sm"
    >
      {!!user?.person && (
        <PersonWrapper className="flex flex-shrink flex-grow items-center gap-3 overflow-hidden overflow-ellipsis">
          <PersonAvatar
            person={user.person}
            className="h-8 w-8 text-[0.375rem]"
          />
          {!!user?.person?.name && (
            <div className="flex-shrink whitespace-normal">
              {user?.person?.name}
            </div>
          )}
          {!!user?.person?.email && (
            <span className="flex-shrink overflow-hidden overflow-ellipsis text-sm text-gray-500">
              {user?.person?.email}
            </span>
          )}
        </PersonWrapper>
      )}
      <div className="flex flex-shrink-0 items-center gap-3">
        {!!error && <span className="text-error">{error.message}</span>}
        {!!canDelete &&
          currentUser?.id !== membership.user?.id &&
          membership.listRole !== 'OWNER' && (
            <button
              className="btn btn-error flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                return (
                  window?.confirm(
                    'Are you sure you want to delete this item?'
                  ) && deleteListMembership({ variables: { id } })
                )
              }}
              disabled={loading}
            >
              <Trash2 size="1.25rem" />
            </button>
          )}
        {!!canEdit && (
          <Form>
            <FormInput
              name="listRole"
              type="select"
              className="select-sm"
              defaultValue={listRole}
              options={LIST_ROLE_TYPES}
              disabled={
                loading ||
                currentUser?.id === membership.user?.id ||
                membership.listRole === 'OWNER'
              }
              hideDescription
              onChange={(event) => {
                updateListMembership({
                  variables: { id, input: { listRole: event?.target?.value } },
                })
              }}
            />
          </Form>
        )}
      </div>
    </li>
  )
}

export default DashboardListMembership
