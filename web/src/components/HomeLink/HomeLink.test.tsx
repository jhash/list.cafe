import { render } from '@redwoodjs/testing/web'

import HomeLink from './HomeLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomeLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeLink />)
    }).not.toThrow()
  })
})
