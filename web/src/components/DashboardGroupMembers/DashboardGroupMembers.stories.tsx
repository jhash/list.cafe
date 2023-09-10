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

import DashboardGroupMembers from './DashboardGroupMembers'

const meta: Meta<typeof DashboardGroupMembers> = {
  component: DashboardGroupMembers,
}

export default meta

type Story = StoryObj<typeof DashboardGroupMembers>

export const Primary: Story = {}
