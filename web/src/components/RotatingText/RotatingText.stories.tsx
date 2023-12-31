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

import RotatingText from './RotatingText'

const meta: Meta<typeof RotatingText> = {
  component: RotatingText,
}

export default meta

type Story = StoryObj<typeof RotatingText>

export const Primary: Story = {}
