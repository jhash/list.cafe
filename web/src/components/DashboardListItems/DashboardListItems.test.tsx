import { render } from '@redwoodjs/testing/web'

import DashboardListItems from './DashboardListItems'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardListItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListItems />)
    }).not.toThrow()
  })
})
