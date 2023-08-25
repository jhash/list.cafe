import 'setimmediate'

import './index.d.ts'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
// import { InMemoryCache } from '@redwoodjs/web/node_modules/@apollo/client'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'

import './index.css'

import { AuthProvider, useAuth } from './auth'
import { ThemeProvider } from './components/ThemeProvider'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
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
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
