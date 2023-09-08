// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Profile from './Profile'

const meta: Meta<typeof Profile> = {
  component: Profile,
}

export default meta

type Story = StoryObj<typeof Profile>

export const Primary: Story = {}
