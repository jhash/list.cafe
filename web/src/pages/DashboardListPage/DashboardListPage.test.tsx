import { render } from '@redwoodjs/testing/web'

import DashboardListPage from './DashboardListPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardListPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListPage />)
    }).not.toThrow()
  })
})
