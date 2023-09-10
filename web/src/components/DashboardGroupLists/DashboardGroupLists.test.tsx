import { render } from '@redwoodjs/testing/web'

import DashboardGroupLists from './DashboardGroupLists'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardGroupLists', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardGroupLists />)
    }).not.toThrow()
  })
})
