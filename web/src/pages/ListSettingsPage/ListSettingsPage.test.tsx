import { render } from '@redwoodjs/testing/web'

import ListSettingsPage from './ListSettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ListSettingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListSettingsPage />)
    }).not.toThrow()
  })
})
