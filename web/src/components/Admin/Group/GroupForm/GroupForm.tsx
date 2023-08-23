import type { EditGroupById, UpdateGroupInput } from 'types/graphql'

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

type FormGroup = NonNullable<EditGroupById['group']>

interface GroupFormProps {
  group?: EditGroupById['group']
  onSave: (data: UpdateGroupInput, id?: FormGroup['id']) => void
  error: RWGqlError
  loading: boolean
}

const GroupForm = (props: GroupFormProps) => {
  const onSubmit = (data: FormGroup) => {
    props.onSave(data, props?.group?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormGroup> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.group?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-type-0"
            name="type"
            defaultValue="GENERIC"
            defaultChecked={props.group?.type?.includes('GENERIC')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Generic</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-type-1"
            name="type"
            defaultValue="FRIENDS"
            defaultChecked={props.group?.type?.includes('FRIENDS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Friends</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-type-2"
            name="type"
            defaultValue="FAMILY"
            defaultChecked={props.group?.type?.includes('FAMILY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Family</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-type-3"
            name="type"
            defaultValue="COMPANY"
            defaultChecked={props.group?.type?.includes('COMPANY')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Company</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-type-4"
            name="type"
            defaultValue="NON_PROFIT"
            defaultChecked={props.group?.type?.includes('NON_PROFIT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Non Profit</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="visibility"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Visibility
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-visibility-0"
            name="visibility"
            defaultValue="PRIVATE"
            defaultChecked={props.group?.visibility?.includes('PRIVATE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Private</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-visibility-1"
            name="visibility"
            defaultValue="INVITE"
            defaultChecked={props.group?.visibility?.includes('INVITE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Invite</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-visibility-2"
            name="visibility"
            defaultValue="LINK"
            defaultChecked={props.group?.visibility?.includes('LINK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Link</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="group-visibility-3"
            name="visibility"
            defaultValue="PUBLIC"
            defaultChecked={props.group?.visibility?.includes('PUBLIC')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Public</div>
        </div>

        <FieldError name="visibility" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GroupForm
