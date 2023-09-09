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

import CopyListCafeLink from './CopyListCafeLink'

const meta: Meta<typeof CopyListCafeLink> = {
  component: CopyListCafeLink,
}

export default meta

type Story = StoryObj<typeof CopyListCafeLink>

export const Primary: Story = {}
