import { User, Role } from '@prisma/client'

import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'
import WebAuthnClient from '@redwoodjs/auth-dbauth-web/webAuthn'

const dbAuthClient = createDbAuthClient({ webAuthn: new WebAuthnClient() })

const { AuthProvider, useAuth: originalUseAuth } = createAuth(dbAuthClient)

export type CurrentUser = Partial<User> & {
  roles?: Role[]
}

const useAuth = () => {
  const auth = originalUseAuth()
  return { ...auth, currentUser: auth.currentUser as CurrentUser }
}
export { AuthProvider, useAuth }
