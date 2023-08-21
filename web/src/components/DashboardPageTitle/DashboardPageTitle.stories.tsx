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

import DashboardPageTitle from './DashboardPageTitle'

const meta: Meta<typeof DashboardPageTitle> = {
  component: DashboardPageTitle,
}

export default meta

type Story = StoryObj<typeof DashboardPageTitle>

export const Primary: Story = {}
