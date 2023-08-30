import type { Meta, StoryObj } from '@storybook/react'

import HomeContainerLayout from './HomeContainerLayout'

const meta: Meta<typeof HomeContainerLayout> = {
  component: HomeContainerLayout,
}

export default meta

type Story = StoryObj<typeof HomeContainerLayout>

export const Primary: Story = {}
