import { render } from '@redwoodjs/testing/web'

import ListPrompt from './ListPrompt'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListPrompt', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListPrompt />)
    }).not.toThrow()
  })
})
