import { useRef, useState } from 'react'

import { Save } from 'lucide-react'
import { CreateListInput } from 'types/graphql'

import { SignupAttributes } from '@redwoodjs/auth-dbauth-web'
import { Form } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

import EditListItems from '../EditListItems/EditListItems'
import FormItem from '../FormItem/FormItem'
import { ListCellChild, ListCellChildProps } from '../ListCell'
import ListSettings from '../ListSettings/ListSettings'
import Modal from '../Modal/Modal'

type CreateUserForm = NonNullable<SignupAttributes>

const NewList: ListCellChild = ({
  list,
  items,
  loading: listLoading,
  onSave: onSaveList,
  ...listProps
}) => {
  const { signUp, isAuthenticated } = useAuth()

  const emailRef = useRef<HTMLInputElement>()

  const [pendingList, setPendingList] = useState<CreateListInput | undefined>()
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const resetPendingList = () => {
    setPendingList(undefined)
  }
  const updateListPending = (input: CreateListInput) => {
    setPendingList(input)
  }

  const signUpAndCreateList = async (input: SignupAttributes) => {
    try {
      setSigningUp(true)
      await signUp(input)
      setSigningUp(false)
      toast.success('Successfully signed up!')
      onSave(pendingList)
      resetPendingList()
    } catch (error) {
      toast.error(error.messages)
    }
  }

  const loading = listLoading || signingUp

  const onSave = (input: CreateListInput, event?: React.BaseSyntheticEvent) => {
    event?.stopPropagation?.()
    event?.preventDefault?.()

    if (!isAuthenticated && !pendingList) {
      updateListPending(input as CreateListInput)
      return
    }

    onSaveList(input)
  }

  const props: ListCellChildProps = {
    ...listProps,
    list,
    items,
    onSave,
    loading,
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
              ref={emailRef}
            />
            <FormItem name="name" type="text" label="Name" />
            <FormItem
              name="password"
              type="password"
              label="Password"
              validation={{
                required: {
                  value: true,
                  message: 'Name is required',
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
      <ListSettings {...props} />
      <EditListItems {...props} />
    </>
  )
}

export default NewList
