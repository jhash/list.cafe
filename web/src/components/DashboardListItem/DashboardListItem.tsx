import { useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'
import { Link2, Pencil, Save, Trash2 } from 'lucide-react'
import {
  CreateImageInput,
  CreateListItemInput,
  CreateListItemMutation,
  ListItemsQuery,
  UpdateListItemInput,
} from 'types/graphql'

import { Form, NumberField } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Loading from 'src/components/Loading'
import { listRolesIntersect } from 'src/layouts/DashboardListLayout/DashboardListLayout'
import { matchListTypeOption } from 'src/lib/lists'

import { UPDATE_LIST_ITEM_MUTATION } from '../Admin/ListItem/EditListItemCell'
import { DELETE_LIST_ITEM_MUTATION } from '../Admin/ListItem/ListItem'
import { CREATE_LIST_ITEM_MUTATION } from '../Admin/ListItem/NewListItem'
import DashboardListItemImages from '../DashboardListItemImages/DashboardListItemImages'
import ExternalLink from '../ExternalLink/ExternalLink'
import FormItem from '../FormItem/FormItem'
import { QUERY as LIST_CELL_QUERY } from '../ListCell'
import { QUERY as LIST_ITEMS_CELL_QUERY } from '../ListItemsCell'
import UploadImages from '../UploadImages/UploadImages'

export const CREATE_IMAGE_MUTATION = gql`
  mutation CreateImageMutation($input: CreateImageInput!) {
    createImage(input: $input) {
      id
    }
  }
`

export const LIST_ITEM_IMAGES_QUERY = gql`
  query ListItemImagesQuery($listItemId: Int!) {
    images(listItemId: $listItemId) {
      id
      url
      alt
    }
  }
`

type CreateListItemForm = NonNullable<CreateListItemMutation['createListItem']>

type DashboardListItemProps = Omit<
  ListItemsQuery['listItems'][number],
  'id' | 'listId'
> & {
  id?: number
  addItem?: (item: CreateListItemInput) => void
  deleteItem?: (index: number) => void
  listId?: number
  modal: boolean
  index?: number
}
const DashboardListItem: React.FC<DashboardListItemProps> = ({
  addItem,
  deleteItem,
  modal,
  index,
  ...listItem
}) => {
  const linkRef = useRef<HTMLInputElement>()

  const {
    id,
    title,
    description,
    url,
    quantity,
    price,
    listId,
    listRoles,
    list,
    images,
  } = listItem

  const [editing, setEditing] = useState<boolean>(!id)
  const [pendingImages, setPendingImages] = useState<
    CreateImageInput[] | undefined
  >()

  const [open, setOpen] = useState<boolean>(modal && editing)

  const canEdit = useMemo(
    () =>
      listRolesIntersect(listRoles, ['OWNER', 'ADMIN', 'CONTRIBUTE', 'EDIT']),
    [listRoles]
  )

  const canDelete = useMemo(
    () =>
      !id ||
      listRolesIntersect(listRoles, ['OWNER', 'ADMIN', 'CONTRIBUTE', 'EDIT']),
    [listRoles, id]
  )

  const { data: imagesQuery, loading: imagesLoading } = useQuery(
    LIST_ITEM_IMAGES_QUERY,
    { variables: { listItemId: id } }
  )

  const [createImageMutation, { loading: createImageLoading }] = useMutation(
    CREATE_IMAGE_MUTATION,
    {
      refetchQueries: [LIST_ITEM_IMAGES_QUERY],
      awaitRefetchQueries: true,
    }
  )

  const { images: queryImages } = imagesQuery || {}

  const imagesFinal = queryImages || images
  const imagesLoadingFinal = imagesLoading || createImageLoading

  const [createListItem, { loading: createLoading, error: createError }] =
    useMutation(CREATE_LIST_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('List item created')
        setOpen(false)
        setEditing(false)
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
        setEditing(false)
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

  const loading = id ? createLoading : updateLoading || deleteLoading
  const error = id ? createError : updateError || deleteError

  const onSave = (input: CreateListItemInput | UpdateListItemInput, event) => {
    if (!id && !listId && !modal) {
      setOpen(false)
      return
    }

    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (loading) {
      return
    }

    const inputWithImages: CreateListItemInput = {
      title: '',
      ...input,
      images: pendingImages,
    }

    if (!listId) {
      addItem(inputWithImages)
      toast.success('List item created')
      return
    }

    if (id) {
      updateListItem({ variables: { id, input } })
    } else {
      createListItem({ variables: { input: inputWithImages } })
    }
  }

  const onDelete = () => {
    if (!id) {
      deleteItem?.(index)
      return
    }
    deleteListItem({ variables: { id } })
  }

  const onUpload = async (images: CreateImageInput[]) => {
    if (!id) {
      setPendingImages(images)
      return
    }

    for (const image of images) {
      await createImageMutation({
        variables: { input: { ...image, listItemId: id } },
      })
    }

    toast.success('Successfully added images')
  }

  useEffect(() => {
    setImmediate(() => linkRef?.current?.focus())
  }, [linkRef])

  const linkItem = (
    <FormItem
      disabled={loading}
      editing={editing}
      name="url"
      defaultValue={url}
      className="text-base"
      label="Link"
      ref={linkRef}
    />
  )

  return (
    <Form<CreateListItemForm>
      className={classNames(
        'w-full max-w-full flex-grow',
        !modal && 'collapse-arrow collapse rounded-lg border shadow-sm'
      )}
      name="list-item-form"
      onSubmit={(input, event) => onSave(input, event)}
    >
      {!modal && (
        <input
          type="radio"
          checked={open}
          onChange={() => {
            //
          }}
          onClick={() => setOpen(!open)}
          className="min-h-12 cursor-pointer leading-none"
        />
      )}
      {!modal && (
        <div
          className={classNames(
            'collapse-title min-h-12 flex h-12 flex-grow flex-nowrap items-center gap-3 overflow-hidden overflow-ellipsis px-4 py-0 pr-12 leading-tight',
            !!open && 'border-b'
          )}
        >
          <div className="flex max-h-full flex-grow items-start gap-3 overflow-hidden overflow-ellipsis py-1">
            {title}
            {!!url && (
              <ExternalLink
                href={url}
                // TODO: don't use z
                className="z-10 flex h-full flex-shrink-0 items-center self-center"
                onClick={(event) => event.stopPropagation()}
              >
                <Link2 size="1rem" className="flex-shrink-0" />
              </ExternalLink>
            )}
          </div>
          <div className="flex h-full items-center justify-end gap-3 overflow-hidden overflow-ellipsis py-1">
            {!!description && (
              <span className="flex max-h-full flex-shrink overflow-hidden overflow-ellipsis whitespace-normal text-right text-sm text-gray-500 dark:text-gray-400">
                {description}
              </span>
            )}
            <div className="flex flex-shrink-0 items-center gap-3">
              {!editing && !!canEdit && (
                <button
                  // TODO: don't use z
                  className="btn btn-secondary z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0"
                  type="button"
                  onClick={() => {
                    setEditing(true)
                    setOpen(true)
                  }}
                  disabled={loading}
                >
                  <Pencil size="1.25rem" />
                </button>
              )}
              {!!open && !!editing && !!id && (
                <button
                  // TODO: don't use z
                  className="btn btn-secondary z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0"
                  type="submit"
                  disabled={loading}
                >
                  <Save size="1.25rem" />
                </button>
              )}
              {canDelete && (
                <button
                  // TODO: don't use z
                  className="btn btn-error z-10 flex h-9 min-h-0 w-9 flex-grow-0 items-center justify-center rounded-full p-0"
                  disabled={loading}
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    return id
                      ? window?.confirm(
                          'Are you sure you want to delete this item?'
                        ) && onDelete()
                      : onDelete()
                  }}
                >
                  <Trash2 size="1.25rem" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={classNames(
          'flex w-full max-w-full flex-shrink-0 flex-wrap gap-x-5 gap-y-2',
          !modal && 'collapse-content overflow-x-visible',
          !!open && !modal && 'py-4'
        )}
      >
        {!!listId && <NumberField hidden name="listId" defaultValue={listId} />}
        {(!!editing || !!imagesFinal?.length) && (
          <div className="flex w-full max-w-xl flex-col gap-1">
            {!!imagesFinal?.length && (
              <>
                <div className="label font-medium">Images</div>
                <div className="flex items-center gap-3 overflow-x-auto pb-3">
                  {!!imagesLoadingFinal && <Loading />}
                  <DashboardListItemImages
                    images={imagesFinal}
                    editing={editing}
                  />
                </div>
              </>
            )}
            {!!editing && (
              <>
                <div className="label flex gap-2 font-medium">
                  Add images
                  {!!pendingImages?.length && (
                    <span className="text-gray-500">{`${pendingImages.length} ${
                      pendingImages.length === 1 ? 'image' : 'images'
                    } uploaded`}</span>
                  )}
                </div>
                <UploadImages onUpload={onUpload} />
              </>
            )}
          </div>
        )}
        {url ? (
          <ExternalLink
            href={url}
            // TODO: don't use z
            className="link z-10 max-w-xl flex-grow"
            onClick={(event) => event.stopPropagation()}
          >
            {linkItem}
          </ExternalLink>
        ) : (
          linkItem
        )}
        <FormItem
          disabled={loading}
          editing={editing}
          name="title"
          defaultValue={title}
          className="text-base"
          label="Title"
          validation={{
            required: {
              value: true,
              message: 'Title is required',
            },
          }}
        />
        <FormItem
          disabled={loading}
          type="number"
          step="0.01"
          editing={editing}
          name="price"
          defaultValue={price ? price : undefined}
          className="text-base"
          label="Price"
        />
        {!!matchListTypeOption(list?.type)?.reservations && (
          <FormItem
            disabled={loading}
            type="number"
            editing={editing}
            name="quantity"
            defaultValue={quantity ? quantity : undefined}
            className="text-base"
            label="Quantity"
          />
        )}
        <FormItem
          type="textarea"
          disabled={loading}
          editing={editing}
          name="description"
          defaultValue={description}
          className="text-base"
          label="Description"
        />
        {!!error?.message && (
          <p className="label-error label font-medium">{error?.message}</p>
        )}
        {!id && !!open && !!editing && (
          <button
            // TODO: don't use z
            className="btn btn-secondary z-10 mt-4 flex min-h-0 w-full max-w-xl flex-grow items-center justify-center self-end rounded p-0 px-4"
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
