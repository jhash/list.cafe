import type {
  EditGroupMembershipById,
  UpdateGroupMembershipInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormGroupMembership = NonNullable<
  EditGroupMembershipById['groupMembership']
>

interface GroupMembershipFormProps {
  groupMembership?: EditGroupMembershipById['groupMembership']
  onSave: (
    data: UpdateGroupMembershipInput,
    id?: FormGroupMembership['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const GroupMembershipForm = (props: GroupMembershipFormProps) => {
  const onSubmit = (data: FormGroupMembership) => {
    props.onSave(data, props?.groupMembership?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormGroupMembership> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.groupMembership?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="groupRole"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Group role
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="groupMembership-groupRole-0"
            name="groupRole"
            defaultValue="VIEW"
            defaultChecked={props.groupMembership?.groupRole?.includes('VIEW')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>View</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="groupMembership-groupRole-1"
            name="groupRole"
            defaultValue="EDIT"
            defaultChecked={props.groupMembership?.groupRole?.includes('EDIT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Edit</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="groupMembership-groupRole-2"
            name="groupRole"
            defaultValue="ADMIN"
            defaultChecked={props.groupMembership?.groupRole?.includes('ADMIN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Admin</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="groupMembership-groupRole-3"
            name="groupRole"
            defaultValue="OWNER"
            defaultChecked={props.groupMembership?.groupRole?.includes('OWNER')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Owner</div>
        </div>

        <FieldError name="groupRole" className="rw-field-error" />

        <Label
          name="groupId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Group id
        </Label>

        <NumberField
          name="groupId"
          defaultValue={props.groupMembership?.groupId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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

export default GroupMembershipForm
