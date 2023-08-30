import { useEffect, useMemo, useRef, useState } from 'react'

import intersection from 'lodash/intersection'
import isUndefined from 'lodash/isUndefined'
import kebabCase from 'lodash/kebabCase'
import { Eye, Pencil, PlusCircle, Save, Trash2 } from 'lucide-react'
import {
  CreateListInput,
  CreateListItemInput,
  CreateListMembershipMutation,
  FindListQuery,
  ListItem,
  ListItemsQuery,
  ListMembership,
  ListRole,
  UpdateListInput,
} from 'types/graphql'

import { SignupAttributes } from '@redwoodjs/auth-dbauth-web'
import { Controller, Form, NumberField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { LIST_CAFE_DOMAIN } from 'src/constants/urls'
import { LIST_TYPE_OPTIONS, LIST_VISIBILITY_OPTIONS } from 'src/lib/lists'
import { DigestedList } from 'src/pages/HomePage/HomePage'

import { UPDATE_LIST_MUTATION } from '../Admin/List/EditListCell'
import { DELETE_LIST_MUTATION } from '../Admin/List/List'
import { CREATE_LIST_MUTATION } from '../Admin/List/NewList'
import { CREATE_LIST_MEMBERSHIP_MUTATION } from '../Admin/ListMembership/NewListMembership'
import DashboardListItem from '../DashboardListItem/DashboardListItem'
import { LIST_ROLE_TYPES } from '../DashboardListMembership/DashboardListMembership'
import FormItem from '../FormItem/FormItem'
import { QUERY as LIST_CELL_QUERY } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import ListMembershipsCell from '../ListMembershipsCell'
import { QUERY as LIST_MEMBERSHIPS_CELL_QUERY } from '../ListMembershipsCell'
import Modal from '../Modal/Modal'
import PageTitle from '../PageTitle/PageTitle'
import SectionTitle from '../SectionTitle/SectionTitle'

export const listRolesIntersect = (
  roles: ListRole[] | undefined,
  authRoles: ListRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

type CreateListMembershipForm = NonNullable<
  CreateListMembershipMutation['createListMembership']
>

type CreateUserForm = NonNullable<SignupAttributes>

type ButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
  type?: 'submit' | 'reset' | 'submit'
}
const AddItemButton: React.FC<ButtonProps> = ({ ...props }) => (
  <button
    {...props}
    className="btn btn-secondary flex h-10 min-h-0 w-10 items-center justify-center rounded-full p-0"
  >
    <PlusCircle />
  </button>
)
interface DashboardListProps {
  list?: FindListQuery['list']
  items?: ListItemsQuery['listItems']
}
const DashboardList: React.FC<DashboardListProps> = ({ list, items }) => {
  const { isAuthenticated, signUp } = useAuth()

  const draftList: DigestedList | undefined = useMemo(() => {
    if (list?.id) {
      window.localStorage.removeItem('listDraft')
      return
    }

    try {
      const draftString = window.localStorage.getItem('listDraft')

      if (!draftString) {
        throw new Error('listDraft is not available on localStorage')
      }

      const draft: DigestedList = JSON.parse(draftString)

      return draft
    } catch (error) {
      //
    }
  }, [list?.id])

  const emailRef = useRef<HTMLInputElement>()

  const [listItems, setListItems] = useState<CreateListItemInput[]>([])

  const id = list?.id
  const listRoles = list?.listRoles

  const { name, description, identifier, type, visibility } = list ||
    draftList || {
      type: 'WISHLIST',
    }

  useEffect(() => {
    resetListItem()
  }, [items])

  useEffect(() => {
    if (listItems.length || !draftList) {
      return
    }

    setListItems(
      (draftList.listItems || []).map((digestedItem) => ({
        ...digestedItem,
      }))
    )

    window.localStorage.removeItem('listDraft')
  }, [draftList, listItems])

  // TODO: remove admin?
  const canDelete = useMemo(
    () => listRolesIntersect(listRoles, ['OWNER', 'ADMIN']),
    [listRoles]
  )

  const canEdit = useMemo(
    () => listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN']),
    [listRoles]
  )

  const canSave = id ? canEdit : true

  const canAdd = useMemo(
    () =>
      !id ||
      listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN', 'CONTRIBUTE']),
    [listRoles, id]
  )

  const canAddMembers = useMemo(
    () => listRolesIntersect(listRoles, ['OWNER', 'ADMIN']),
    [listRoles]
  )

  const [editing, setEditing] = useState<boolean>(!id)

  const [listItem, setListItem] = useState<Partial<ListItem> | undefined>()
  const resetListItem = () => {
    setListItem(undefined)
  }
  const createNewListItem = () => {
    setListItem({
      title: '',
      description: '',
      listId: id,
      url: '',
      quantity: 1,
      __typename: 'ListItem',
    })
  }

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

  const [deleteListMutation, { loading: deleteLoading }] = useMutation(
    DELETE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('List deleted')
        setEditing(false)
        navigate(routes.lists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: LIST_CELL_QUERY, variables: { id } }],
      awaitRefetchQueries: true,
    }
  )

  const [updateListMutation, { loading: updateLoading }] = useMutation(
    UPDATE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('List updated')
        setEditing(false)
        // navigate(routes.lists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: LIST_CELL_QUERY, variables: { id } }],
      awaitRefetchQueries: true,
    }
  )

  const [createListMutation, { loading: createLoading }] = useMutation(
    CREATE_LIST_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('List created')
        setEditing(false)
        if (data?.createList) {
          navigate(routes.list({ id: data?.createList.id }))
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

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

  const [pendingList, setPendingList] = useState<CreateListInput | undefined>()
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const resetPendingList = () => {
    setPendingList(undefined)
  }
  const updateListPending = (input: CreateListInput) => {
    setPendingList(input)
  }

  const signUpAndCreateList = async (input: SignupAttributes) => {
    try {
      setSigningUp(true)
      await signUp(input)
      setSigningUp(false)
      toast.success('Successfully signed up!')
      onSave(pendingList)
      resetPendingList()
    } catch (error) {
      toast.error(error.messages)
    }
  }

  const loading = id
    ? updateLoading || deleteLoading || createListMembershipLoading
    : createLoading || signingUp

  const onAddItem = (input: CreateListItemInput) => {
    setListItems([...listItems, input])
    resetListItem()
  }

  const onDeleteItem = (index?: number) => {
    if (isUndefined(index)) {
      return
    }
    const copy = [...listItems]
    copy.splice(index, 1)
    setListItems(copy)
  }

  const onDelete = () => deleteListMutation({ variables: { id } })

  const onSave = (
    input: CreateListInput | UpdateListInput,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (!editing || loading) {
      return
    }

    if (!isAuthenticated && !pendingList) {
      updateListPending(input as CreateListInput)
      return
    }

    if (id) {
      updateListMutation({
        variables: {
          id,
          input: {
            ...input,
            identifier: {
              id: kebabCase(input.identifier),
            },
          },
        },
      })
    } else {
      createListMutation({
        variables: {
          input: {
            ...input,
            type: type || 'WISHLIST',
            identifier: {
              id: kebabCase(input.identifier),
            },
            listItems,
          },
        },
      })
    }

    window.localStorage.removeItem('listDraft')
  }

  useEffect(() => {
    if (!listMembership) {
      return
    }

    setImmediate(() =>
      (emailRef?.current as unknown as HTMLInputElement | null)?.focus()
    )
  }, [emailRef, listMembership])

  useEffect(() => {
    return () => {
      window.localStorage.removeItem('listDraft')
    }
  }, [])

  return (
    <>
      <MetaTags
        title={name || 'Create a new list'}
        description={description || 'Create a new list'}
      />
      {!!listItem && (
        <Modal title="Add a new item" onClose={resetListItem} open={!!listItem}>
          <DashboardListItem
            url=""
            quantity={1}
            title=""
            listId={id}
            reservations={undefined}
            {...listItem}
            addItem={onAddItem}
            deleteItem={onDeleteItem}
            modal
          />
        </Modal>
      )}
      {!!pendingList && (
        <Modal title="Welcome!" onClose={resetPendingList} open={!!pendingList}>
          <Form<CreateUserForm>
            className="flex w-full max-w-full flex-grow flex-col gap-3"
            name="userForm"
            onSubmit={signUpAndCreateList}
          >
            <p className="text-lg font-medium text-info">
              {'Sign up now to save your new list'}
            </p>
            <p className="text-sm font-medium">{`Don't worry, list.cafe is free, forever.`}</p>
            <FormItem
              name="username"
              type="email"
              label="Email"
              validation={{ required: true }}
              ref={emailRef}
            />
            <FormItem name="name" type="text" label="Name" />
            <FormItem
              name="password"
              type="password"
              label="Password"
              validation={{ required: true }}
            />
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
              validation={{ required: true }}
              ref={emailRef}
            />
            <FormItem name="name" type="text" label="Name" editing />
            <FormItem
              name="listRole"
              type="select"
              label="Access"
              defaultValue={listMembership.listRole}
              editing
              validation={{ required: true }}
              options={LIST_ROLE_TYPES}
            />
            {!!createListMembershipError && (
              <div className="text-error">
                {createListMembershipError.message}
              </div>
            )}
            <button
              // TODO: don't use z
              className="btn btn-secondary z-10 mt-4 flex min-h-0 w-full flex-grow items-center justify-center self-start rounded p-0 px-4"
              type="submit"
              disabled={loading}
            >
              <Save />
              Save
            </button>
          </Form>
        </Modal>
      )}
      <div className="flex w-full max-w-full flex-col gap-8">
        <Form
          className="flex w-full max-w-full flex-col gap-3"
          onSubmit={onSave}
        >
          <PageTitle title={name || 'Create a new list'}>
            {!!id && !!identifier?.id && (
              <Link
                to={routes.identifier({ identifier: identifier?.id })}
                className="btn btn-primary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
                title="Preview"
              >
                <Eye />
              </Link>
            )}
            {!!id && canDelete && (
              <button
                className="btn btn-error flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
                title="Delete"
                type="button"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()

                  return (
                    window.confirm(
                      'Are you sure you want to remove this member?'
                    ) && onDelete()
                  )
                }}
                disabled={loading}
              >
                <Trash2 />
              </button>
            )}

            {!!canSave && (
              <button
                className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
                type={editing ? 'submit' : 'button'}
                onClick={
                  editing
                    ? undefined
                    : () => setImmediate(() => setEditing(!editing))
                }
                disabled={loading}
              >
                {editing ? <Save /> : <Pencil />}
              </button>
            )}
          </PageTitle>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <FormItem
              disabled={loading}
              name="name"
              defaultValue={name}
              editing={editing}
              label={<SectionTitle>Name</SectionTitle>}
              validation={{ required: true }}
            />
            <FormItem
              disabled={loading}
              name="identifier"
              defaultValue={identifier?.id}
              editing={editing}
              label={<SectionTitle>ID</SectionTitle>}
              validation={{ required: true }}
            >
              <Controller
                name="identifier"
                render={({ field: { value } }) => (
                  <div className="flex items-center p-1 text-sm text-gray-500">
                    {`Ex. ${LIST_CAFE_DOMAIN}/${
                      (editing ? kebabCase(value) : undefined) ||
                      identifier?.id ||
                      'your-list-name'
                    }`}
                  </div>
                )}
              />
            </FormItem>
            <FormItem
              disabled={loading}
              name="description"
              defaultValue={description}
              editing={editing}
              label={<SectionTitle>Description</SectionTitle>}
            />
            <FormItem
              disabled={loading}
              type="select"
              name="visibility"
              defaultValue={visibility}
              editing={editing}
              label={<SectionTitle>Visibility</SectionTitle>}
              options={LIST_VISIBILITY_OPTIONS}
            />
            <FormItem
              disabled={loading}
              type="select"
              name="type"
              defaultValue={type}
              editing={editing}
              label={<SectionTitle>Type</SectionTitle>}
              options={LIST_TYPE_OPTIONS}
            />
          </div>
        </Form>

        <div className="flex w-full max-w-full flex-col gap-3">
          <div className="flex w-full max-w-full items-center gap-3">
            <SectionTitle>Items</SectionTitle>
            {/* TODO: support without having saved? */}
            {canAdd && (
              <div className="flex items-center gap-3">
                <AddItemButton onClick={createNewListItem} disabled={loading} />
              </div>
            )}
          </div>
          <ul className="flex w-full max-w-full flex-col gap-2">
            {id ? (
              <ListItemsCell listId={id} dashboard deleteItem={onDeleteItem} />
            ) : (
              (listItems || []).map((listItem, index) => (
                <li key={index} className="flex w-full max-w-full items-center">
                  <DashboardListItem
                    {...listItem}
                    reservations={undefined}
                    modal={false}
                    index={index}
                    deleteItem={onDeleteItem}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
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
        <ListFadeOut />
      </div>
    </>
  )
}

export default DashboardList
