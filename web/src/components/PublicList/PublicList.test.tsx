import { render } from '@redwoodjs/testing/web'

import PublicList from './PublicList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PublicList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicList />)
    }).not.toThrow()
  })
})
