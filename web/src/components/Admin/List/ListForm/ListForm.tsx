import type { EditListById, UpdateListInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormList = NonNullable<EditListById['list']>

interface ListFormProps {
  list?: EditListById['list']
  onSave: (data: UpdateListInput, id?: FormList['id']) => void
  error: RWGqlError
  loading: boolean
}

const ListForm = (props: ListFormProps) => {
  const onSubmit = (data: FormList) => {
    props.onSave(data, props?.list?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormList> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.list?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.list?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-0"
            name="type"
            defaultValue="WISHLIST"
            defaultChecked={props.list?.type?.includes('WISHLIST')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Wishlist</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-1"
            name="type"
            defaultValue="WEDDING"
            defaultChecked={props.list?.type?.includes('WEDDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Wedding</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-2"
            name="type"
            defaultValue="BABY_SHOWER"
            defaultChecked={props.list?.type?.includes('BABY_SHOWER')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Baby Shower</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-3"
            name="type"
            defaultValue="TOP"
            defaultChecked={props.list?.type?.includes('TOP')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Top</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-4"
            name="type"
            defaultValue="BOOKMARKS"
            defaultChecked={props.list?.type?.includes('BOOKMARKS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Bookmarks</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-5"
            name="type"
            defaultValue="SOCIAL"
            defaultChecked={props.list?.type?.includes('SOCIAL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Social</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-6"
            name="type"
            defaultValue="FAVORITES"
            defaultChecked={props.list?.type?.includes('FAVORITES')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Favorites</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-7"
            name="type"
            defaultValue="AWESOME"
            defaultChecked={props.list?.type?.includes('AWESOME')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Awesome</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-8"
            name="type"
            defaultValue="INVENTORY"
            defaultChecked={props.list?.type?.includes('INVENTORY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Inventory</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-9"
            name="type"
            defaultValue="TODO"
            defaultChecked={props.list?.type?.includes('TODO')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Todo</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-10"
            name="type"
            defaultValue="FORUM"
            defaultChecked={props.list?.type?.includes('FORUM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Forum</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-11"
            name="type"
            defaultValue="TABLE"
            defaultChecked={props.list?.type?.includes('TABLE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Table</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-12"
            name="type"
            defaultValue="LINKTREE"
            defaultChecked={props.list?.type?.includes('LINKTREE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Linktree</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="list-type-13"
            name="type"
            defaultValue="JOBS"
            defaultChecked={props.list?.type?.includes('JOBS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Jobs</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ListForm
