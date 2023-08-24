import { useEffect } from 'react'

import { Trash2 } from 'lucide-react'
import { ListMembershipsQuery } from 'types/graphql'

import { Controller, Form } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'

import { UPDATE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/EditListMembershipCell'
import { DELETE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/ListMemberships'
import FormInput from '../FormInput/FormInput'

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
  const { id, user, listRole } = membership

  const { currentUser } = useAuth()

  const LIST_ROLE_TYPES = [
    { value: 'VIEW', name: 'View' },
    { value: 'CONTRIBUTE', name: 'Contribute' },
    { value: 'EDIT', name: 'Edit' },
    { value: 'ADMIN', name: 'Admin' },
    { value: 'OWNER', name: 'Owner', disabled: true },
  ]

  const [updateListMembership, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_LIST_MEMBERSHIP_MUTATION, {
      onCompleted: () => {
        toast.success('List membership updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const [deleteListMembership, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LIST_MEMBERSHIP_MUTATION, {
      onCompleted: () => {
        toast.success('List membership deleted')
      },
      onError: (error) => {
        console.error(error)
        toast.error(error.message)
      },
    })

  const loading = updateLoading || deleteLoading

  const error = updateError || deleteError

  const RoleField = ({ field: { value, name, ...fieldProps } }) => {
    console.log(value)
    useEffect(() => {
      if (!value) {
        return
      }

      updateListMembership({ variables: { id, input: { listRole: value } } })
    }, [value])

    return (
      <FormInput
        name={name}
        type="select"
        options={LIST_ROLE_TYPES}
        defaultValue={listRole}
        disabled={loading || currentUser.id === membership.user?.id}
        {...fieldProps}
      />
    )
  }

  return (
    <li
      key={id}
      className="min-h-12 flex w-full max-w-full flex-grow items-center gap-3 rounded-lg border px-4 leading-none shadow-sm"
    >
      {!!user?.person && (
        <div className="flex flex-grow items-center gap-3">
          {user?.person?.name}
          <span className="text-sm text-gray-500">{user?.person?.email}</span>
        </div>
      )}
      <div className="flex items-center gap-3">
        {!!error && <span className="text-error">{error.message}</span>}
        {!!canEdit && (
          <Form>
            <Controller name="listRole" render={RoleField} />
          </Form>
        )}
        {!!canDelete && (
          <button
            // TODO: don't use z
            className="btn btn-error z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              return (
                window.confirm('Are you sure you want to delete this item?') &&
                deleteListMembership({ variables: { id } })
              )
            }}
            disabled={loading}
          >
            <Trash2 size="1.25rem" />
          </button>
        )}
      </div>
    </li>
  )
}

export default DashboardListMembership
