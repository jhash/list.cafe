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

import DashboardListMemberships from './DashboardListMemberships'

const meta: Meta<typeof DashboardListMemberships> = {
  component: DashboardListMemberships,
}

export default meta

type Story = StoryObj<typeof DashboardListMemberships>

export const Primary: Story = {}
