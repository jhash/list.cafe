import { lazy } from 'react'

import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'

const BrowserAuthWrapper = lazy(() => import('./BrowserAuthWrapper'))

const AuthWrapper = ({ children }) => {
  const browser = useIsBrowser()

  if (!browser) {
    return <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
  }

  return <BrowserAuthWrapper>{children}</BrowserAuthWrapper>
}

export default AuthWrapper
