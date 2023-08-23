import { useEffect, useMemo, useState } from 'react'

import intersection from 'lodash/intersection'
import kebabCase from 'lodash/kebabCase'
import { Eye, Pencil, PlusCircle, Save, Trash2, X } from 'lucide-react'
import { FindListQuery, ListItem, ListRole } from 'types/graphql'

import { Controller, Form } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { LIST_CAFE_DOMAIN } from 'src/constants/urls'

import { UPDATE_LIST_MUTATION } from '../Admin/List/EditListCell'
import { DELETE_LIST_MUTATION } from '../Admin/List/List'
import { CREATE_LIST_MUTATION } from '../Admin/List/NewList'
import DashboardListItem from '../DashboardListItem/DashboardListItem'
import FormItem from '../FormItem/FormItem'
import { QUERY as LIST_CELL_QUERY } from '../ListCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import PageTitle from '../PageTitle/PageTitle'
import SectionTitle from '../SectionTitle/SectionTitle'

const LIST_TYPE_OPTIONS = [
  { value: 'AWESOME', name: 'Awesome' },
  { value: 'BABY_SHOWER', name: 'BabyShower' },
  { value: 'BOOKMARKS', name: 'Bookmarks' },
  { value: 'FAVORITES', name: 'Favorites' },
  { value: 'FORUM', name: 'Forum' },
  { value: 'INVENTORY', name: 'Inventory' },
  { value: 'JOBS', name: 'Jobs' },
  { value: 'LINKTREE', name: 'Linktree' },
  { value: 'SOCIAL', name: 'Social' },
  { value: 'TABLE', name: 'Table' },
  { value: 'TODO', name: 'Todo' },
  { value: 'TOP', name: 'Top' },
  { value: 'WEDDING', name: 'Wedding' },
  { value: 'WISHLIST', name: 'Wishlist' },
]

const LIST_VISIBILITY_OPTIONS = [
  {
    value: 'PRIVATE',
    name: 'Private',
    description: 'Only you and people you invite can access this list',
  },
  // TODO: delete this one?
  // { value: 'GROUP', name: 'Group' },
  {
    value: 'LINK',
    name: 'Link',
    description:
      'Anyone with the link can access this list. This list will not appear in public search results',
  },
  {
    value: 'PUBLIC',
    name: 'Public',
    description:
      'This list is accessible by the public and will show in search results',
  },
]

export const listRolesIntersect = (
  roles: ListRole[] | undefined,
  authRoles: ListRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

declare let window: Window &
  typeof globalThis & {
    newListItem: { showModal: () => void; close: () => void }
  }

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
const DashboardList: React.FC<FindListQuery | { list: undefined }> = ({
  list,
}) => {
  const { id, name, description, identifier, type, visibility, listRoles } =
    list || {
      type: 'WISHLIST',
    }

  // TODO: remove admin?
  const canDelete = useMemo(
    () => listRolesIntersect(listRoles, ['OWNER', 'ADMIN']),
    [listRoles]
  )

  const canEdit = useMemo(
    () => listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN']),
    [listRoles]
  )

  const canAdd = useMemo(
    () =>
      listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN', 'CONTRIBUTE']),
    [listRoles]
  )

  // TODO: default to if user has edit access
  const [editing, setEditing] = useState<boolean>(!id)
  const [listItem, setListItem] = useState<Partial<ListItem> | undefined>()

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

  const loading = id ? updateLoading || deleteLoading : createLoading

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

  const resetNewListItem = () => {
    setListItem(undefined)
  }

  const onDelete = () => deleteListMutation({ variables: { id } })

  const onSave = (input, event) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (!editing || loading) {
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
          },
        },
      })
    }
  }

  useEffect(() => {
    if (listItem) {
      window?.newListItem?.showModal()
    } else {
      window?.newListItem?.close()
    }
  }, [listItem])

  return (
    <>
      <MetaTags
        title={name || 'Add new list'}
        description={description || 'Create a new list'}
      />
      {!!listItem && (
        <dialog
          id="newListItem"
          className="modal modal-bottom p-0 sm:modal-middle sm:p-4"
        >
          <div className="modal-box relative flex max-h-full min-h-screen flex-col gap-y-6 rounded-none sm:h-auto sm:min-h-[70vh] sm:rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex-grow">
                <SectionTitle>Add new item</SectionTitle>
              </div>
              {/* <button
              className="btn btn-secondary flex h-8 min-h-0 w-8 flex-grow-0 items-center justify-center self-start p-0"
              type="submit"
            >
              <Save size="1rem" />
            </button> */}
              <button
                className="btn flex h-8 min-h-0 w-8 items-center justify-center rounded-full p-0"
                onClick={resetNewListItem}
                type="button"
              >
                <X size="1.125rem" />
              </button>
            </div>
            <DashboardListItem
              url=""
              quantity={1}
              title=""
              listId={id}
              {...listItem}
              editing
              onListItemsUpdate={resetNewListItem}
            />
          </div>
        </dialog>
      )}
      <div className="flex w-full max-w-full flex-col gap-8">
        <Form
          className="flex w-full max-w-full flex-col gap-3"
          onSubmit={onSave}
        >
          <PageTitle title={name || 'Add new list'}>
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
                      'Are you sure you want to delete this list?'
                    ) && onDelete()
                  )
                }}
              >
                <Trash2 />
              </button>
            )}
            {!!id && !!identifier?.id && (
              <Link
                to={routes.identifier({ identifier: identifier?.id })}
                className="btn btn-primary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
                title="Preview"
              >
                <Eye />
              </Link>
            )}
            {!!canEdit && (
              <button
                className="btn btn-secondary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
                type={editing ? 'submit' : 'button'}
                onClick={
                  editing
                    ? undefined
                    : () => setImmediate(() => setEditing(!editing))
                }
              >
                {editing ? <Save /> : <Pencil />}
              </button>
            )}
          </PageTitle>
          <div className="flex flex-wrap gap-5">
            <FormItem
              name="name"
              defaultValue={name}
              editing={editing}
              label={<SectionTitle>Name</SectionTitle>}
              validation={{ required: true }}
            />
            <FormItem
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
                      (editing ? value : undefined) ||
                      identifier?.id ||
                      'your-list-name'
                    }`}
                  </div>
                )}
              />
            </FormItem>
            <FormItem
              name="description"
              defaultValue={description}
              editing={editing}
              label={<SectionTitle>Description</SectionTitle>}
            />
            <FormItem
              type="select"
              name="visibility"
              defaultValue={visibility}
              editing={editing}
              label={<SectionTitle>Visibility</SectionTitle>}
              options={LIST_VISIBILITY_OPTIONS}
            />
            <FormItem
              type="select"
              name="type"
              defaultValue={type}
              editing={editing}
              label={<SectionTitle>Type</SectionTitle>}
              disabled
              options={LIST_TYPE_OPTIONS}
            />
          </div>
        </Form>

        <div className="flex w-full max-w-full flex-col gap-3">
          <div className="flex w-full max-w-full items-center gap-3">
            <SectionTitle>Items</SectionTitle>
            {/* TODO: support without having saved */}
            {!!id && canAdd && (
              <div className="flex items-center gap-3">
                <AddItemButton onClick={createNewListItem} />
              </div>
            )}
          </div>
          {!!id && (
            <ul className="flex w-full max-w-full flex-col gap-2">
              <ListItemsCell
                listId={id}
                dashboard
                editing={editing}
                onListItemsUpdate={resetNewListItem}
              />
            </ul>
          )}
        </div>
        <ListFadeOut />
      </div>
    </>
  )
}

export default DashboardList
