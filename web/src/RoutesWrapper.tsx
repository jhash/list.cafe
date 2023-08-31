import { Suspense, lazy } from 'react'

import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'

import Loading from './components/Loading'
import Routes from './Routes'

const RoutesWithAuth = lazy(() => import('./RoutesWithAuth'))

const useAuth = () => ({
  loading: false,
  isAuthenticated: false,
  currentUser: null,
  userMetadata: null,
  logIn: async () => ({}),
  logOut: async () => ({}),
  signUp: async () => ({}),
  getToken: async () => null,
  getCurrentUser: async () => null,
  hasRole: (_rolesToCheck: string | string[]) => true,
  reauthenticate: async () => null,
  forgotPassword: async (_username: string) => ({}),
  resetPassword: async () => ({}),
  validateResetToken: async (_resetToken: string | null) => ({}),
  type: '',
  hasError: false,
})

const RoutesWrapper = () => {
  const browser = useIsBrowser()

  if (!browser) {
    return <Routes useAuth={useAuth} />
  }

  return (
    <Suspense fallback={<Loading />}>
      <RoutesWithAuth />
    </Suspense>
  )
}

export default RoutesWrapper
