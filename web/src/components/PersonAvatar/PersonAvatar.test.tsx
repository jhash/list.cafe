import { render } from '@redwoodjs/testing/web'

import PersonAvatar from './PersonAvatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PersonAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonAvatar />)
    }).not.toThrow()
  })
})
