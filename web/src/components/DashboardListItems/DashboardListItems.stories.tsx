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

import DashboardListItems from './DashboardListItems'

const meta: Meta<typeof DashboardListItems> = {
  component: DashboardListItems,
}

export default meta

type Story = StoryObj<typeof DashboardListItems>

export const Primary: Story = {}
