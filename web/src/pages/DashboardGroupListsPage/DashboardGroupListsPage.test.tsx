import { render } from '@redwoodjs/testing/web'

import DashboardGroupListsPage from './DashboardGroupListsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardGroupListsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupListsPage />)
    }).not.toThrow()
  })
})
