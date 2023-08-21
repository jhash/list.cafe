import { render } from '@redwoodjs/testing/web'

import DashboardSidebar from './DashboardSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardSidebar />)
    }).not.toThrow()
  })
})
