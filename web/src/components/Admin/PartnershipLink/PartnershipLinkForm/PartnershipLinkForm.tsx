import type {
  EditPartnershipLinkById,
  UpdatePartnershipLinkInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormPartnershipLink = NonNullable<
  EditPartnershipLinkById['partnershipLink']
>

interface PartnershipLinkFormProps {
  partnershipLink?: EditPartnershipLinkById['partnershipLink']
  onSave: (
    data: UpdatePartnershipLinkInput,
    id?: FormPartnershipLink['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const PartnershipLinkForm = (props: PartnershipLinkFormProps) => {
  const onSubmit = (data: FormPartnershipLink) => {
    props.onSave(data, props?.partnershipLink?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormPartnershipLink> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnershipLink-status-0"
            name="status"
            defaultValue="PENDING"
            defaultChecked={props.partnershipLink?.status?.includes('PENDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Pending</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnershipLink-status-1"
            name="status"
            defaultValue="DIGESTING"
            defaultChecked={props.partnershipLink?.status?.includes(
              'DIGESTING'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Digesting</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnershipLink-status-2"
            name="status"
            defaultValue="SUCCESSFUL"
            defaultChecked={props.partnershipLink?.status?.includes(
              'SUCCESSFUL'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Successful</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="partnershipLink-status-3"
            name="status"
            defaultValue="UNSUCCESSFUL"
            defaultChecked={props.partnershipLink?.status?.includes(
              'UNSUCCESSFUL'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Unsuccessful</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="originalUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Original url
        </Label>

        <TextField
          name="originalUrl"
          defaultValue={props.partnershipLink?.originalUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="originalUrl" className="rw-field-error" />

        <Label
          name="partnershipId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Partnership id
        </Label>

        <NumberField
          name="partnershipId"
          defaultValue={props.partnershipLink?.partnershipId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="partnershipId" className="rw-field-error" />

        <Label
          name="listItemId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List item id
        </Label>

        <NumberField
          name="listItemId"
          defaultValue={props.partnershipLink?.listItemId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="listItemId" className="rw-field-error" />

        <Label
          name="createdByUserId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created by user id
        </Label>

        <NumberField
          name="createdByUserId"
          defaultValue={props.partnershipLink?.createdByUserId}
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

export default PartnershipLinkForm
