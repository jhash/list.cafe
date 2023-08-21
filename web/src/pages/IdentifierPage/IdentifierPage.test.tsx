import { render } from '@redwoodjs/testing/web'

import IdentifierPage from './IdentifierPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IdentifierPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IdentifierPage />)
    }).not.toThrow()
  })
})
