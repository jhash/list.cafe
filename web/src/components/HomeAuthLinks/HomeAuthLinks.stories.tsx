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

import HomeAuthLinks from './HomeAuthLinks'

const meta: Meta<typeof HomeAuthLinks> = {
  component: HomeAuthLinks,
}

export default meta

type Story = StoryObj<typeof HomeAuthLinks>

export const Primary: Story = {}
