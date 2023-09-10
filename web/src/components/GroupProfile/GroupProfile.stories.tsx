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

import GroupProfile from './GroupProfile'

const meta: Meta<typeof GroupProfile> = {
  component: GroupProfile,
}

export default meta

type Story = StoryObj<typeof GroupProfile>

export const Primary: Story = {}
