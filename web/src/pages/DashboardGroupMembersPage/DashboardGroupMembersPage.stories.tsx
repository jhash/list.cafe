import type { Meta, StoryObj } from '@storybook/react'

import DashboardGroupMembersPage from './DashboardGroupMembersPage'

const meta: Meta<typeof DashboardGroupMembersPage> = {
  component: DashboardGroupMembersPage,
}

export default meta

type Story = StoryObj<typeof DashboardGroupMembersPage>

export const Primary: Story = {}
