import type {
  EditListMembershipById,
  UpdateListMembershipInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormListMembership = NonNullable<EditListMembershipById['listMembership']>

interface ListMembershipFormProps {
  listMembership?: EditListMembershipById['listMembership']
  onSave: (
    data: UpdateListMembershipInput,
    id?: FormListMembership['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const ListMembershipForm = (props: ListMembershipFormProps) => {
  const onSubmit = (data: FormListMembership) => {
    props.onSave(data, props?.listMembership?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormListMembership> onSubmit={onSubmit} error={props.error}>
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
            id="listMembership-listRole-0"
            name="listRole"
            defaultValue="VIEW"
            defaultChecked={props.listMembership?.listRole?.includes('VIEW')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>View</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listMembership-listRole-1"
            name="listRole"
            defaultValue="CONTRIBUTE"
            defaultChecked={props.listMembership?.listRole?.includes(
              'CONTRIBUTE'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Contribute</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listMembership-listRole-2"
            name="listRole"
            defaultValue="EDIT"
            defaultChecked={props.listMembership?.listRole?.includes('EDIT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Edit</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listMembership-listRole-3"
            name="listRole"
            defaultValue="ADMIN"
            defaultChecked={props.listMembership?.listRole?.includes('ADMIN')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Admin</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="listMembership-listRole-4"
            name="listRole"
            defaultValue="OWNER"
            defaultChecked={props.listMembership?.listRole?.includes('OWNER')}
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
          defaultValue={props.listMembership?.listId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="listId" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.listMembership?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ListMembershipForm
