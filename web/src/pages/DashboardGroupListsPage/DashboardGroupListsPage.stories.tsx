import type { Meta, StoryObj } from '@storybook/react'

import DashboardGroupListsPage from './DashboardGroupListsPage'

const meta: Meta<typeof DashboardGroupListsPage> = {
  component: DashboardGroupListsPage,
}

export default meta

type Story = StoryObj<typeof DashboardGroupListsPage>

export const Primary: Story = {}
