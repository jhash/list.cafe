import { useEffect, useRef, useState } from 'react'

import { Save } from 'lucide-react'
import { CreateListMembershipMutation, ListMembership } from 'types/graphql'

import { Form, NumberField } from '@redwoodjs/forms'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { AddItemButton } from '../AddItemButton/AddItemButton'
import { CREATE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/NewListMembership'
import { LIST_ROLE_TYPES } from '../DashboardListMembership/DashboardListMembership'
import FormItem from '../FormItem/FormItem'
import { ListCellChild } from '../ListCell'
import ListMembershipsCell from '../ListMembershipsCell'
import { QUERY as LIST_MEMBERSHIPS_CELL_QUERY } from '../ListMembershipsCell'
import Modal from '../Modal/Modal'
import SectionTitle from '../SectionTitle/SectionTitle'

type CreateListMembershipForm = NonNullable<
  CreateListMembershipMutation['createListMembership']
>

const ListMembers: ListCellChild = ({ list, canAddMembers }) => {
  const emailRef = useRef<HTMLInputElement>()

  const { id, name, description } = list

  const [listMembership, setListMembership] = useState<
    Partial<ListMembership> | undefined
  >()
  const resetListMembership = () => {
    setListMembership(undefined)
  }
  const createNewListMembership = () => {
    setListMembership({
      listId: id,
      listRole: 'VIEW',
      __typename: 'ListMembership',
    })
  }

  const [
    createListMembershipMutation,
    { loading: createListMembershipLoading, error: createListMembershipError },
  ] = useMutation(CREATE_LIST_MEMBERSHIP_MUTATION, {
    onCompleted: () => {
      toast.success('Member added')
      resetListMembership()
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: LIST_MEMBERSHIPS_CELL_QUERY, variables: { listId: id } },
    ],
    awaitRefetchQueries: true,
  })

  const loading = createListMembershipLoading

  useEffect(() => {
    if (!listMembership) {
      return
    }

    setImmediate(() =>
      (emailRef?.current as unknown as HTMLInputElement | null)?.focus()
    )
  }, [emailRef, listMembership])

  if (!!id && !canAddMembers) {
    return <Redirect to={routes.list({ id })} />
  }

  return (
    <>
      {/* TODO: move up */}
      <MetaTags
        title={name || 'Create a new list'}
        description={description || 'Create a new list'}
      />
      {!!listMembership && (
        <Modal
          title="Add a new member"
          onClose={resetListMembership}
          open={!!listMembership}
        >
          <Form<CreateListMembershipForm>
            className="flex w-full max-w-full flex-grow flex-col gap-3"
            name="listMembershipForm"
            onSubmit={(input) =>
              createListMembershipMutation({ variables: { input } })
            }
          >
            <NumberField hidden name="listId" defaultValue={id} />
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
              name="listRole"
              type="select"
              label="Access"
              defaultValue={listMembership.listRole}
              editing
              validation={{
                required: {
                  value: true,
                  message: 'Access level is required',
                },
              }}
              options={LIST_ROLE_TYPES}
            />
            {!!createListMembershipError && (
              <div className="text-error">
                {createListMembershipError.message}
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
                  onClick={createNewListMembership}
                  disabled={loading}
                />
              </div>
            )}
          </div>
          <ul className="flex w-full max-w-full flex-col gap-2">
            <ListMembershipsCell listId={id} />
          </ul>
        </div>
      )}
    </>
  )
}

export default ListMembers
