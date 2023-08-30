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

import ListSettings from './ListSettings'

const meta: Meta<typeof ListSettings> = {
  component: ListSettings,
}

export default meta

type Story = StoryObj<typeof ListSettings>

export const Primary: Story = {}
