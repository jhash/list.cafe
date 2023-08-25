import { useMemo, useState } from 'react'

import intersection from 'lodash/intersection'
import kebabCase from 'lodash/kebabCase'
import { Eye, Pencil, Save, Trash2 } from 'lucide-react'
import { FindGroupQuery, GroupRole } from 'types/graphql'

import { Controller, Form } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { LIST_CAFE_DOMAIN } from 'src/constants/urls'

import { UPDATE_GROUP_MUTATION } from '../Admin/Group/EditGroupCell'
import { DELETE_GROUP_MUTATION } from '../Admin/Group/Group'
import { CREATE_GROUP_MUTATION } from '../Admin/Group/NewGroup'
import FormItem from '../FormItem/FormItem'
import { QUERY as GROUP_CELL_QUERY } from '../GroupCell'
import ListFadeOut from '../ListFadeOut/ListFadeOut'
import PageTitle from '../PageTitle/PageTitle'
import SectionTitle from '../SectionTitle/SectionTitle'

const GROUP_TYPE_OPTIONS = [
  { value: 'GENERIC', name: 'Generic' },
  { value: 'FRIENDS', name: 'Friends' },
  { value: 'FAMILY', name: 'Family' },
  { value: 'COMPANY', name: 'Company' },
  { value: 'NON_PROFIT', name: 'Non-Profit' },
]

const GROUP_VISIBILITY_OPTIONS = [
  {
    value: 'PRIVATE',
    name: 'Private',
    description: 'Only you and people you invite can access this group',
  },
  {
    value: 'LINK',
    name: 'Link',
    description:
      'Anyone with the link can view this group. This group will not appear in public search results',
  },
  {
    value: 'PUBLIC',
    name: 'Public',
    description:
      'This group is accessible by the public and will show in search results',
  },
]

export const groupRolesIntersect = (
  roles: GroupRole[] | undefined,
  authRoles: GroupRole[]
) => !!roles?.length && !!intersection(roles, authRoles).length

const DashboardGroup: React.FC<FindGroupQuery | { group: undefined }> = ({
  group,
}) => {
  const {
    id,
    name,
    identifier,
    type = 'GENERIC',
    visibility = 'PRIVATE',
    groupRoles,
  } = group || {}

  // TODO: remove admin?
  const canDelete = useMemo(
    () => groupRolesIntersect(groupRoles, ['OWNER', 'ADMIN']),
    [groupRoles]
  )

  const canEdit = useMemo(
    () => groupRolesIntersect(groupRoles, ['EDIT', 'OWNER', 'ADMIN']),
    [groupRoles]
  )

  const canSave = id ? canEdit : true

  // TODO: default to if user has edit access
  const [editing, setEditing] = useState<boolean>(!id)

  const [deleteGroupMutation, { loading: deleteLoading }] = useMutation(
    DELETE_GROUP_MUTATION,
    {
      onCompleted: () => {
        toast.success('Group deleted')
        setEditing(false)
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
        setEditing(false)
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
        setEditing(false)
        if (data?.createGroup) {
          navigate(routes.group({ id: data?.createGroup.id }))
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

    if (!editing || loading) {
      return
    }

    if (id) {
      updateGroupMutation({
        variables: {
          id,
          input: {
            ...input,
            type,
            identifier: {
              id: kebabCase(input.identifier),
            },
          },
        },
      })
    } else {
      createGroupMutation({
        variables: {
          input: {
            ...input,
            type,
            identifier: {
              id: kebabCase(input.identifier),
            },
          },
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
                    window.confirm(
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
                      'your-group-name'
                    }`}
                  </div>
                )}
              />
            </FormItem>
            <FormItem
              disabled={loading}
              type="select"
              name="visibility"
              defaultValue={visibility}
              editing={editing}
              label={<SectionTitle>Visibility</SectionTitle>}
              options={GROUP_VISIBILITY_OPTIONS}
            />
            <FormItem
              type="select"
              name="type"
              defaultValue={type}
              editing={editing}
              label={<SectionTitle>Type</SectionTitle>}
              disabled
              options={GROUP_TYPE_OPTIONS}
            />
          </div>
        </Form>

        <ListFadeOut />
      </div>
    </>
  )
}

export default DashboardGroup
