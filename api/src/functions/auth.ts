import type { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { isStrongPassword } from 'validator'

import {
  DbAuthHandler,
  DbAuthHandlerOptions,
  PasswordValidationError,
} from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import { LIST_CAFE_URL } from 'src/lib/url'
import { createUser } from 'src/services/users/users'

const authHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  const forgotPasswordOptions: DbAuthHandlerOptions['forgotPassword'] = {
    // handler() is invoked after verifying that a user was found with the given
    // username. This is where you can send the user an email with a link to
    // reset their password. With the default dbAuth routes and field names, the
    // URL to reset the password will be:
    //
    // https://example.com/reset-password?resetToken=${user.resetToken}
    //
    // Whatever is returned from this function will be returned from
    // the `forgotPassword()` function that is destructured from `useAuth()`
    // You could use this return value to, for example, show the email
    // address in a toast message so the user will know it worked and where
    // to look for the email.
    handler: (user) => {
      // TODO: send email
      return user
    },

    // How long the resetToken is valid for, in seconds (default is 24 hours)
    expires: 60 * 60 * 24,

    errors: {
      // for security reasons you may want to be vague here rather than expose
      // the fact that the email address wasn't found (prevents fishing for
      // valid email addresses)
      // TODO: change to success for any valid email
      usernameNotFound: `We failed to send a forgot password link`,
      // if the user somehow gets around client validation
      usernameRequired: 'Username is required',
    },
  }

  const loginOptions: DbAuthHandlerOptions['login'] = {
    // handler() is called after finding the user that matches the
    // username/password provided at login, but before actually considering them
    // logged in. The `user` argument will be the user in the database that
    // matched the username/password.
    //
    // If you want to allow this user to log in simply return the user.
    //
    // If you want to prevent someone logging in for another reason (maybe they
    // didn't validate their email yet), throw an error and it will be returned
    // by the `logIn()` function from `useAuth()` in the form of:
    // `{ message: 'Error message' }`
    handler: (user) => {
      return user
    },

    errors: {
      usernameOrPasswordMissing: 'Both username and password are required',
      usernameNotFound: "Email or password wasn't quite right",
      // For security reasons you may want to make this the same as the
      // usernameNotFound error so that a malicious user can't use the error
      // to narrow down if it's the username or password that's incorrect
      incorrectPassword: "Email or password wasn't quite right",
    },

    // How long a user will remain logged in, in seconds
    expires: 60 * 60 * 24 * 365 * 10,
  }

  const resetPasswordOptions: DbAuthHandlerOptions['resetPassword'] = {
    // handler() is invoked after the password has been successfully updated in
    // the database. Returning anything truthy will automatically logs the user
    // in. Return `false` otherwise, and in the Reset Password page redirect the
    // user to the login page.
    handler: (_user) => {
      return true
    },

    // If `false` then the new password MUST be different than the current one
    allowReusedPassword: true,

    errors: {
      // the resetToken is valid, but expired
      resetTokenExpired: 'This reset token has expired',
      // no user was found with the given resetToken
      resetTokenInvalid: 'This reset token is invalid',
      // the resetToken was not present in the URL
      resetTokenRequired: 'A token is required to reset password',
      // new password is the same as the old password (apparently they did not forget it)
      reusedPassword: 'Must choose a new password',
    },
  }

  const signupOptions: DbAuthHandlerOptions['signup'] = {
    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`.
    //
    // If you want the user to be immediately logged in, return the user that
    // was created.
    //
    // If this handler throws an error, it will be returned by the `signUp()`
    // function in the form of: `{ error: 'Error message' }`.
    //
    // If this returns anything else, it will be returned by the
    // `signUp()` function in the form of: `{ message: 'String here' }`.
    handler: async ({ username, hashedPassword, salt, userAttributes }) => {
      const user = await createUser({
        input: {
          email: username,
          hashedPassword,
          salt,
          person: { name: userAttributes.name, email: username },
        },
      })

      // TODO: move to a job
      const name = user.person?.name || userAttributes.name
      const email = user.person?.email || username

      // TODO: include a verification link
      sendEmail({
        to: email,
        subject: `Welcome to list.cafe!`,
        html: `${
          name ? `<p>Hi ${name},</p>` : ''
        }<h1><strong>Welcome to list.cafe!<strong></h1>
        <h2>We are sincerely happy to have you on board.</h2>
        <p><a href="${LIST_CAFE_URL}/dashboard">Get back to your lists here</a></p>`,
      })

      return user
    },

    passwordValidation: (password) => {
      try {
        if (!isStrongPassword(password)) {
          throw new Error('Password is not strong')
        }
      } catch (error) {
        throw new PasswordValidationError(
          'Password must be at least 8 characters long, with at least 1 lowercase, uppercase, number, and special character'
        )
      }

      return true
    },

    errors: {
      // `field` will be either "username" or "password"
      fieldMissing: '${field} is required',
      usernameTaken: 'Email `${username}` already in use. Try logging in',
    },
  }

  const authHandler = new DbAuthHandler(event, context, {
    // Provide prisma db client
    db: db,

    // The name of the property you'd call on `db` to access your user table.
    // ie. if your Prisma model is named `User` this value would be `user`, as in `db.user`
    authModelAccessor: 'user',

    // The name of the property you'd call on `db` to access your user credentials table.
    // ie. if your Prisma model is named `UserCredential` this value would be `userCredential`, as in `db.userCredential`
    credentialModelAccessor: 'userCredential',

    // A map of what dbAuth calls a field to what your database calls it.
    // `id` is whatever column you use to uniquely identify a user (probably
    // something like `id` or `userId` or even `email`)
    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
      resetToken: 'resetToken',
      resetTokenExpiresAt: 'resetTokenExpiresAt',
      challenge: 'webAuthnChallenge',
    },

    // Specifies attributes on the cookie that dbAuth sets in order to remember
    // who is logged in. See https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
    cookie: {
      HttpOnly: true,
      Path: '/',
      SameSite: 'Strict',
      Secure: process.env.NODE_ENV !== 'development' ? true : false,

      // If you need to allow other domains (besides the api side) access to
      // the dbAuth session cookie:
      // Domain: 'example.com',
    },

    forgotPassword: forgotPasswordOptions,
    login: loginOptions,
    resetPassword: resetPasswordOptions,
    signup: signupOptions,

    // See https://redwoodjs.com/docs/authentication/dbauth#webauthn for options
    webAuthn: {
      enabled: true,
      // How long to allow re-auth via WebAuthn in seconds (default is 10 years).
      // The `login.expires` time denotes how many seconds before a user will be
      // logged out, and this value is how long they'll be to continue to use a
      // fingerprint/face scan to log in again. When this one expires they
      // *must* re-enter username and password to authenticate (WebAuthn will
      // then be re-enabled for this amount of time).
      expires: 60 * 60 * 24 * 365 * 10,
      name: 'list.cafe',
      domain:
        process.env.NODE_ENV === 'development' ? 'localhost' : 'list.cafe',
      origin:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8912'
          : 'https://www.list.cafe',
      type: 'platform',
      timeout: 60000,
      credentialFields: {
        id: 'id',
        userId: 'userId',
        publicKey: 'publicKey',
        transports: 'transports',
        counter: 'counter',
      },
    },
  })

  return await authHandler.invoke()
}

export const handler = (req, context) => {
  logger.warn(
    '${event.httpMethod} ${event.path} req before: ',
    JSON.stringify(req, null, 2)
  )
  // req = req?.isBase64Encoded
  //   ? Buffer.from(req, 'base64').toString('utf-8')
  //   : req

  // logger.warn(
  //   '${event.httpMethod} ${event.path} req.body before: ',
  //   JSON.stringify(req?.body)
  // )

  // req.body = req.isBase64Encoded
  //   ? Buffer.from(req?.body, 'base64').toString('utf-8')
  //   : req?.body

  // logger.warn(
  //   '${event.httpMethod} ${event.path} req?.body after: ',
  //   JSON.stringify(req?.body)
  // )

  return authHandler(req, context)
}
