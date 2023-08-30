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

import Lists from './Lists'

const meta: Meta<typeof Lists> = {
  component: Lists,
}

export default meta

type Story = StoryObj<typeof Lists>

export const Primary: Story = {}
