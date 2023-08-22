import type { EditListItemById, UpdateListItemInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormListItem = NonNullable<EditListItemById['listItem']>

interface ListItemFormProps {
  listItem?: EditListItemById['listItem']
  onSave: (data: UpdateListItemInput, id?: FormListItem['id']) => void
  error: RWGqlError
  loading: boolean
}

const ListItemForm = (props: ListItemFormProps) => {
  const onSubmit = (data: FormListItem) => {
    props.onSave(data, props?.listItem?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormListItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.listItem?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.listItem?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.listItem?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="listId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List id
        </Label>

        <NumberField
          name="listId"
          defaultValue={props.listItem?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="listId" className="rw-field-error" />

        <Label
          name="quantity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quantity
        </Label>

        <NumberField
          name="quantity"
          defaultValue={props.listItem?.quantity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="quantity" className="rw-field-error" />

        <Label
          name="voting"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Voting
        </Label>

        <CheckboxField
          name="voting"
          defaultChecked={props.listItem?.voting}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="voting" className="rw-field-error" />

        <Label
          name="parentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Parent id
        </Label>

        <NumberField
          name="parentId"
          defaultValue={props.listItem?.parentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="parentId" className="rw-field-error" />

        <Label
          name="order"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order
        </Label>

        <NumberField
          name="order"
          defaultValue={props.listItem?.order}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="order" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price
        </Label>

        <TextField
          name="price"
          defaultValue={props.listItem?.price}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ListItemForm
