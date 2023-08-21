import { render } from '@redwoodjs/testing/web'

import ExternalLink from './ExternalLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExternalLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExternalLink />)
    }).not.toThrow()
  })
})
