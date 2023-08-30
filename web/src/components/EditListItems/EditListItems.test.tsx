import { render } from '@redwoodjs/testing/web'

import EditListItems from './EditListItems'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditListItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditListItems />)
    }).not.toThrow()
  })
})
