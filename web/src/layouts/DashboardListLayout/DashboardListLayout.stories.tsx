import type { Meta, StoryObj } from '@storybook/react'

import DashboardListLayout from './DashboardListLayout'

const meta: Meta<typeof DashboardListLayout> = {
  component: DashboardListLayout,
}

export default meta

type Story = StoryObj<typeof DashboardListLayout>

export const Primary: Story = {}
