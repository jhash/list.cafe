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

import AdminSidebar from './AdminSidebar'

const meta: Meta<typeof AdminSidebar> = {
  component: AdminSidebar,
}

export default meta

type Story = StoryObj<typeof AdminSidebar>

export const Primary: Story = {}
