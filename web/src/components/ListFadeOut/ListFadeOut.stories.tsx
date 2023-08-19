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

import ListFadeOut from './ListFadeOut'

const meta: Meta<typeof ListFadeOut> = {
  component: ListFadeOut,
}

export default meta

type Story = StoryObj<typeof ListFadeOut>

export const Primary: Story = {}
