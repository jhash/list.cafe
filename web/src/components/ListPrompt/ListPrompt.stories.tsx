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

import ListPrompt from './ListPrompt'

const meta: Meta<typeof ListPrompt> = {
  component: ListPrompt,
}

export default meta

type Story = StoryObj<typeof ListPrompt>

export const Primary: Story = {}
