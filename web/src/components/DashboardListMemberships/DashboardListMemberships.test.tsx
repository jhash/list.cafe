import { render } from '@redwoodjs/testing/web'

import DashboardListMemberships from './DashboardListMemberships'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardListMemberships', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListMemberships />)
    }).not.toThrow()
  })
})
