import { render } from '@redwoodjs/testing/web'

import DashboardListLayout from './DashboardListLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashboardListLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListLayout />)
    }).not.toThrow()
  })
})
