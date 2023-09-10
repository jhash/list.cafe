import { render } from '@redwoodjs/testing/web'

import GroupProfile from './GroupProfile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GroupProfile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GroupProfile />)
    }).not.toThrow()
  })
})
