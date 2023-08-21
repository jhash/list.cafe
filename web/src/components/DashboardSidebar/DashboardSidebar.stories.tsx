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

import DashboardSidebar from './DashboardSidebar'

const meta: Meta<typeof DashboardSidebar> = {
  component: DashboardSidebar,
}

export default meta

type Story = StoryObj<typeof DashboardSidebar>

export const Primary: Story = {}
