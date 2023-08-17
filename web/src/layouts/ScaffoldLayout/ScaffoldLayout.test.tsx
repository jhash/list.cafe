import { render } from '@redwoodjs/testing/web'

import ScaffoldLayout from './ScaffoldLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ScaffoldLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScaffoldLayout />)
    }).not.toThrow()
  })
})
