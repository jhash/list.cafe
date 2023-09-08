import { render } from '@redwoodjs/testing/web'

import ProfileSettingsPage from './ProfileSettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProfileSettingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileSettingsPage />)
    }).not.toThrow()
  })
})
