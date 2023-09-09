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

import CopyToClipboard from './CopyToClipboard'

const meta: Meta<typeof CopyToClipboard> = {
  component: CopyToClipboard,
}

export default meta

type Story = StoryObj<typeof CopyToClipboard>

export const Primary: Story = {}
