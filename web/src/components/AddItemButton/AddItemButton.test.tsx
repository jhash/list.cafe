import { render } from '@redwoodjs/testing/web'

import AddItemButton from './AddItemButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddItemButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddItemButton />)
    }).not.toThrow()
  })
})
