import { render } from '@redwoodjs/testing/web'

import DashboardGroupMemberships from './DashboardGroupMemberships'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroupMemberships', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupMemberships />)
    }).not.toThrow()
  })
})
