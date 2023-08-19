import { render } from '@redwoodjs/testing/web'

import ListFadeOut from './ListFadeOut'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ListFadeOut', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListFadeOut />)
    }).not.toThrow()
  })
})
