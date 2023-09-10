import { render } from '@redwoodjs/testing/web'

import DashboardGroupMembers from './DashboardGroupMembers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroupMembers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupMembers />)
    }).not.toThrow()
  })
})
