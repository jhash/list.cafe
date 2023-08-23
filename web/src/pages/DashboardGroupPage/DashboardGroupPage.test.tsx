import { render } from '@redwoodjs/testing/web'

import DashboardGroupPage from './DashboardGroupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardGroupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupPage />)
    }).not.toThrow()
  })
})
