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

import DashboardListMembership from './DashboardListMembership'

const meta: Meta<typeof DashboardListMembership> = {
  component: DashboardListMembership,
}

export default meta

type Story = StoryObj<typeof DashboardListMembership>

export const Primary: Story = {}
