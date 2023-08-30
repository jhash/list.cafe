import { render } from '@redwoodjs/testing/web'

import ListMembers from './ListMembers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListMembers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListMembers />)
    }).not.toThrow()
  })
})
