import { render } from '@redwoodjs/testing/web'

import DashboardListItem from './DashboardListItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardListItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListItem />)
    }).not.toThrow()
  })
})
