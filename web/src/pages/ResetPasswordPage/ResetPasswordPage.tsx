import { useEffect, useRef, useState } from 'react'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        // navigate(routes.home())
        setImmediate(() => toast.error(response.error))
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset password" />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-12">
          <h1 className="text-6xl font-bold leading-tight">Reset password</h1>
          <Form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Label
                name="password"
                className="label"
                errorClassName="label label-error"
              >
                <span className="label-text text-lg">New password</span>
              </Label>
              <PasswordField
                name="password"
                autoComplete="new-password"
                className="input input-bordered rounded-lg"
                errorClassName="input input-bordered rounded-lg input-error"
                disabled={!enabled}
                ref={passwordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'New password is required',
                  },
                }}
              />

              <FieldError name="password" className="text-error" />
            </div>

            <Submit className="btn btn-secondary" disabled={!enabled}>
              Submit
            </Submit>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPage
