import { lazy } from 'react'

import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'
import { Set, Router, Route } from '@redwoodjs/router'

import HomeLayout from './layouts/HomeLayout/HomeLayout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const Routes = lazy(() => import('./Routes'))

const RoutesWrapper = () => {
  const browser = useIsBrowser()

  // Define any pages that we want prerendered here
  if (!browser) {
    return (
      <Router>
        <Set wrap={HomeLayout}>
          <Route path="/" page={HomePage} name="home" prerender />
          <Route notfound page={NotFoundPage} />
        </Set>
      </Router>
    )
  }

  return <Routes />
}

export default RoutesWrapper
