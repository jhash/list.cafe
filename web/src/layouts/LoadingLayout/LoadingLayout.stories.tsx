import type { Meta, StoryObj } from '@storybook/react'

import LoadingLayout from './LoadingLayout'

const meta: Meta<typeof LoadingLayout> = {
  component: LoadingLayout,
}

export default meta

type Story = StoryObj<typeof LoadingLayout>

export const Primary: Story = {}
