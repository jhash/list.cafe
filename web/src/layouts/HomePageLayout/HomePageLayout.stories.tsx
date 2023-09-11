import type { Meta, StoryObj } from '@storybook/react'

import HomePageLayout from './HomePageLayout'

const meta: Meta<typeof HomePageLayout> = {
  component: HomePageLayout,
}

export default meta

type Story = StoryObj<typeof HomePageLayout>

export const Primary: Story = {}
