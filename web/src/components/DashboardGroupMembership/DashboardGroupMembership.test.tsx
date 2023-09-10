import { render } from '@redwoodjs/testing/web'

import DashboardGroupMembership from './DashboardGroupMembership'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroupMembership', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupMembership />)
    }).not.toThrow()
  })
})
