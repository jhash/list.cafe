import { render } from '@redwoodjs/testing/web'

import Lists from './Lists'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Lists', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Lists />)
    }).not.toThrow()
  })
})
