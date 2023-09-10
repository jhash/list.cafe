import { render } from '@redwoodjs/testing/web'

import GroupPage from './GroupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GroupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GroupPage />)
    }).not.toThrow()
  })
})
