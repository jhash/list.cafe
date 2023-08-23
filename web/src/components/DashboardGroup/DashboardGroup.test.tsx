import { render } from '@redwoodjs/testing/web'

import DashboardGroup from './DashboardGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroup />)
    }).not.toThrow()
  })
})
