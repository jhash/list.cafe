import { useMemo } from 'react'

import intersection from 'lodash/intersection'
import { Cog, Eye, List, Save, Trash2 } from 'lucide-react'
import { FindGroupQuery, GroupRole } from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { UPDATE_GROUP_MUTATION } from '../Admin/Group/EditGroupCell'
import { DELETE_GROUP_MUTATION } from '../Admin/Group/Group'
import { CREATE_GROUP_MUTATION } from '../Admin/Group/NewGroup'
import { DashboardGroupChild } from '../DashboardGroupSettings/DashboardGroupSettings'
import { QUERY as GROUP_CELL_QUERY } from '../GroupCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import PageTitle from '../PageTitle/PageTitle'
import Tabs from '../Tabs/Tabs'

const DEFAULT_GROUP: Partial<FindGroupQuery['group']> = {
  type: 'GENERIC',
  visibility: 'PRIVATE',
}

export const groupRolesIntersect = (
  roles: GroupRole[] | undefined,
  authRoles: GroupRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

type DashboardGroupProps = {
  Child: DashboardGroupChild
} & (FindGroupQuery | { group: undefined })

const DashboardGroup: React.FC<DashboardGroupProps> = ({
  group = { ...DEFAULT_GROUP },
  Child,
}) => {
  const { id, name, identifier, groupRoles } = group

  const canDelete = useMemo(
    () => groupRolesIntersect(groupRoles, ['OWNER', 'ADMIN']),
    [groupRoles]
  )

  const canEdit = useMemo(
    () => groupRolesIntersect(groupRoles, ['EDIT', 'OWNER', 'ADMIN']),
    [groupRoles]
  )

  const canSave = id ? canEdit : true

  const canAddMembers = useMemo(
    () => groupRolesIntersect(groupRoles, ['OWNER', 'ADMIN']),
    [groupRoles]
  )

  const [deleteGroupMutation, { loading: deleteLoading }] = useMutation(
    DELETE_GROUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group deleted')
        navigate(routes.groups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: GROUP_CELL_QUERY, variables: { id } }],
      awaitRefetchQueries: true,
    }
  )

  const [updateGroupMutation, { loading: updateLoading }] = useMutation(
    UPDATE_GROUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group updated')
        // navigate(routes.groups())
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: GROUP_CELL_QUERY, variables: { id } }],
      awaitRefetchQueries: true,
    }
  )

  const [createGroupMutation, { loading: createLoading }] = useMutation(
    CREATE_GROUP_MUTATION,
    {
      onCompleted: (data) => {
        toast.success('Group created')
        if (data?.createGroup) {
          navigate(routes.group({ groupId: data?.createGroup.id }))
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const loading = id ? updateLoading || deleteLoading : createLoading

  const onDelete = () => deleteGroupMutation({ variables: { id } })

  const onSave = (input, event) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (loading) {
      return
    }

    if (id) {
      updateGroupMutation({
        variables: {
          id,
          input,
        },
      })
    } else {
      createGroupMutation({
        variables: {
          input,
        },
      })
    }
  }

  return (
    <>
      <MetaTags
        title={name || 'Create a new group'}
        description={id ? name : 'Create a new group'}
      />
      <div className="flex w-full max-w-full flex-col gap-8">
        <Form
          className="flex w-full max-w-full flex-col gap-3"
          onSubmit={onSave}
        >
          <PageTitle title={name || 'Create a new group'}>
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
                    window?.confirm(
                      'Are you sure you want to delete this group?'
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
                type={'submit'}
                disabled={loading}
              >
                <Save />
              </button>
            )}
          </PageTitle>
          {!!id && (
            <Tabs
              links={[
                {
                  name: 'Lists',
                  path: routes.group({ groupId: id }),
                  Icon: List,
                },
                ...(canEdit
                  ? [
                      {
                        name: 'Settings',
                        path: routes.groupSettings({ groupId: id }),
                        Icon: Cog,
                      },
                    ]
                  : []),
                ...(canAddMembers
                  ? [
                      {
                        name: 'Members',
                        path: routes.groupMembers({ groupId: id }),
                        Icon: Cog,
                      },
                    ]
                  : []),
              ]}
            />
          )}
          <Child
            group={group}
            loading={loading}
            editing
            canEdit={canEdit}
            canAddMembers={canAddMembers}
          />
        </Form>

        <ListFadeOut />
      </div>
    </>
  )
}

export default DashboardGroup
