import { render } from '@redwoodjs/testing/web'

import SectionTitle from './SectionTitle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SectionTitle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionTitle />)
    }).not.toThrow()
  })
})
