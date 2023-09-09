import { render } from '@redwoodjs/testing/web'

import CopyToClipboard from './CopyToClipboard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CopyToClipboard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CopyToClipboard />)
    }).not.toThrow()
  })
})
