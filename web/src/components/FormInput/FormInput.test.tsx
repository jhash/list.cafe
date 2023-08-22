import { render } from '@redwoodjs/testing/web'

import FormInput from './FormInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FormInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormInput />)
    }).not.toThrow()
  })
})
