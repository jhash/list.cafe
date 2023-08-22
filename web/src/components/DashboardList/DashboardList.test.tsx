import { render } from '@redwoodjs/testing/web'

import DashboardList from './DashboardList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardList />)
    }).not.toThrow()
  })
})
