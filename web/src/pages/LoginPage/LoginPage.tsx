import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  // { type }
  const WELCOME_MESSAGE = 'Welcome back!'
  const REDIRECT = routes.dashboard()

  const {
    isAuthenticated,
    // client: webAuthn,
    loading,
    logIn,
    // reauthenticate,
  } = useAuth()
  // const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  // const [showWebAuthn, setShowWebAuthn] = useState(
  //   webAuthn.isEnabled() && type !== 'password'
  // )

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated) {
      // && !shouldShowWebAuthn) {
      // || webAuthn.isEnabled())) {
      setImmediate(() => navigate(REDIRECT))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]) // , shouldShowWebAuthn])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  // useEffect(() => {
  //   if (!loading && !isAuthenticated) {
  // && showWebAuthn) {
  //   onAuthenticate()
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading, isAuthenticated])

  // focus on the email field as soon as the page loads
  const emailRef = useRef()
  useEffect(() => {
    emailRef.current && (emailRef.current as HTMLInputElement).focus()
  }, [])

  const onSubmit = async (data) => {
    // const webAuthnSupported = await webAuthn.isSupported()

    // if (webAuthnSupported) {
    //   setShouldShowWebAuthn(true)
    // }
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      // user logged in
      // if (webAuthnSupported) {
      //   setShowWebAuthn(true)
      // } else {
      toast.success(WELCOME_MESSAGE)
      // }
    }
  }

  // const onAuthenticate = async () => {
  //   try {
  //     // await webAuthn.authenticate()
  //     await reauthenticate()
  //     toast.success(WELCOME_MESSAGE)
  //     setImmediate(() => navigate(REDIRECT))
  //   } catch (e) {
  //     if (e.name === 'WebAuthnDeviceNotFoundError') {
  //       toast.error('Device not found, log in with Email/Password to continue')
  //       // setShowWebAuthn(false)
  //     } else {
  //       toast.error(e.message)
  //     }
  //   }
  // }

  // const onRegister = async () => {
  //   try {
  //     // await webAuthn.register()
  //     toast.success(WELCOME_MESSAGE)
  //     setImmediate(() => navigate(REDIRECT))
  //   } catch (e) {
  //     toast.error(e.message)
  //   }
  // }

  // const onSkip = () => {
  //   toast.success(WELCOME_MESSAGE)
  //   setShouldShowWebAuthn(false)
  // }

  // const AuthWebAuthnPrompt = () => {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <h2 className="text-2xl">WebAuthn Login Enabled</h2>
  //       <p>Log in with your fingerprint, face or PIN</p>
  //       <div className="flex py-3">
  //         <button className="btn btn-info rounded-lg" onClick={onAuthenticate}>
  //           Open Authenticator
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  // const RegisterWebAuthnPrompt = () => (
  //   <div className="flex flex-col gap-4">
  //     <h2 className="text-2xl">No more Passwords!</h2>
  //     <p>
  //       Depending on your device you can log in with your fingerprint, face or
  //       PIN next time.
  //     </p>
  //     <div className="flex gap-3 py-3">
  //       <button className="btn btn-info rounded-lg" onClick={onRegister}>
  //         Turn On
  //       </button>
  //       <button className="btn rounded-lg" onClick={onSkip}>
  //         Skip for now
  //       </button>
  //     </div>
  //   </div>
  // )

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label
            name="email"
            className="label font-medium"
            errorClassName="label label-error font-medium"
          >
            <span className="label-text text-lg">Email</span>
          </Label>
          <TextField
            name="email"
            className="input input-bordered rounded-md focus:outline-info"
            errorClassName="input input-error rounded-md"
            ref={emailRef}
            validation={{
              required: {
                value: true,
                message: 'Email is required',
              },
            }}
          />
        </div>

        <FieldError name="email" className="text-error" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label
            name="password"
            className="label font-medium"
            errorClassName="label label-error font-medium"
          >
            <span className="label-text text-lg">Password</span>
          </Label>
          <PasswordField
            name="password"
            className="input input-bordered rounded-md focus:outline-info"
            errorClassName="input input-error rounded-md"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
        </div>

        <FieldError name="password" className="text-error" />

        <Link to={routes.forgotPassword()} className="link-info link">
          Forgot password?
        </Link>
      </div>

      <Submit className="btn btn-secondary rounded-md">Login</Submit>
    </Form>
  )

  const formToRender = () => {
    // if (showWebAuthn) {
    //   if (webAuthn.isEnabled()) {
    //     return <AuthWebAuthnPrompt />
    //   } else {
    //     return <RegisterWebAuthnPrompt />
    //   }
    // } else {
    return <PasswordForm />
    // }
  }

  const linkToRender = () => {
    // if (showWebAuthn) {
    //   if (webAuthn.isEnabled()) {
    //     return (
    //       <div>
    //         <span>or login with </span>{' '}
    //         <a href="?type=password" className="link-info link">
    //           email and password
    //         </a>
    //       </div>
    //     )
    //   }
    // } else {
    return (
      <div className="flex gap-1.5">
        <span>Don&apos;t have an account?</span>{' '}
        <Link to={routes.signup()} className="link-info link">
          Sign up
        </Link>
      </div>
    )
    // }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <MetaTags title="Log in" />

      <div className="flex flex-grow flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-12">
          <h1 className="text-6xl font-bold">Log in</h1>
          <div className="flex flex-col gap-6">
            {formToRender()}
            {linkToRender()}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
