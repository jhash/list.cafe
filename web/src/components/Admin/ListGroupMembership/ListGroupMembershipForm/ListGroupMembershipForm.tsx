import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditListGroupMembershipById,
  UpdateListGroupMembershipInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormListGroupMembership = NonNullable<
  EditListGroupMembershipById['listGroupMembership']
>

interface ListGroupMembershipFormProps {
  listGroupMembership?: EditListGroupMembershipById['listGroupMembership']
  onSave: (
    data: UpdateListGroupMembershipInput,
    id?: FormListGroupMembership['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const ListGroupMembershipForm = (props: ListGroupMembershipFormProps) => {
  const onSubmit = (data: FormListGroupMembership) => {
    props.onSave(data, props?.listGroupMembership?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormListGroupMembership> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="listRole"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List role
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="listGroupMembership-listRole-0"
            name="listRole"
            defaultValue="VIEW"
            defaultChecked={props.listGroupMembership?.listRole?.includes(
              'VIEW'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>View</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listGroupMembership-listRole-1"
            name="listRole"
            defaultValue="CONTRIBUTE"
            defaultChecked={props.listGroupMembership?.listRole?.includes(
              'CONTRIBUTE'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Contribute</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listGroupMembership-listRole-2"
            name="listRole"
            defaultValue="EDIT"
            defaultChecked={props.listGroupMembership?.listRole?.includes(
              'EDIT'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Edit</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listGroupMembership-listRole-3"
            name="listRole"
            defaultValue="ADMIN"
            defaultChecked={props.listGroupMembership?.listRole?.includes(
              'ADMIN'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Admin</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listGroupMembership-listRole-4"
            name="listRole"
            defaultValue="OWNER"
            defaultChecked={props.listGroupMembership?.listRole?.includes(
              'OWNER'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Owner</div>
        </div>

        <FieldError name="listRole" className="rw-field-error" />

        <Label
          name="listId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          List id
        </Label>

        <NumberField
          name="listId"
          defaultValue={props.listGroupMembership?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
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
          defaultValue={props.listGroupMembership?.groupId}
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

export default ListGroupMembershipForm
