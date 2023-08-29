import { render } from '@redwoodjs/testing/web'

import ListDraftPage from './ListDraftPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ListDraftPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListDraftPage />)
    }).not.toThrow()
  })
})
