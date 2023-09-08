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

import PersonAvatar from './PersonAvatar'

const meta: Meta<typeof PersonAvatar> = {
  component: PersonAvatar,
}

export default meta

type Story = StoryObj<typeof PersonAvatar>

export const Primary: Story = {}
