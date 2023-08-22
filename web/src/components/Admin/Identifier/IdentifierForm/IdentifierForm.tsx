import type { EditIdentifierById, UpdateIdentifierInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormIdentifier = NonNullable<EditIdentifierById['identifier']>

interface IdentifierFormProps {
  identifier?: EditIdentifierById['identifier']
  onSave: (data: UpdateIdentifierInput, id?: FormIdentifier['id']) => void
  error: RWGqlError
  loading: boolean
}

const IdentifierForm = (props: IdentifierFormProps) => {
  const onSubmit = (data: FormIdentifier) => {
    props.onSave(data, props?.identifier?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormIdentifier> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="personId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Person id
        </Label>

        <NumberField
          name="personId"
          defaultValue={props.identifier?.personId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="personId" className="rw-field-error" />

        <Label
          name="listId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List id
        </Label>

        <NumberField
          name="listId"
          defaultValue={props.identifier?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="listId" className="rw-field-error" />

        <Label
          name="groupId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Group id
        </Label>

        <NumberField
          name="groupId"
          defaultValue={props.identifier?.groupId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="groupId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default IdentifierForm
