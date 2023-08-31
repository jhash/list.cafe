import { Redirect, routes } from '@redwoodjs/router'

export default () => {
  return <Redirect to={routes.home()} />
}
