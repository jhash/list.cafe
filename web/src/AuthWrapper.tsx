// import { Suspense, lazy } from 'react'

// import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'
// import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'

import BrowserAuthWrapper from './BrowserAuthWrapper'
// import Loading from './components/Loading'

// const BrowserAuthWrapper = lazy(() => import('./BrowserAuthWrapper'))

const AuthWrapper = ({ children }) => {
  // const browser = useIsBrowser()

  // if (!browser) {
  //   return <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
  // }

  return (
    // <Suspense fallback={<Loading />}>
    <BrowserAuthWrapper>{children}</BrowserAuthWrapper>
    // </Suspense>
  )
}

export default AuthWrapper
