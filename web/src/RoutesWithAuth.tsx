import { useAuth } from 'src/auth'

import Routes from './Routes'

const RoutesWithAuth = () => {
  return <Routes useAuth={useAuth} />
}

export default RoutesWithAuth
