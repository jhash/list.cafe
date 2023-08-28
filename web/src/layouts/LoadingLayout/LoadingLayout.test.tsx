import { render } from '@redwoodjs/testing/web'

import LoadingLayout from './LoadingLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LoadingLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingLayout />)
    }).not.toThrow()
  })
})
