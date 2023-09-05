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

import UploadImages from './UploadImages'

const meta: Meta<typeof UploadImages> = {
  component: UploadImages,
}

export default meta

type Story = StoryObj<typeof UploadImages>

export const Primary: Story = {}
