import classNames from 'classnames'
import { Trash2 } from 'lucide-react'
import { GroupMembershipsQuery, GroupRole } from 'types/graphql'

import { useForm, FormProvider } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import { UPDATE_GROUP_MEMBERSHIP_MUTATION } from '../Admin/GroupMembership/EditGroupMembershipCell'
import { DELETE_GROUP_MEMBERSHIP_MUTATION } from '../Admin/GroupMembership/GroupMembership'
import FormInput from '../FormInput/FormInput'
import { QUERY as GROUP_MEMBERSHIPS_CELL_QUERY } from '../GroupMembershipsCell'
import PersonAvatar from '../PersonAvatar/PersonAvatar'

export const GROUP_ROLE_TYPES: {
  value: GroupRole
  name: string
  description: string
  disabled?: boolean
}[] = [
  { value: 'VIEW', name: 'View', description: 'Member can view the group' },
  {
    value: 'EDIT',
    name: 'Edit',
    description: 'Member can contribute to lists and edit group details',
  },
  {
    value: 'ADMIN',
    name: 'Admin',
    description:
      'Member can contribute to lists, edit group details, and change or add members',
  },
  {
    value: 'OWNER',
    name: 'Owner',
    disabled: true,
    description:
      'Member can do everything admins can do as well as delete the group',
  },
]

type DashboardGroupMembershipProps = {
  membership: GroupMembershipsQuery['groupMemberships'][number]
  canEdit: boolean
  canDelete: boolean
}
const DashboardGroupMembership = ({
  membership,
  canEdit,
  canDelete,
}: DashboardGroupMembershipProps) => {
  const { id, user, groupRole, groupId } = membership

  const { currentUser } = useAuth()

  const methods = useForm({
    defaultValues: {
      groupRole,
    },
  })

  const [
    updateGroupMembership,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_GROUP_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Member updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: GROUP_MEMBERSHIPS_CELL_QUERY, variables: { groupId } },
    ],
    awaitRefetchQueries: true,
  })

  // TODO: update memberships group?
  const [
    deleteGroupMembership,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_GROUP_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Member removed')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: GROUP_MEMBERSHIPS_CELL_QUERY, variables: { groupId } },
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
          membership.groupRole !== 'OWNER' && (
            <button
              className="btn btn-error flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                return (
                  window?.confirm(
                    'Are you sure you want to delete this item?'
                  ) && deleteGroupMembership({ variables: { id } })
                )
              }}
              disabled={loading}
            >
              <Trash2 size="1.25rem" />
            </button>
          )}
        {canEdit && (
          <FormProvider {...methods}>
            <FormInput
              {...methods.register('groupRole')}
              type="select"
              className="select-sm"
              options={GROUP_ROLE_TYPES}
              disabled={
                loading ||
                currentUser?.id === membership.user?.id ||
                groupRole === 'OWNER'
              }
              hideDescription
              onChange={(event) => {
                event.stopPropagation()
                event.preventDefault()
                updateGroupMembership({
                  variables: {
                    id,
                    input: { groupRole: event?.target?.value },
                  },
                })
              }}
            />
          </FormProvider>
        )}
      </div>
    </li>
  )
}

export default DashboardGroupMembership
