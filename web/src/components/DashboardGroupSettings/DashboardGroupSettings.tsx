import { ComponentType } from 'react'

import kebabCase from 'lodash/kebabCase'
import { FindGroupQuery, GroupType } from 'types/graphql'

import { Controller } from '@redwoodjs/forms'
import { Redirect, routes } from '@redwoodjs/router'

import CopyListCafeLink from '../CopyListCafeLink/CopyListCafeLink'
import FormItem from '../FormItem/FormItem'

export const GROUP_VISIBILITY_OPTIONS = [
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

interface GroupTypeOption {
  value: string
  name: string
  description?: string
  disabled?: boolean
  badgeColor?: string
}
export const GROUP_TYPE_OPTIONS: GroupTypeOption[] = [
  { value: 'GENERIC', name: 'General' },
  { value: 'FRIENDS', name: 'Friends' },
  { value: 'FAMILY', name: 'Family' },
  { value: 'COMPANY', name: 'Company' },
  { value: 'NON_PROFIT', name: 'Non-Profit' },
]

export const matchGroupTypeOption = (value?: GroupType) =>
  value
    ? GROUP_TYPE_OPTIONS.find((option) => option.value === value)
    : undefined

export interface DashboardGroupChildProps {
  loading: boolean
  editing: boolean
  canEdit: boolean
  canAddMembers: boolean
  group: Partial<FindGroupQuery['group']>
}
export type DashboardGroupChild = ComponentType<DashboardGroupChildProps>
const DashboardGroupSettings = ({
  loading,
  editing,
  group,
  canEdit,
}: DashboardGroupChildProps) => {
  const { id, name, identifier, type, visibility, description } = group

  if (!!id && !canEdit) {
    return <Redirect to={routes.group({ id })} options={{ replace: true }} />
  }

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-3">
      <FormItem
        disabled={loading}
        name="name"
        defaultValue={name}
        editing={editing}
        label={'Name'}
        validation={{
          required: {
            value: true,
            message: 'Name is required',
          },
        }}
      />
      <FormItem
        disabled={loading}
        name="identifier.id"
        defaultValue={identifier?.id}
        editing={editing}
        label={'ID'}
      >
        <Controller
          name="identifier.id"
          render={({ field: { value } }) => (
            <div className="flex items-center p-1 text-sm text-gray-500">
              <CopyListCafeLink
                path={
                  (editing ? kebabCase(value) : undefined) ||
                  identifier?.id ||
                  'your-group-name'
                }
              />
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
        label={'Visibility'}
        options={GROUP_VISIBILITY_OPTIONS}
      />
      <FormItem
        type="select"
        name="type"
        defaultValue={type}
        editing={editing}
        label={'Type'}
        disabled={loading}
        options={GROUP_TYPE_OPTIONS}
      />
      <FormItem
        type="textarea"
        name="description"
        defaultValue={description}
        editing={editing}
        label={'Description'}
        disabled={loading}
        options={GROUP_TYPE_OPTIONS}
      />
    </div>
  )
}

export default DashboardGroupSettings
