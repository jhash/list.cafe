import { render } from '@redwoodjs/testing/web'

import HomeContainerLayout from './HomeContainerLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomeContainerLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeContainerLayout />)
    }).not.toThrow()
  })
})
