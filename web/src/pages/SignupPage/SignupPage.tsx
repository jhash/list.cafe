import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
      name: data.name,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Sign up" />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-12">
          <h1 className="text-6xl font-bold">Sign up</h1>
          <div className="flex flex-col gap-6">
            <Form onSubmit={onSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Label
                  name="name"
                  className="label font-medium"
                  errorClassName="label font-medium label-error"
                >
                  <span className="label-text text-lg">Name</span>
                </Label>
                <TextField
                  name="name"
                  className="input input-bordered rounded-lg"
                  errorClassName="input input-bordered rounded-lg input-error"
                  validation={{
                    required: {
                      value: true,
                      message: 'Name is required',
                    },
                  }}
                />
                <FieldError name="email" className="text-error" />
              </div>

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

              <div className="flex flex-col gap-1">
                <Label
                  name="password"
                  className="label font-medium"
                  errorClassName="label font-medium label-error"
                >
                  <span className="label-text text-lg">Password</span>
                </Label>
                <PasswordField
                  name="password"
                  className="input input-bordered rounded-lg"
                  errorClassName="input input-bordered rounded-lg input-error"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="text-error" />
              </div>

              <Submit className="btn btn-secondary rounded-lg">Sign Up</Submit>
            </Form>
            <div className="flex gap-1.5">
              <span>Already have an account?</span>{' '}
              <Link to={routes.login()} className="link-info link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage
