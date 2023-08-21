import { render } from '@redwoodjs/testing/web'

import AdminSidebar from './AdminSidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminSidebar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSidebar />)
    }).not.toThrow()
  })
})
