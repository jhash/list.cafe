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

import EditListItems from './EditListItems'

const meta: Meta<typeof EditListItems> = {
  component: EditListItems,
}

export default meta

type Story = StoryObj<typeof EditListItems>

export const Primary: Story = {}
