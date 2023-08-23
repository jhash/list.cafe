import type { Meta, StoryObj } from '@storybook/react'

import DashboardGroupPage from './DashboardGroupPage'

const meta: Meta<typeof DashboardGroupPage> = {
  component: DashboardGroupPage,
}

export default meta

type Story = StoryObj<typeof DashboardGroupPage>

export const Primary: Story = {}
