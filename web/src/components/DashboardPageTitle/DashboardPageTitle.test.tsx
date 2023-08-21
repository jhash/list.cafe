import { render } from '@redwoodjs/testing/web'

import DashboardPageTitle from './DashboardPageTitle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardPageTitle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardPageTitle />)
    }).not.toThrow()
  })
})
