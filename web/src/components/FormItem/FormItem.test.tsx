import { render } from '@redwoodjs/testing/web'

import FormItem from './FormItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FormItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormItem />)
    }).not.toThrow()
  })
})
