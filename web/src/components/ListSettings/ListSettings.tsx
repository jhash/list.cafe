import kebabCase from 'lodash/kebabCase'

import { Controller, useFormContext } from '@redwoodjs/forms'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { LIST_TYPE_OPTIONS, LIST_VISIBILITY_OPTIONS } from 'src/lib/lists'

import CopyListCafeLink from '../CopyListCafeLink/CopyListCafeLink'
import FormItem from '../FormItem/FormItem'
import { ListCellChild } from '../ListCell'

const ListSettings: ListCellChild = ({
  list: { id, name, identifier },
  onSave,
  loading,
  canEdit,
}) => {
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit(onSave)

  if (!!id && !canEdit) {
    return <Redirect to={routes.list({ id })} options={{ replace: true }} />
  }

  return (
    <>
      {!!id && (
        <MetaTags
          title={`${name} - Settings`}
          description={`Settings for the ${name} list`}
        />
      )}
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <FormItem
            // TODO: this shouldn't be necessary
            onSubmit={onSubmit}
            disabled={loading}
            name="name"
            label={'Name'}
            validation={{
              required: {
                value: true,
                message: 'Name is required',
              },
            }}
          />
          <FormItem
            onSubmit={onSubmit}
            disabled={loading}
            name="identifier.id"
            label={'ID'}
          >
            <Controller
              name="identifier.id"
              render={({ field: { value } }) => (
                <div className="flex items-center p-1 text-sm text-gray-500">
                  <CopyListCafeLink
                    path={
                      kebabCase(value) || identifier?.id || 'your-list-name'
                    }
                  />
                </div>
              )}
            />
          </FormItem>
          <FormItem
            onSubmit={onSubmit}
            type="textarea"
            disabled={loading}
            name="description"
            label={'Description'}
          />
          <FormItem
            onSubmit={onSubmit}
            disabled={loading}
            type="select"
            name="visibility"
            label={'Visibility'}
            options={LIST_VISIBILITY_OPTIONS}
          />
          <FormItem
            onSubmit={onSubmit}
            disabled={loading}
            type="select"
            name="type"
            label={'Type'}
            options={LIST_TYPE_OPTIONS}
          />
        </div>
      </form>
    </>
  )
}

export default ListSettings
