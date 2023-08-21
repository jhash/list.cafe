import { render } from '@redwoodjs/testing/web'

import HomeAuthLinks from './HomeAuthLinks'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HomeAuthLinks', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeAuthLinks />)
    }).not.toThrow()
  })
})
