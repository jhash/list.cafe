import 'setimmediate'

import './index.d.ts'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import './scaffold.css'

import './index.css'

import AuthWrapper from './AuthWrapper'
import { ThemeProvider } from './components/ThemeProvider'
import RoutesWithAuth from './RoutesWithAuth'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthWrapper>
        <ThemeProvider>
          <RoutesWithAuth />
        </ThemeProvider>
      </AuthWrapper>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
