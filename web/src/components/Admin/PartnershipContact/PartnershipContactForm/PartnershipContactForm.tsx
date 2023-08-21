import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditPartnershipContactById,
  UpdatePartnershipContactInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPartnershipContact = NonNullable<
  EditPartnershipContactById['partnershipContact']
>

interface PartnershipContactFormProps {
  partnershipContact?: EditPartnershipContactById['partnershipContact']
  onSave: (
    data: UpdatePartnershipContactInput,
    id?: FormPartnershipContact['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const PartnershipContactForm = (props: PartnershipContactFormProps) => {
  const onSubmit = (data: FormPartnershipContact) => {
    props.onSave(data, props?.partnershipContact?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPartnershipContact> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.partnershipContact?.personId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="personId" className="rw-field-error" />

        <Label
          name="partnershipId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Partnership id
        </Label>

        <NumberField
          name="partnershipId"
          defaultValue={props.partnershipContact?.partnershipId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="partnershipId" className="rw-field-error" />

        <Label
          name="addedByUserId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Added by user id
        </Label>

        <NumberField
          name="addedByUserId"
          defaultValue={props.partnershipContact?.addedByUserId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="addedByUserId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PartnershipContactForm
