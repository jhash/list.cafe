import { useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'
import { Link2, Pencil, Save, Trash2 } from 'lucide-react'
import {
  CreateListItemInput,
  CreateListItemMutation,
  ListItemsQuery,
  UpdateListItemInput,
} from 'types/graphql'

import { Form, NumberField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { UPDATE_LIST_ITEM_MUTATION } from '../Admin/ListItem/EditListItemCell'
import { DELETE_LIST_ITEM_MUTATION } from '../Admin/ListItem/ListItem'
import { CREATE_LIST_ITEM_MUTATION } from '../Admin/ListItem/NewListItem'
import { listRolesIntersect } from '../DashboardList/DashboardList'
import FormItem from '../FormItem/FormItem'
import { QUERY as LIST_CELL_QUERY } from '../ListCell'
import { QUERY as LIST_ITEMS_CELL_QUERY } from '../ListItemsCell'

type FormGroup = NonNullable<CreateListItemMutation['createListItem']>

type DashboardListItemProps = Omit<
  ListItemsQuery['listItems'][number],
  'id'
> & {
  id?: number
  editing: boolean
  toggleEditing?: () => void
  onListItemsUpdate?: () => void
}
const DashboardListItem: React.FC<DashboardListItemProps> = ({
  editing = false,
  onListItemsUpdate,
  toggleEditing,
  ...listItem
}) => {
  const titleRef = useRef<HTMLInputElement>()
  const { id, title, description, url, quantity, price, listId, listRoles } =
    listItem

  const [open, setOpen] = useState<boolean>(!id && editing)

  const canDelete = useMemo(
    () =>
      listRolesIntersect(listRoles, ['OWNER', 'ADMIN', 'CONTRIBUTE', 'EDIT']),
    [listRoles]
  )

  const [createListItem, { loading: createLoading, error: createError }] =
    useMutation(CREATE_LIST_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('List item created')
        onListItemsUpdate?.()
        setOpen(false)
        // navigate(routes.adminGroups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        { query: LIST_ITEMS_CELL_QUERY, variables: { listId } },
        { query: LIST_CELL_QUERY, variables: { id: listId } },
      ],
      awaitRefetchQueries: true,
    })

  const [updateListItem, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_LIST_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('List item updated')
        setOpen(false)
        // navigate(routes.adminGroups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        { query: LIST_ITEMS_CELL_QUERY, variables: { listId } },
        { query: LIST_CELL_QUERY, variables: { id: listId } },
      ],
      awaitRefetchQueries: true,
    })

  const [deleteListItem, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_LIST_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('List item deleted')
        // navigate(routes.adminGroups())
      },
      onError: (error) => {
        console.error(error)
        toast.error(error.message)
      },
      refetchQueries: [
        { query: LIST_ITEMS_CELL_QUERY, variables: { listId } },
        { query: LIST_CELL_QUERY, variables: { id: listId } },
      ],
      awaitRefetchQueries: true,
    })

  const loading = id ? createLoading : updateLoading || deleteLoading
  const error = id ? createError : updateError || deleteError

  const onSave = (input: CreateListItemInput | UpdateListItemInput, event) => {
    console.log(input, event)
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (loading) {
      return
    }

    if (id) {
      updateListItem({ variables: { id, input } })
    } else {
      createListItem({ variables: { input } })
    }
  }

  const onDelete = () => deleteListItem({ variables: { id } })

  useEffect(() => {
    if (!id && !open) {
      setOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    setImmediate(() =>
      (titleRef?.current as unknown as HTMLInputElement | null)?.focus()
    )
  }, [titleRef])

  return (
    <Form<FormGroup>
      className={classNames(
        'w-full max-w-full flex-grow',
        !!id && 'collapse-arrow collapse rounded-lg border shadow-sm'
      )}
      name="list-item-form"
      onSubmit={(input, event) => onSave(input, event)}
    >
      {!!id && (
        <input
          type="radio"
          checked={open}
          onChange={() => {
            //
          }}
          disabled={!id}
          onClick={() => setOpen(!open)}
          className="min-h-12 cursor-pointer leading-none"
        />
      )}
      {!!id && (
        <div
          className={classNames(
            'collapse-title min-h-12 flex h-12 flex-grow flex-nowrap items-center gap-3 px-4 py-0 pr-12 leading-none',
            !!open && 'border-b'
          )}
        >
          <div className="flex flex-grow items-center gap-3">
            {title}
            {!!url && <Link2 size="1rem" />}
          </div>
          <div className="flex items-center gap-3">
            {!editing && (
              <button
                // TODO: don't use z
                className="btn btn-secondary z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
                type="button"
                onClick={toggleEditing}
                disabled={loading}
              >
                <Pencil size="1.25rem" />
              </button>
            )}
            {!!open && !!editing && (
              <button
                // TODO: don't use z
                className="btn btn-secondary z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
                type="submit"
                disabled={loading}
              >
                <Save size="1.25rem" />
              </button>
            )}
            {!!id && canDelete && (
              <button
                // TODO: don't use z
                className="btn btn-error z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center self-start rounded-full p-0"
                disabled={loading}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  return (
                    window.confirm(
                      'Are you sure you want to delete this item?'
                    ) && onDelete()
                  )
                }}
              >
                <Trash2 size="1.25rem" />
              </button>
            )}
          </div>
        </div>
      )}
      <div
        className={classNames(
          'flex w-full max-w-full flex-shrink-0 flex-wrap gap-x-5 gap-y-2',
          !!id && 'collapse-content overflow-x-hidden',
          !!open && 'py-4'
        )}
      >
        <NumberField hidden name="listId" defaultValue={listId} />
        <FormItem
          disabled={loading}
          editing={editing}
          name="title"
          defaultValue={title}
          className="text-base"
          label="Title"
          validation={{ required: true }}
          ref={titleRef}
        />
        <FormItem
          disabled={loading}
          editing={editing}
          name="url"
          defaultValue={url}
          className="text-base"
          label="Link"
        />
        <FormItem
          disabled={loading}
          editing={editing}
          name="description"
          defaultValue={description}
          className="text-base"
          label="Description"
        />
        <FormItem
          disabled={loading}
          type="number"
          editing={editing}
          name="quantity"
          defaultValue={quantity}
          className="text-base"
          label="Quantity"
          validation={{ required: true }}
        />
        <FormItem
          disabled={loading}
          type="number"
          step="0.01"
          editing={editing}
          name="price"
          defaultValue={price}
          className="text-base"
          label="Price"
        />
        {!!error?.message && (
          <p className="label-error label font-medium">{error?.message}</p>
        )}
        {!id && !!open && !!editing && (
          <button
            // TODO: don't use z
            className="btn btn-secondary z-10 mt-4 flex min-h-0 flex-grow items-center justify-center self-start rounded p-0 px-4"
            type="submit"
            disabled={loading}
          >
            <Save />
            Save
          </button>
        )}
      </div>
    </Form>
  )
}

export default DashboardListItem
