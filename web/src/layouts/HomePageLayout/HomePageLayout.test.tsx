import { render } from '@redwoodjs/testing/web'

import HomePageLayout from './HomePageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePageLayout />)
    }).not.toThrow()
  })
})
