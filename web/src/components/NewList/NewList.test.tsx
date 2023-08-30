import { render } from '@redwoodjs/testing/web'

import NewList from './NewList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewList />)
    }).not.toThrow()
  })
})
