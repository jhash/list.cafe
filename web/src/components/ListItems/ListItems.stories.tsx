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

import ListItems from './ListItems'

const meta: Meta<typeof ListItems> = {
  component: ListItems,
}

export default meta

type Story = StoryObj<typeof ListItems>

export const Primary: Story = {}
