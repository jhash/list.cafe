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

import ListMembers from './ListMembers'

const meta: Meta<typeof ListMembers> = {
  component: ListMembers,
}

export default meta

type Story = StoryObj<typeof ListMembers>

export const Primary: Story = {}
