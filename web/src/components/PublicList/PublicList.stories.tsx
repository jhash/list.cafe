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

import PublicList from './PublicList'

const meta: Meta<typeof PublicList> = {
  component: PublicList,
}

export default meta

type Story = StoryObj<typeof PublicList>

export const Primary: Story = {}
