import { render } from '@redwoodjs/testing/web'

import DashboardGroupSettings from './DashboardGroupSettings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroupSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupSettings />)
    }).not.toThrow()
  })
})
