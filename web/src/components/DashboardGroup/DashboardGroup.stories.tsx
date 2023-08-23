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

import DashboardGroup from './DashboardGroup'

const meta: Meta<typeof DashboardGroup> = {
  component: DashboardGroup,
}

export default meta

type Story = StoryObj<typeof DashboardGroup>

export const Primary: Story = {}
