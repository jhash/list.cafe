import { render } from '@redwoodjs/testing/web'

import PersonPage from './PersonPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PersonPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PersonPage />)
    }).not.toThrow()
  })
})
