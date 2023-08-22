import type { Meta, StoryObj } from '@storybook/react'

import DashboardListPage from './DashboardListPage'

const meta: Meta<typeof DashboardListPage> = {
  component: DashboardListPage,
}

export default meta

type Story = StoryObj<typeof DashboardListPage>

export const Primary: Story = {}
