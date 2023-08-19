import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { email: string }) => {
    const response = await forgotPassword(data.email)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-12">
          <h1 className="text-6xl font-bold leading-tight">Forgot password</h1>
          <Form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Label
                name="email"
                className="label font-medium"
                errorClassName="label font-medium label-error"
              >
                <span className="label-text text-lg">Email</span>
              </Label>
              <TextField
                name="email"
                className="input input-bordered rounded-lg"
                errorClassName="input input-bordered rounded-lg input-error"
                ref={emailRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                }}
              />

              <FieldError name="email" className="text-error" />
            </div>

            <Submit className="btn btn-secondary">Submit</Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
