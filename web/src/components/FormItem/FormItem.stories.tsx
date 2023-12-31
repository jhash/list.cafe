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

import FormItem from './FormItem'

const meta: Meta<typeof FormItem> = {
  component: FormItem,
}

export default meta

type Story = StoryObj<typeof FormItem>

export const Primary: Story = {}
