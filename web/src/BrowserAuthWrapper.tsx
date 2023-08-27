import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo'

import { AuthProvider, useAuth } from './auth'

const BrowserAuthWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <RedwoodApolloProvider
        useAuth={useAuth}
        // graphQLClientConfig={{
        //   cache: new InMemoryCache({
        //     typePolicies: {
        //       ListItem: {
        //         keyFields: ['title', 'url'],
        //       },
        //     },
        //   }),
        // }}
      >
        {children}
      </RedwoodApolloProvider>
    </AuthProvider>
  )
}

export default BrowserAuthWrapper
