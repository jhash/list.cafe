import { Save } from 'lucide-react'

import { SignupAttributes } from '@redwoodjs/auth-dbauth-web'
import { Form } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import EditListItems from '../EditListItems/EditListItems'
import FormItem from '../FormItem/FormItem'
import { ListCellChild, ListCellChildProps } from '../ListCell'
import ListSettings from '../ListSettings/ListSettings'
import Modal from '../Modal/Modal'

type CreateUserForm = NonNullable<SignupAttributes>

const NewList: ListCellChild = ({
  pendingList,
  resetPendingList,
  signUpAndCreateList,
  loading,
  ...listProps
}) => {
  const props: ListCellChildProps = {
    ...listProps,
    loading,
    pendingList,
    resetPendingList,
    signUpAndCreateList,
  }

  return (
    <>
      <MetaTags title={'Create a new list'} description={'Create a new list'} />
      {!!pendingList && (
        <Modal title="Welcome!" onClose={resetPendingList} open={!!pendingList}>
          <Form<CreateUserForm>
            className="flex w-full max-w-full flex-grow flex-col gap-3"
            name="userForm"
            onSubmit={signUpAndCreateList}
          >
            <p className="text-lg font-medium text-info">
              {'Sign up now to save your new list'}
            </p>
            <p className="text-sm font-medium">{`Don't worry, list.cafe is free, forever.`}</p>
            <FormItem
              name="username"
              type="email"
              label="Email"
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />
            <FormItem name="name" type="text" label="Name" />
            <FormItem
              name="password"
              type="password"
              label="Password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
            />
            <button
              className="btn btn-secondary mt-4 flex min-h-0 w-full flex-grow items-center justify-center self-start rounded p-0 px-4"
              type="submit"
              disabled={loading}
            >
              <Save />
              Save
            </button>
          </Form>
        </Modal>
      )}
      <div className="flex w-full max-w-full flex-col gap-12">
        <ListSettings {...props} />
        <EditListItems {...props} />
      </div>
    </>
  )
}

export default NewList
