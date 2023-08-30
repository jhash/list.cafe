import { render } from '@redwoodjs/testing/web'

import ListMembersPage from './ListMembersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ListMembersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListMembersPage />)
    }).not.toThrow()
  })
})
