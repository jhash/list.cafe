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

import DashboardListItemImages from './DashboardListItemImages'

const meta: Meta<typeof DashboardListItemImages> = {
  component: DashboardListItemImages,
}

export default meta

type Story = StoryObj<typeof DashboardListItemImages>

export const Primary: Story = {}
