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

import DashboardGroupMembership from './DashboardGroupMembership'

const meta: Meta<typeof DashboardGroupMembership> = {
  component: DashboardGroupMembership,
}

export default meta

type Story = StoryObj<typeof DashboardGroupMembership>

export const Primary: Story = {}
