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

import AddItemButton from './AddItemButton'

const meta: Meta<typeof AddItemButton> = {
  component: AddItemButton,
}

export default meta

type Story = StoryObj<typeof AddItemButton>

export const Primary: Story = {}
