import { render } from '@redwoodjs/testing/web'

import SectionSubtitle from './SectionSubtitle'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SectionSubtitle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SectionSubtitle />)
    }).not.toThrow()
  })
})
