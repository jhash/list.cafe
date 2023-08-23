import { render } from '@redwoodjs/testing/web'

import ListItems from './ListItems'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListItems', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListItems />)
    }).not.toThrow()
  })
})
