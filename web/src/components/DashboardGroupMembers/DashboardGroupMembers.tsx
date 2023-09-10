import { useEffect, useRef, useState } from 'react'

import { Save } from 'lucide-react'
import { CreateGroupMembershipMutation, GroupMembership } from 'types/graphql'

import { Form, NumberField } from '@redwoodjs/forms'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { AddItemButton } from '../AddItemButton/AddItemButton'
import { CREATE_GROUP_MEMBERSHIP_MUTATION } from '../Admin/GroupMembership/NewGroupMembership'
import { GROUP_ROLE_TYPES } from '../DashboardGroupMembership/DashboardGroupMembership'
import { DashboardGroupChild } from '../DashboardGroupSettings/DashboardGroupSettings'
import FormItem from '../FormItem/FormItem'
import GroupMembershipsCell from '../GroupMembershipsCell'
import { QUERY as GROUP_MEMBERSHIPS_CELL_QUERY } from '../GroupMembershipsCell'
import Modal from '../Modal/Modal'
import SectionTitle from '../SectionTitle/SectionTitle'

type CreateGroupMembershipForm = NonNullable<
  CreateGroupMembershipMutation['createGroupMembership']
>

const DashboardGroupMembers: DashboardGroupChild = ({
  group,
  canAddMembers,
}) => {
  const emailRef = useRef<HTMLInputElement>()

  const { id, name, description } = group

  const [groupMembership, setGroupMembership] = useState<
    Partial<GroupMembership> | undefined
  >()
  const resetGroupMembership = () => {
    setGroupMembership(undefined)
  }
  const createNewGroupMembership = () => {
    setGroupMembership({
      groupId: id,
      groupRole: 'VIEW',
      __typename: 'GroupMembership',
    })
  }

  const [
    createGroupMembershipMutation,
    {
      loading: createGroupMembershipLoading,
      error: createGroupMembershipError,
    },
  ] = useMutation(CREATE_GROUP_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Member added')
      resetGroupMembership()
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: GROUP_MEMBERSHIPS_CELL_QUERY, variables: { groupId: id } },
    ],
    awaitRefetchQueries: true,
  })

  const loading = createGroupMembershipLoading

  useEffect(() => {
    if (!groupMembership) {
      return
    }

    setImmediate(() =>
      (emailRef?.current as unknown as HTMLInputElement | null)?.focus()
    )
  }, [emailRef, groupMembership])

  if (!!id && !canAddMembers) {
    return (
      <Redirect
        to={routes.group({ groupId: id })}
        options={{ replace: true }}
      />
    )
  }

  return (
    <>
      {/* TODO: move up */}
      <MetaTags
        title={name || 'Create a new group'}
        description={description || 'Create a new group'}
      />
      {!!groupMembership && (
        <Modal
          title="Add a new member"
          onClose={resetGroupMembership}
          open={!!groupMembership}
        >
          <Form<CreateGroupMembershipForm>
            className="flex w-full max-w-full flex-grow flex-col gap-3"
            name="groupMembershipForm"
            onSubmit={(input) =>
              createGroupMembershipMutation({ variables: { input } })
            }
          >
            <NumberField hidden name="groupId" defaultValue={id} />
            <FormItem
              name="email"
              type="email"
              label="Email"
              editing
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
              ref={emailRef}
            />
            <FormItem name="name" type="text" label="Name" editing />
            <FormItem
              name="groupRole"
              type="select"
              label="Access"
              defaultValue={groupMembership.groupRole}
              editing
              validation={{
                required: {
                  value: true,
                  message: 'Access level is required',
                },
              }}
              options={GROUP_ROLE_TYPES}
            />
            {!!createGroupMembershipError && (
              <div className="text-error">
                {createGroupMembershipError.message}
              </div>
            )}
            <button
              className="btn btn-secondary mt-4 flex min-h-0 w-full flex-grow items-center justify-center self-start rounded p-0 px-4"
              type="submit"
              disabled={loading}
            >
              <Save />
              Save
            </button>
          </Form>
        </Modal>
      )}
      {!!id && (
        <div className="flex w-full max-w-full flex-col gap-3">
          <div className="flex w-full max-w-full items-center gap-3">
            <SectionTitle>Members</SectionTitle>
            {/* TODO: support without having saved? */}
            {canAddMembers && (
              <div className="flex items-center gap-3">
                <AddItemButton
                  onClick={createNewGroupMembership}
                  disabled={loading}
                />
              </div>
            )}
          </div>
          <ul className="flex w-full max-w-full flex-col gap-2">
            <GroupMembershipsCell groupId={id} />
          </ul>
        </div>
      )}
    </>
  )
}

export default DashboardGroupMembers
