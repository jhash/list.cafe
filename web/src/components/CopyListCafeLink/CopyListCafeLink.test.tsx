import { render } from '@redwoodjs/testing/web'

import CopyListCafeLink from './CopyListCafeLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CopyListCafeLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CopyListCafeLink />)
    }).not.toThrow()
  })
})
