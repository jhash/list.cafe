import { render } from '@redwoodjs/testing/web'

import DashboardGroupMembersPage from './DashboardGroupMembersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardGroupMembersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupMembersPage />)
    }).not.toThrow()
  })
})
