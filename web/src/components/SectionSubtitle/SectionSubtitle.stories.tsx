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

import SectionSubtitle from './SectionSubtitle'

const meta: Meta<typeof SectionSubtitle> = {
  component: SectionSubtitle,
}

export default meta

type Story = StoryObj<typeof SectionSubtitle>

export const Primary: Story = {}
