import { useEffect, useMemo, useState } from 'react'

import intersection from 'lodash/intersection'
import isUndefined from 'lodash/isUndefined'
import kebabCase from 'lodash/kebabCase'
import { Cog, Eye, List, Save, Trash2, Users } from 'lucide-react'
import {
  CreateListInput,
  CreateListItemInput,
  FindListQuery,
  ListRole,
  UpdateListInput,
} from 'types/graphql'

import { FormProvider, useForm, useFormContext } from '@redwoodjs/forms'
import { Link, navigate, routes, useMatch } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { UPDATE_LIST_MUTATION } from 'src/components/Admin/List/EditListCell'
import { DELETE_LIST_MUTATION } from 'src/components/Admin/List/List'
import { CREATE_LIST_MUTATION } from 'src/components/Admin/List/NewList'
import {
  ListCellChildProps,
  ListCellType,
  QUERY as LIST_CELL_QUERY,
  ListCellChild,
} from 'src/components/ListCell'
import ListFadeOut from 'src/components/ListFadeOut/ListFadeOut'
import { QUERY as LIST_ITEMS_CELL_QUERY } from 'src/components/ListItemsCell'
import { ListTypeBadge } from 'src/components/Lists/Lists'
import PageTitle from 'src/components/PageTitle/PageTitle'
import Tabs from 'src/components/Tabs/Tabs'
import { DigestedList } from 'src/pages/HomePage/HomePage'

type ListForm = NonNullable<CreateListInput>

export const ListTabs: ListCellChild = ({
  list: { id },
  canAddMembers,
  canEdit,
}) => {
  return (
    <Tabs
      links={[
        {
          name: 'List',
          path: routes.list({ id }),
          Icon: List,
        },
        ...(canAddMembers
          ? [
              {
                name: 'Members',
                path: routes.listMembers({ id }),
                Icon: Users,
              },
            ]
          : []),
        ...(canEdit
          ? [
              {
                name: 'Settings',
                path: routes.listSettings({ id }),
                Icon: Cog,
              },
            ]
          : []),
      ]}
    />
  )
}
type ListPageTitleProps = ListCellChildProps & {
  canDelete?: boolean
  canSave?: boolean
  loading?: boolean
  onDelete?: () => void
}
export const ListPageTitle: React.FC<ListPageTitleProps> = ({
  list: { name, id, identifier, type },
  canDelete,
  canSave,
  onDelete,
  loading,
  onSave,
}) => {
  const { handleSubmit } = useFormContext()

  return (
    <PageTitle>
      <div className="flex flex-shrink flex-grow items-center gap-6">
        {name || 'Create a new list'}
        {!!id && <ListTypeBadge type={type} />}
      </div>
      <div className="flex min-w-0 flex-shrink-0 flex-grow-0 items-center gap-2 text-ellipsis">
        {!!id && !!identifier?.id && (
          <Link
            to={routes.identifier({ identifier: identifier?.id })}
            className="btn btn-primary flex h-10 min-h-0 w-10 flex-grow-0 items-center justify-center rounded-full p-0"
            title="Preview"
          >
            <Eye />
          </Link>
        )}
        {!!id && canDelete && onDelete && (
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
            type="submit"
            disabled={loading}
            onClick={handleSubmit(onSave)}
          >
            <Save />
          </button>
        )}
      </div>
    </PageTitle>
  )
}

export const listRolesIntersect = (
  roles: ListRole[] | undefined,
  authRoles: ListRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

const DEFAULT_LIST: FindListQuery['list'] = {
  id: undefined,
  name: '',
  type: 'WISHLIST',
  visibility: 'PRIVATE',
}

const DashboardListLayout: ListCellType = ({
  list = { ...DEFAULT_LIST },
  Child,
}) => {
  if (!Child) {
    throw new Error('Child is required within DashboardListLayout')
  }
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

  const { id, listRoles } = list

  const defaultValues: CreateListInput = {
    ...list,
    ...draftList,
  }
  const formMethods = useForm<ListForm>({
    defaultValues: {
      description: defaultValues.description,
      identifier: defaultValues.identifier,
      listItems: defaultValues.listItems,
      name: defaultValues.name,
      type: defaultValues.type,
      visibility: defaultValues.visibility,
    },
  })

  const { match: settingsMatch } = useMatch(
    id ? routes.listSettings({ id }) : 'noMatch'
  )

  const { data } = useQuery(LIST_ITEMS_CELL_QUERY, {
    variables: { listId: id },
  })

  const [listItems, setListItems] = useState<CreateListItemInput[]>([])

  const items = data?.listItems || listItems

  const addItem = (input: CreateListItemInput) => {
    if (id) {
      return
    }

    setListItems([...items, input])
  }

  const deleteItem = (index?: number) => {
    if (id) {
      return
    }
    if (isUndefined(index)) {
      return
    }
    const copy = [...items]
    copy.splice(index, 1)
    setListItems(copy)
  }

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

  const canAddMembers = useMemo(
    () => listRolesIntersect(listRoles, ['OWNER', 'ADMIN']),
    [listRoles]
  )

  const [deleteListMutation, { loading: deleteLoading }] = useMutation(
    DELETE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('List deleted')
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
        if (data?.createList) {
          setImmediate(() => navigate(routes.list({ id: data?.createList.id })))
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const loading = id ? updateLoading || deleteLoading : createLoading

  const onDelete = () => deleteListMutation({ variables: { id } })

  const onSave = (
    input: CreateListInput | UpdateListInput,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (loading) {
      return
    }

    if (id) {
      updateListMutation({
        variables: {
          id,
          input: {
            ...input,
            identifier: {
              id: kebabCase(input.identifier?.id),
            },
          },
        },
      })
    } else {
      createListMutation({
        variables: {
          input: {
            ...input,
            identifier: {
              id: kebabCase(input.identifier?.id),
            },
            listItems,
          },
        },
      })
    }

    window.localStorage.removeItem('listDraft')
  }

  useEffect(() => {
    return () => {
      window.localStorage.removeItem('listDraft')
    }
  }, [])

  const props: ListCellChildProps = {
    list,
    items,
    canDelete,
    canSave,
    canEdit,
    canAddMembers,
    onDelete,
    onSave,
    loading,
    addItem,
    deleteItem,
  }

  return (
    <FormProvider {...formMethods}>
      <div className="flex w-full max-w-full flex-col gap-8">
        <div className="flex w-full max-w-full flex-col gap-3">
          <ListPageTitle
            {...props}
            canSave={canSave && (!id || settingsMatch)}
          />
          {!!id && <ListTabs {...props} />}
          <Child {...props} />
        </div>
        <ListFadeOut />
      </div>
    </FormProvider>
  )
}

export default DashboardListLayout
