import { useEffect, useMemo, useState } from 'react'

// import classNames from 'classnames'
import intersection from 'lodash/intersection'
import isUndefined from 'lodash/isUndefined'
import kebabCase from 'lodash/kebabCase'
import { Cog, Eye, List, Save, Trash2, Users } from 'lucide-react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import {
  CreateListInput,
  CreateListItemInput,
  FindListQuery,
  GroupRole,
  ListItemsQuery,
  ListRole,
  UpdateListInput,
} from 'types/graphql'

import { SignupAttributes } from '@redwoodjs/auth-dbauth-web'
import { FormProvider, useForm, useFormContext } from '@redwoodjs/forms'
import { BrowserOnly } from '@redwoodjs/prerender/browserUtils'
import { Link, navigate, routes, useMatch, useParams } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
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
import { ListPrompt } from 'src/components/ListPrompt/ListPrompt'
import { ListTypeBadge } from 'src/components/Lists/Lists'
import PageTitle from 'src/components/PageTitle/PageTitle'
import Tabs from 'src/components/Tabs/Tabs'
import { DigestedList } from 'src/pages/HomePage/HomePage'

// import { useSidebarContext } from '../SidebarLayout/SidebarLayout'

type ListForm = NonNullable<CreateListInput>

export const ListTabs: ListCellChild = ({
  list: { id },
  canAddMembers,
  canEdit,
}) => {
  const { groupId } = useParams()

  return (
    <Tabs
      links={[
        {
          name: 'List',
          path: groupId
            ? routes.groupList({ groupId: +groupId, id })
            : routes.list({ id }),
          Icon: List,
        },
        ...(canAddMembers
          ? [
              {
                name: 'Members',
                path: groupId
                  ? routes.groupListMembers({ groupId: +groupId, id })
                  : routes.listMembers({ id }),
                Icon: Users,
              },
            ]
          : []),
        ...(canEdit
          ? [
              {
                name: 'Settings',
                path: groupId
                  ? routes.groupListSettings({ groupId: +groupId, id })
                  : routes.listSettings({ id }),
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
      <div className="flex max-w-full flex-shrink flex-grow items-center gap-6 overflow-hidden overflow-ellipsis">
        <span className="flex-shrink overflow-hidden overflow-ellipsis">
          {name || 'Create a new list'}
        </span>
        {!!id && <ListTypeBadge type={type} />}
      </div>
      <div className="flex min-w-0 flex-shrink-0 flex-grow-0 items-center gap-2 overflow-hidden text-ellipsis">
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
                window?.confirm('Are you sure you want to delete this list?') &&
                onDelete()
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

// TODO: I think this isn't exactly how it should work, it should be specific to each group - can the backend return canEdit, delete, etc.?
export const listGroupRolesIntersect = (
  groupListRoles: ListRole[] | undefined,
  authListRoles: ListRole[],
  groupRoles: GroupRole[] | undefined,
  authGroupRoles: GroupRole[]
) =>
  !!groupListRoles?.length &&
  !!groupRoles?.length &&
  listRolesIntersect(groupListRoles, authListRoles) &&
  !!intersection(groupRoles, authGroupRoles).length

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
  const digestedDraftList: DigestedList | undefined = useMemo(() => {
    if (list?.id) {
      window?.localStorage.removeItem('listDraft')
      return
    }

    try {
      const draftString = window?.localStorage.getItem('listDraft')

      if (!draftString) {
        throw new Error('listDraft is not available on localStorage')
      }

      const draft: DigestedList = JSON.parse(draftString)

      return draft
    } catch (error) {
      //
    }
  }, [list?.id])

  const { groupId } = useParams()

  // const { open } = useSidebarContext()

  const [draftList, setDraftList] = useState<DigestedList | undefined>(
    digestedDraftList
  )

  const { id, listRoles, groupListRoles, groupRoles } = list

  const { signUp, isAuthenticated } = useAuth()

  const [digestingPrompt, setDigestingPrompt] = useState<boolean>(false)
  const [showPrompt, setShowPrompt] = useState<boolean>(
    !id && !draftList && !digestingPrompt
  )

  const [pendingList, setPendingList] = useState<CreateListInput | undefined>()
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const resetPendingList = () => {
    setPendingList(undefined)
  }

  const defaultValues: CreateListInput = {
    ...list,
    ...draftList,
  }
  if (!defaultValues.identifier?.id && defaultValues?.name) {
    defaultValues.identifier = {
      id: kebabCase(defaultValues?.name),
    }
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
    id
      ? groupId
        ? routes.groupListSettings({ groupId: +groupId, id })
        : routes.listSettings({ id })
      : 'noMatch'
  )

  const { data } = useQuery<{ listItems?: ListItemsQuery['listItems'] }>(
    LIST_ITEMS_CELL_QUERY,
    {
      variables: { listId: id },
      skip: !id,
    }
  )

  const [listItems, setListItems] = useState<
    CreateListItemInput[] | ListItemsQuery['listItems']
  >([])

  const items = useMemo(() => {
    return data?.listItems || listItems || []
  }, [data, listItems])

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

    window?.localStorage.removeItem('listDraft')
  }, [draftList, listItems])

  const canDelete = useMemo(
    () =>
      listRolesIntersect(listRoles, ['OWNER']) ||
      listGroupRolesIntersect(groupListRoles, ['OWNER'], groupRoles, ['OWNER']),
    [listRoles, groupListRoles, groupRoles]
  )

  const canEdit = useMemo(
    () =>
      listRolesIntersect(listRoles, ['EDIT', 'OWNER', 'ADMIN']) ||
      listGroupRolesIntersect(
        groupListRoles,
        ['OWNER', 'EDIT', 'ADMIN'],
        groupRoles,
        ['OWNER', 'ADMIN', 'EDIT']
      ),
    [listRoles, groupListRoles, groupRoles]
  )

  const canSave = id ? canEdit : true

  const canAddMembers = useMemo(
    () => listRolesIntersect(listRoles, ['OWNER', 'ADMIN']),
    // || listGroupRolesIntersect(groupListRoles, ['OWNER', 'ADMIN'], groupRoles, [
    //   'OWNER',
    //   'ADMIN',
    //   'EDIT',
    // ]),
    [listRoles] // , groupListRoles, groupRoles]
  )

  const [deleteListMutation, { loading: deleteLoading }] = useMutation(
    DELETE_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('List deleted')
        navigate(groupId ? routes.group({ groupId: +groupId }) : routes.lists())
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
          setImmediate(() =>
            navigate(
              groupId
                ? routes.groupList({
                    groupId: +groupId,
                    id: data?.createList.id,
                  })
                : routes.list({ id: data?.createList.id })
            )
          )
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const loading = id
    ? updateLoading || deleteLoading
    : createLoading || signingUp

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

    if (!isAuthenticated && !pendingList) {
      setPendingList(input as CreateListInput)
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

    window?.localStorage.removeItem('listDraft')
  }

  useEffect(() => {
    return () => {
      window?.localStorage.removeItem('listDraft')
    }
  }, [])

  // useEffect(() => {
  //   if (!id && !draftList && !items?.length && !digestingPrompt) {
  //     setShowPrompt(true)
  //   }
  // }, [id, draftList, items, digestingPrompt])

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
    signUpAndCreateList,
    pendingList,
    resetPendingList,
  }

  return (
    <>
      <BrowserOnly>
        <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-center justify-center">
          <ReactCanvasConfetti
            fire={digestingPrompt}
            height={window?.innerHeight}
            width={window?.innerWidth}
            // className={classNames(
            //   open ? 'sm:-translate-x-20' : 'sm:-translate-x-24'
            // )}
          />
        </div>
      </BrowserOnly>
      <FormProvider {...formMethods}>
        <div className="flex w-full max-w-full flex-col gap-8">
          <div className="flex w-full max-w-full flex-col gap-3">
            <ListPageTitle
              {...props}
              canSave={canSave && (!id || settingsMatch) && !showPrompt}
            />
            {!!id && <ListTabs {...props} />}
            {!showPrompt && <Child {...props} />}
            {showPrompt && (
              <ListPrompt
                onStart={() => setDigestingPrompt(true)}
                onEnd={() => {
                  setShowPrompt(false)
                  setDigestingPrompt(false)
                }}
                onSuccess={(draft) => {
                  setDraftList(draft)
                  formMethods.reset({
                    identifier: {
                      id: kebabCase(draft.name),
                    },
                    ...draft,
                  })
                  setShowPrompt(false)
                  setDigestingPrompt(false)
                }}
                // className="max-w-3xl"
              >
                {!digestingPrompt && (
                  <div className="flex w-full max-w-full flex-col items-center gap-3 px-3 text-center">
                    <div className="w-40 text-xl font-bold">OR</div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setShowPrompt(false)}
                    >
                      Create manually
                    </button>
                  </div>
                )}
              </ListPrompt>
            )}
          </div>
          <ListFadeOut />
        </div>
      </FormProvider>
    </>
  )
}

export default DashboardListLayout
