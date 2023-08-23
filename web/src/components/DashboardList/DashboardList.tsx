import { useEffect, useState } from 'react'

import { kebabCase } from 'lodash'
import { startCase, camelCase } from 'lodash'
import { Pencil, PlusCircle, Save, X } from 'lucide-react'
import { FindListQuery, ListItem } from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { UPDATE_LIST_MUTATION } from '../Admin/List/EditListCell'
import { CREATE_LIST_MUTATION } from '../Admin/List/NewList'
import DashboardListItem from '../DashboardListItem/DashboardListItem'
import FormItem from '../FormItem/FormItem'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import ListItemsCell from '../ListItemsCell'
import PageTitle from '../PageTitle/PageTitle'
import SectionTitle from '../SectionTitle/SectionTitle'

// const LIST_TYPES = [
//   'AWESOME',
//   'BABY_SHOWER',
//   'BOOKMARKS',
//   'FAVORITES',
//   'FORUM',
//   'INVENTORY',
//   'JOBS',
//   'LINKTREE',
//   'SOCIAL',
//   'TABLE',
//   'TODO',
//   'TOP',
//   'WEDDING',
//   'WISHLIST',
// ]

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
    className="btn btn-ghost flex h-12 w-12 items-center justify-center rounded-full p-0"
  >
    <PlusCircle />
  </button>
)
const DashboardList: React.FC<FindListQuery | { list: undefined }> = ({
  list,
}) => {
  const { id, name, description, identifier, type } = list || {
    type: 'WISHLIST',
  }

  // TODO: default to if user has edit access
  const [editing, setEditing] = useState<boolean>(!id)
  const [listItem, setListItem] = useState<Partial<ListItem> | undefined>()

  const [updateListMutation] = useMutation(UPDATE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List updated')
      setEditing(false)
      // navigate(routes.lists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createListMutation] = useMutation(CREATE_LIST_MUTATION, {
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
  })

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

  const onSave = (input, event) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (!editing) {
      return
    }

    if (id) {
      updateListMutation({
        variables: {
          id,
          input: {
            ...input,
            // TODO: allow changing id
            identifier: undefined,
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
        <dialog id="newListItem" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative flex flex-col gap-y-6">
            <div className="flex items-center gap-3">
              <div className="flex-grow">
                <SectionTitle>Add new item</SectionTitle>
              </div>
              {/* <button
              // TODO: don't use z
              className="btn btn-secondary z-10 flex h-8 min-h-0 w-8 flex-grow-0 items-center justify-center self-start p-0"
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
      <div className="flex w-full max-w-xl flex-col gap-5 overflow-x-hidden">
        <Form
          className="flex w-full max-w-full flex-col gap-3 overflow-x-hidden"
          onSubmit={onSave}
        >
          <PageTitle title={name || 'Add new list'}>
            <button
              className="btn btn-secondary flex h-12 min-h-0 w-12 flex-grow-0 items-center justify-center rounded-full p-0"
              type={editing ? 'submit' : 'button'}
              onClick={
                editing
                  ? undefined
                  : () => setImmediate(() => setEditing(!editing))
              }
            >
              {editing ? <Save /> : <Pencil />}
            </button>
          </PageTitle>
          <div className="flex max-w-xl flex-col gap-5">
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
              <div className="flex items-center p-1 text-sm text-gray-500">
                {`Ex. list.cafe/${identifier?.id || 'your-list-name'}`}
              </div>
            </FormItem>
            <FormItem
              name="description"
              defaultValue={description}
              editing={editing}
              label={<SectionTitle>Description</SectionTitle>}
            />
            <FormItem
              type="text"
              name="type"
              defaultValue={startCase(camelCase(type))}
              editing={editing}
              label={<SectionTitle>Type</SectionTitle>}
              disabled
            />
          </div>
        </Form>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SectionTitle>Items</SectionTitle>
            {/* TODO: support without having saved */}
            {!!id && (
              <div className="flex items-center gap-3">
                <AddItemButton onClick={createNewListItem} />
              </div>
            )}
          </div>
          {!!id && (
            <ul className="flex flex-col gap-2">
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
