import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'

import type { EditPartnershipById, UpdatePartnershipInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPartnership = NonNullable<EditPartnershipById['partnership']>

interface PartnershipFormProps {
  partnership?: EditPartnershipById['partnership']
  onSave: (data: UpdatePartnershipInput, id?: FormPartnership['id']) => void
  error: RWGqlError
  loading: boolean
}

const PartnershipForm = (props: PartnershipFormProps) => {
  const onSubmit = (data: FormPartnership) => {
    props.onSave(data, props?.partnership?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPartnership> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.partnership?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="notes"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Notes
        </Label>

        <TextField
          name="notes"
          defaultValue={props.partnership?.notes}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="notes" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-0"
            name="status"
            defaultValue="QUEUED"
            defaultChecked={props.partnership?.status?.includes('QUEUED')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Queued</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-1"
            name="status"
            defaultValue="CONTACTING"
            defaultChecked={props.partnership?.status?.includes('CONTACTING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Contacting</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-2"
            name="status"
            defaultValue="SELLING"
            defaultChecked={props.partnership?.status?.includes('SELLING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Selling</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-3"
            name="status"
            defaultValue="NEGOTIATING"
            defaultChecked={props.partnership?.status?.includes('NEGOTIATING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Negotiating</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-4"
            name="status"
            defaultValue="SIGNING"
            defaultChecked={props.partnership?.status?.includes('SIGNING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Signing</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-5"
            name="status"
            defaultValue="SUCCESSFUL"
            defaultChecked={props.partnership?.status?.includes('SUCCESSFUL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Successful</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnership-status-6"
            name="status"
            defaultValue="UNSUCCESSFUL"
            defaultChecked={props.partnership?.status?.includes('UNSUCCESSFUL')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Unsuccessful</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.partnership?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="affiliateId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Affiliate id
        </Label>

        <TextField
          name="affiliateId"
          defaultValue={props.partnership?.affiliateId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="affiliateId" className="rw-field-error" />

        <Label
          name="affiliateIdParam"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Affiliate id param
        </Label>

        <TextField
          name="affiliateIdParam"
          defaultValue={props.partnership?.affiliateIdParam}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="affiliateIdParam" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PartnershipForm
