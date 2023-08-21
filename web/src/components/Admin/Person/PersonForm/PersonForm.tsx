import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPersonById, UpdatePersonInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPerson = NonNullable<EditPersonById['person']>

interface PersonFormProps {
  person?: EditPersonById['person']
  onSave: (data: UpdatePersonInput, id?: FormPerson['id']) => void
  error: RWGqlError
  loading: boolean
}

const PersonForm = (props: PersonFormProps) => {
  const onSubmit = (data: FormPerson) => {
    props.onSave(data, props?.person?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPerson> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.person?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.person?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="defaultAddressId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Default address id
        </Label>

        <NumberField
          name="defaultAddressId"
          defaultValue={props.person?.defaultAddressId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="defaultAddressId" className="rw-field-error" />

        <Label
          name="createdByUserId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created by user id
        </Label>

        <NumberField
          name="createdByUserId"
          defaultValue={props.person?.createdByUserId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="createdByUserId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PersonForm
