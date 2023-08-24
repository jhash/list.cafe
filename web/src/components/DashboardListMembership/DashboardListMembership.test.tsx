import { render } from '@redwoodjs/testing/web'

import DashboardListMembership from './DashboardListMembership'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardListMembership', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListMembership />)
    }).not.toThrow()
  })
})
