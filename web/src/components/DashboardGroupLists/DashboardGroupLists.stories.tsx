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

import DashboardGroupLists from './DashboardGroupLists'

const meta: Meta<typeof DashboardGroupLists> = {
  component: DashboardGroupLists,
}

export default meta

type Story = StoryObj<typeof DashboardGroupLists>

export const Primary: Story = {}
