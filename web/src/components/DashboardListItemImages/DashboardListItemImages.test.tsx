import { render } from '@redwoodjs/testing/web'

import DashboardListItemImages from './DashboardListItemImages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashboardListItemImages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardListItemImages />)
    }).not.toThrow()
  })
})
