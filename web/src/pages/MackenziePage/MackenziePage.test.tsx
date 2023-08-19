import { render } from '@redwoodjs/testing/web'

import MackenziePage from './MackenziePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MackenziePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MackenziePage />)
    }).not.toThrow()
  })
})
