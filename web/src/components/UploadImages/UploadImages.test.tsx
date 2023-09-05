import { render } from '@redwoodjs/testing/web'

import UploadImages from './UploadImages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadImages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadImages />)
    }).not.toThrow()
  })
})
