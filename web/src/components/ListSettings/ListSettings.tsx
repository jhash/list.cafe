import kebabCase from 'lodash/kebabCase'

import { Controller, useFormContext } from '@redwoodjs/forms'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { LIST_CAFE_DOMAIN } from 'src/constants/urls'
import { LIST_TYPE_OPTIONS, LIST_VISIBILITY_OPTIONS } from 'src/lib/lists'

import FormItem from '../FormItem/FormItem'
import { ListCellChild } from '../ListCell'
import SectionTitle from '../SectionTitle/SectionTitle'

const ListSettings: ListCellChild = ({
  list: { id, name, identifier },
  onSave,
  loading,
  canEdit,
}) => {
  const { handleSubmit } = useFormContext()

  const onSubmit = handleSubmit(onSave)

  if (!!id && !canEdit) {
    return <Redirect to={routes.list({ id })} />
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
            label={<SectionTitle>Name</SectionTitle>}
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
            label={<SectionTitle>ID</SectionTitle>}
            validation={{
              required: {
                value: true,
                message: 'An ID is required',
              },
            }}
          >
            <Controller
              name="identifier.id"
              render={({ field: { value } }) => (
                <div className="flex items-center p-1 text-sm text-gray-500">
                  {`Ex. ${LIST_CAFE_DOMAIN}/${
                    kebabCase(value) || identifier?.id || 'your-list-name'
                  }`}
                </div>
              )}
            />
          </FormItem>
          <FormItem
            onSubmit={onSubmit}
            type="textarea"
            disabled={loading}
            name="description"
            label={<SectionTitle>Description</SectionTitle>}
          />
          <FormItem
            onSubmit={onSubmit}
            disabled={loading}
            type="select"
            name="visibility"
            label={<SectionTitle>Visibility</SectionTitle>}
            options={LIST_VISIBILITY_OPTIONS}
          />
          <FormItem
            onSubmit={onSubmit}
            disabled={loading}
            type="select"
            name="type"
            label={<SectionTitle>Type</SectionTitle>}
            options={LIST_TYPE_OPTIONS}
          />
        </div>
      </form>
    </>
  )
}

export default ListSettings
